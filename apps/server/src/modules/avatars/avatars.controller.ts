import { Controller, Get } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { SuccessResponse } from '@/common/response';

@Controller('avatars')
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}

  @Get()
  async getAvatars() {
    const avatars = await this.avatarsService.getAvatars();

    return new SuccessResponse({ avatars });
  }
}
