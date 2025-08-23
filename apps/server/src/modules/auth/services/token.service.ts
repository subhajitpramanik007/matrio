import { PrismaService } from '@/prisma/prisma.service';
import { UserJWTPayload } from '@/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly client: PrismaService,
  ) {}

  private async signAccessToken(payload: UserJWTPayload) {
    return await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_ACCESS_SECRET'),
    });
  }

  private async generateSessionToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  async issueCookiesTokens(user: UserJWTPayload) {
    const accessToken = await this.signAccessToken(user);
    const refreshToken = await this.generateSessionToken();

    return { accessToken, refreshToken };
  }

  async createEmailVerificationToken(email: string) {
    const token = crypto.randomBytes(16).toString('hex');

    await this.client.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      },
    });

    return token;
  }

  async verifyEmailToken(email: string, token: string) {
    const verification = await this.client.verificationToken.findUnique({
      where: { identifier_token: { identifier: email, token } },
    });
    if (!verification || verification.expires < new Date()) {
      throw new BadRequestException('Invalid or expired verification token');
    }
    await this.client.verificationToken.delete({
      where: { identifier_token: { identifier: email, token } },
    });
    await this.client.user.update({ where: { email }, data: { emailVerified: new Date() } });
  }

  async deleteEmailVerificationToken(email: string) {
    await this.client.verificationToken.deleteMany({
      where: {
        identifier: email,
      },
    });
  }
}
