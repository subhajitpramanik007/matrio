import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from '@matrio/db';
import { TUserSignup } from '@matrio/shared/schemas';

import { PrismaService } from '@/prisma/prisma.service';
import { UserQueryService } from '@/modules/users/services/user-query.service';

@Injectable()
export class UserService extends UserQueryService {
  constructor(protected readonly client: PrismaService) {
    super(client);
  }

  private generateUsername(type: 'user' | 'guest' = 'user') {
    return `${type}_${crypto.randomBytes(4).toString('hex')}`;
  }

  async createGuest(): Promise<User> {
    return this.client.user.create({
      data: {
        username: this.generateUsername('guest'),
        role: 'GUEST',
      },
    });
  }

  async createUser(data: TUserSignup): Promise<User> {
    try {
      return await this.client.user.create({
        data: {
          email: data.email,
          username: data.username || this.generateUsername(),
          role: 'USER',
          userPassword: { create: { hash: await bcrypt.hash(data.password, 10) } },
          profile: {
            create: {
              rank: 0,
              joinDate: new Date().toISOString(),
              lastOnline: new Date().toISOString(),
              bio: 'Hey there! I am using Matrio!',
              settings: { create: {} },
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  async upgradeUser(userId: string, data: TUserSignup): Promise<User> {
    return this.client.user.update({
      where: { id: userId },
      data: {
        email: data.email,
        username: data.username || this.generateUsername(),
        role: 'USER',
        isGuestUpgraded: true,
        userPassword: { create: { hash: await bcrypt.hash(data.password, 10) } },
        profile: {
          create: {
            rank: 0,
            joinDate: new Date().toISOString(),
            lastOnline: new Date().toISOString(),
            bio: 'Hey there! I am using Matrio!',
            settings: { create: {} },
          },
        },
      },
    });
  }
}
