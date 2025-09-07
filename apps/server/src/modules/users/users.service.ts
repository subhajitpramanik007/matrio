import { BadRequestException, Injectable } from '@nestjs/common';
import { UserQueryService } from './services/user-query.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UsersServices extends UserQueryService {
  constructor(protected readonly client: PrismaService) {
    super(client);
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.client.user.findUnique({
      where: { id },
      include: { profile: true, avatar: true },
    });

    if (!user) throw new BadRequestException('User not found');

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: { url: user.avatar?.url, id: user.avatar?.id, name: user.avatar?.name },
      createdAt: user.createdAt,
      name: user.profile?.name ?? null,
      level: user.profile?.level ?? 1,
      coins: user.profile?.coins ?? 0,
    };
  }
}
