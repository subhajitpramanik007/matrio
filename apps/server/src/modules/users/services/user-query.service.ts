import { Prisma, User } from '@matrio/db';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UserQueryService {
  constructor(protected readonly client: PrismaService) {}

  async findByEmailOrUsername(
    identifier: string,
  ): Promise<Prisma.UserGetPayload<{ include: { userPassword: true } }> | null> {
    return this.client.user.findFirst({
      where: { OR: [{ email: identifier }, { username: identifier }] },
      include: { userPassword: true },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.client.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.client.user.findUnique({ where: { email } });
  }
}
