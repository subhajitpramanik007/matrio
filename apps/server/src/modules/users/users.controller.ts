import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersServices } from './users.service';
import { JwtAccessGuard } from '../auth/guards';
import { BaseController } from '@/common/base/base.controller';
import { GetUser } from '@/common/decorators';

@UseGuards(JwtAccessGuard)
@Controller('users')
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersServices) {
    super();
  }

  @Get('me')
  async me(@GetUser('id') userId: string) {
    const user = await this.usersService.findById(userId);
    return this.success({ user }, 'User fetched successfully');
  }
}
