import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersServices } from './users.service';
import { UserQueryService } from './services/user-query.service';

@Module({
  controllers: [UsersController],
  providers: [UsersServices, UserQueryService],
  exports: [UserQueryService],
})
export class UsersModule {}
