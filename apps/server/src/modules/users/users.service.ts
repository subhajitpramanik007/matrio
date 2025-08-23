import { Injectable } from '@nestjs/common';
import { UserQueryService } from './services/user-query.service';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UsersServices extends UserQueryService {
  constructor(protected readonly client: PrismaService) {
    super(client);
  }
}
