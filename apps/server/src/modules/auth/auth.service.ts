import { Prisma, User } from '@matrio/db';
import { PrismaService } from '@/prisma/prisma.service';

import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { Response } from 'express';
import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserJWTPayload } from 'src/types';

import {
  AUTH_COOKIE_ACCESS_MAX_AGE,
  AUTH_COOKIE_ACCESS_TOKEN,
  AUTH_COOKIE_IS_GUEST,
  AUTH_COOKIE_REFRESH_MAX_AGE,
  AUTH_COOKIE_REFRESH_TOKEN,
} from './constant';
import { TUserSignin, TUserSignup } from './schemas';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly client: PrismaService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    private readonly mailService: MailService,
  ) {}

  private generateUsername(type: 'user' | 'guest' = 'user') {
    const randomBytes = crypto.randomBytes(4);
    const randomString = randomBytes.toString('hex');
    return `${type}_${randomString}`;
  }

  /**
   * Create guest user
   */
  async createGuest() {
    return this.client.user.create({
      data: {
        username: this.generateUsername('guest'),
        role: 'GUEST',
      },
    });
  }

  /**
   * User sign up
   */
  async signup(data: TUserSignup, sessionToken?: string) {
    try {
      let user: User | null = null;
      if (sessionToken) {
        const session = await this.getSessionByToken(sessionToken);
        if (session && session.expires > new Date()) {
          user = await this.upgradeUser(session.userId, data);
        }
      }

      if (!user) {
        user = await this.createUser(data);
      }

      await this.sendVerificationEmail(user.email!);

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      }

      throw error;
    }
  }

  /**
   * User sign in
   */
  async signin(data: TUserSignin) {
    const user = await this.client.user.findFirst({
      where: {
        OR: [{ email: data.emailOrUsername }, { username: data.emailOrUsername }],
      },
      include: {
        userPassword: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!user.userPassword) {
      throw new BadRequestException('Select a different login method');
    }

    const isValidPassword = await bcrypt.compare(data.password, user.userPassword.hash);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const { userPassword, ...rest } = user;
    return rest;
  }

  async createUser(data: TUserSignup) {
    return await this.client.user.create({
      data: {
        email: data.email,
        username: data.username || this.generateUsername(),
        role: 'USER',
        userPassword: {
          create: {
            hash: await bcrypt.hash(data.password, 10),
          },
        },
      },
    });
  }

  async upgradeUser(userId: string, data: TUserSignup) {
    return this.client.user.update({
      where: { id: userId },
      data: {
        email: data.email,
        username: data.username || this.generateUsername(),
        role: 'USER',
        isGuestUpgraded: true,
        userPassword: {
          create: {
            hash: await bcrypt.hash(data.password, 10),
          },
        },
      },
    });
  }

  /**
   * Verify email
   */
  async verifyEmail(email: string, token: string) {
    const emailVerification = await this.client.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    });

    if (!emailVerification) {
      throw new BadRequestException('Invalid verification token or email');
    }

    if (emailVerification.expires < new Date()) {
      throw new BadRequestException('Verification token expired');
    }

    await this.client.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    });

    return this.client.user.update({
      where: {
        email,
      },
      data: {
        emailVerified: new Date(),
      },
    });
  }

  /**
   * Create email verification token
   */
  async createEmailVerificationToken(email: string) {
    const existsVerification = await this.client.verificationToken.findFirst({
      where: {
        identifier: email,
      },
    });

    if (existsVerification && existsVerification.expires > new Date()) {
      return existsVerification.token;
    }

    if (existsVerification) {
      await this.client.verificationToken.deleteMany({
        where: {
          identifier: email,
        },
      });
    }

    const verificationToken = await this.client.verificationToken.create({
      data: {
        identifier: email,
        token: crypto.randomBytes(32).toString('hex'),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      },
    });

    return verificationToken.token;
  }

  /**
   * Resend verification email
   */
  async resendVerificationEmail(email: string) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.emailVerified) {
      throw new BadRequestException('Email already verified');
    }

    await this.sendVerificationEmail(email);
  }

  /**
   * Send verification email
   */
  async sendVerificationEmail(email: string) {
    const verificationToken = await this.createEmailVerificationToken(email);

    // send email here
    await this.mailService.sendVerificationEmail(email, verificationToken);
  }

  /**
   * User sign out
   */
  async signout(res: Response, refreshToken?: string) {
    if (refreshToken) {
      await this.deleteSessionByToken(refreshToken);
    }

    res.clearCookie(AUTH_COOKIE_ACCESS_TOKEN);
    res.clearCookie(AUTH_COOKIE_REFRESH_TOKEN);
    res.clearCookie(AUTH_COOKIE_IS_GUEST);
  }

  /**
   * Refresh token
   */
  async refreshUser(res: Response, token?: string) {
    if (!token) throw new UnauthorizedException('Refresh token not found');

    const session = await this.getSessionByToken(token);
    if (!session) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.getUserById(session.userId);
    if (!user) throw new UnauthorizedException('User not found, please sign up again');
    const tokens = await this.issueAuthTokens(user);

    this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken, user.isGuestUpgraded);

    await this.updateSessionByToken(session.sessionToken, tokens.refreshToken);

    return { accessToken: tokens.accessToken };
  }

  /**
   * Get user by id
   */
  async getUserById(id: string) {
    return this.client.user.findUnique({
      where: { id },
    });
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string) {
    return this.client.user.findUnique({
      where: { email },
    });
  }

  /**
   * Store refresh token
   */
  async createSession(userId: string, sessionToken: string) {
    return this.client.session.create({
      data: {
        userId,
        sessionToken,
        expires: new Date(Date.now() + AUTH_COOKIE_REFRESH_MAX_AGE),
      },
    });
  }

  /**
   * Get refresh token
   */
  async getSessionByToken(sessionToken: string) {
    return this.client.session.findUnique({
      where: { sessionToken },
    });
  }

  /**
   * Update refresh token
   */
  async updateSessionByToken(sessionToken: string, newSessionToken: string) {
    return this.client.session.update({
      where: { sessionToken },
      data: {
        sessionToken: newSessionToken,
        expires: new Date(Date.now() + AUTH_COOKIE_REFRESH_MAX_AGE),
      },
    });
  }

  /**
   * Delete refresh token
   */
  async deleteSessionByToken(sessionToken: string) {
    return this.client.session.delete({
      where: { sessionToken },
    });
  }

  setAuthCookies(res: Response, accessToken: string, refreshToken: string, isGuest: boolean) {
    res.cookie(AUTH_COOKIE_ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: this.config.get('NODE_ENV') === 'production',
      maxAge: AUTH_COOKIE_ACCESS_MAX_AGE,
      sameSite: 'lax',
    });
    res.cookie(AUTH_COOKIE_REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: this.config.get('NODE_ENV') === 'production',
      maxAge: AUTH_COOKIE_REFRESH_MAX_AGE,
      sameSite: 'lax',
    });
    res.cookie(AUTH_COOKIE_IS_GUEST, isGuest, {
      httpOnly: true,
      maxAge: AUTH_COOKIE_REFRESH_MAX_AGE,
    });
  }

  /**
   * Issue auth tokens
   */
  async issueAuthTokens(user: User) {
    const payload: UserJWTPayload = { sub: user.id, ...user };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_ACCESS_SECRET'),
    });
    const refreshToken = crypto.randomBytes(32).toString('hex');

    return { accessToken, refreshToken };
  }
}
