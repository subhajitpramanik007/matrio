import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AvatarsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAvatars() {
    return this.prisma.avatar.findMany({
      select: {
        id: true,
        url: true,
        name: true,
        isPremium: true,
        coins: true,
      },
    });
  }
}
