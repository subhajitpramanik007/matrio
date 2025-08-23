import { Session } from '@matrio/db';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AUTH_COOKIE_REFRESH_MAX_AGE } from '../constant';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(userId: string, token: string): Promise<Session> {
    return this.prisma.session.create({
      data: {
        userId,
        sessionToken: token,
        expires: new Date(Date.now() + AUTH_COOKIE_REFRESH_MAX_AGE),
      },
    });
  }

  async getSessionByToken(token: string): Promise<Session | null> {
    return this.prisma.session.findUnique({ where: { sessionToken: token } });
  }

  async updateSessionByToken(oldToken: string, newToken: string): Promise<Session> {
    return this.prisma.session.update({
      where: { sessionToken: oldToken },
      data: { sessionToken: newToken, expires: new Date(Date.now() + AUTH_COOKIE_REFRESH_MAX_AGE) },
    });
  }

  async deleteSessionByToken(token: string): Promise<void> {
    await this.prisma.session.delete({ where: { sessionToken: token } });
  }
}
