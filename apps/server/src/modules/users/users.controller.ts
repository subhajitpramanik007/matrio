import { BadRequestException, Controller, Get, UseGuards } from '@nestjs/common';
import { UsersServices } from './users.service';
import { JwtAccessGuard } from '../auth/guards';
import { BaseController } from '@/common/base/base.controller';
import { GetUser } from '@/common/decorators';
import { GuestUserDto, UserDto } from './dto';
import { User } from '@matrio/db';
import { SuccessResponse } from '@/common/response';

@UseGuards(JwtAccessGuard)
@Controller('users')
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersServices) {
    super();
  }

  @Get('me')
  async me(@GetUser('id') userId: string): Promise<SuccessResponse<{ user: UserDto }>> {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new BadRequestException('User not found');
    return this.success({ user });
  }
}
