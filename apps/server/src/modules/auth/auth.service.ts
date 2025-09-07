import { Prisma, User } from '@matrio/db';

import bcrypt from 'bcrypt';
import { Response } from 'express';
import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { TEmailVerification, TUserSignin, TUserSignup } from '@matrio/shared/schemas';

import { MailService } from '../mail/mail.service';
import { UserService } from './services/user.service';
import { TokenService } from './services/token.service';
import { SessionService } from './services/session.service';
import { AuthCookiesService } from './services/auth-cookies.service';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly mail: MailService,
    private readonly cookies: AuthCookiesService,
    private readonly sessions: SessionService,
    private readonly users: UserService,
    private readonly tokens: TokenService,
    private readonly client: PrismaService,
  ) {}

  /**
   * Create guest user
   */
  async createGuest(res: Response) {
    const user = await this.users.createGuest();

    const { accessToken, refreshToken } = await this.tokens.issueCookiesTokens({
      sub: user.id,
      ...user,
    });

    await this.sessions.createSession(user.id, refreshToken);
    this.cookies.set(res, accessToken, refreshToken, true);

    return { accessToken };
  }

  /**
   * User sign up
   */
  async signup(res: Response, data: TUserSignup, sessionToken?: string) {
    try {
      let user: User | null = null;
      if (sessionToken) {
        const session = await this.sessions.getSessionByToken(sessionToken);
        if (session && session.expires > new Date()) {
          user = await this.users.upgradeUser(session.userId, data);
        }
      }

      if (!user) user = await this.users.createUser(data);

      const emailVerificationToken = await this.tokens.createEmailVerificationToken(user.email!);
      await this.mail.sendVerificationEmail(user.email!, emailVerificationToken);

      const { accessToken, refreshToken } = await this.tokens.issueCookiesTokens({
        sub: user.id,
        ...user,
      });

      await this.sessions.createSession(user.id, refreshToken);
      this.cookies.set(res, accessToken, refreshToken, false);

      return { accessToken };
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
  async signin(res: Response, { emailOrUsername, password }: TUserSignin) {
    const user = await this.users.findByEmailOrUsername(emailOrUsername);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!user.userPassword) {
      throw new BadRequestException('Select a different login method');
    }

    const isValidPassword = await bcrypt.compare(password, user.userPassword.hash);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const { userPassword, ...rest } = user;

    const { accessToken, refreshToken } = await this.tokens.issueCookiesTokens({
      sub: user.id,
      ...rest,
    });

    await this.sessions.createSession(user.id, refreshToken);
    this.cookies.set(res, accessToken, refreshToken, false);

    return { accessToken };
  }

  /**
   * Verify email
   */
  async verifyEmail(res: Response, data: TEmailVerification, oldRefreshToken?: string) {
    await this.tokens.verifyEmailToken(data.email, data.token);

    const user = await this.users.findByEmail(data.email);
    if (!user) throw new BadRequestException('User not found');

    const { accessToken, refreshToken } = await this.tokens.issueCookiesTokens({
      sub: user.id,
      ...user,
    });

    if (oldRefreshToken) await this.sessions.deleteSessionByToken(oldRefreshToken);

    await this.sessions.createSession(user.id, refreshToken);
    this.cookies.set(res, accessToken, refreshToken, false);

    return { accessToken };
  }

  /**
   * Resend verification email
   */
  async resendVerificationEmail(email: string) {
    await this.tokens.deleteEmailVerificationToken(email);
    const token = await this.tokens.createEmailVerificationToken(email);

    this.mail.sendVerificationEmail(email, token);
  }

  /**
   * User sign out
   */
  async signout(res: Response, refreshToken?: string) {
    if (refreshToken) {
      await this.sessions.deleteSessionByToken(refreshToken);
    }

    this.cookies.clear(res);
  }

  /**
   * Refresh token
   */
  async refreshUser(res: Response, token?: string) {
    if (!token) throw new UnauthorizedException('Refresh token not found');

    const session = await this.sessions.getSessionByToken(token);
    if (!session) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.users.findById(session.userId);
    if (!user) throw new UnauthorizedException('User not found, please sign up again');

    const { accessToken, refreshToken } = await this.tokens.issueCookiesTokens({
      sub: user.id,
      ...user,
    });

    await this.sessions.updateSessionByToken(token, refreshToken);
    this.cookies.set(res, accessToken, refreshToken, user.isGuestUpgraded);

    return { accessToken };
  }

  /**
   * Get session data
   */
  async getSessionData(id: string) {
    const user = await this.client.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        avatar: { select: { url: true, id: true, name: true } },
        createdAt: true,
        profile: { select: { name: true, level: true, coins: true } },
      },
    });

    if (!user) throw new BadRequestException('User not found');

    const { profile, ...rest } = user;

    return {
      ...rest,
      name: profile?.name ?? null,
      coins: profile?.coins ?? 0,
      level: profile?.level,
    };
  }
}
