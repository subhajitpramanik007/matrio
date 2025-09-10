import { BaseController } from '@/common/base/base.controller';
import {
  BadRequestException,
  Controller,
  Get,
  Patch,
  Param,
  Query,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { ProfileResponseDto, ProfileWithSettingsResponseDto, SettingsDto } from './dto/profile.dto';
import { JwtAccessGuard } from '../auth/guards';
import { Serialize, ZodBody } from '@/common/decorators';
import { AchievementsResponseDto } from './dto/achivements.dto';
import { SuccessResponse } from '@/common/response';
import {
  type TUpdateProfile,
  type TUpdateSettings,
  UpdateProfileSchema,
  UpdateSettingsSchema,
} from '@matrio/shared/schemas/profile.schemas';

@UseGuards(JwtAccessGuard)
@Controller('profile')
export class ProfileController extends BaseController {
  constructor(private readonly profileService: ProfileService) {
    super();
  }

  @Serialize(ProfileWithSettingsResponseDto)
  @Get('me')
  async me(@GetUser('id') userId: string): Promise<ProfileWithSettingsResponseDto> {
    const profile = await this.profileService.getProfile(userId);
    const settings = await this.profileService.getSettingsByProfileId(profile.id);

    return { profile, settings, message: 'You profile data fetch successfully' };
  }

  @Serialize(ProfileResponseDto)
  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<ProfileResponseDto> {
    const profile = await this.profileService.getProfile(id);

    return { profile, message: 'Profile data fetch successfully' };
  }

  @Serialize(AchievementsResponseDto)
  @Get('me/achievements')
  async getMeAchievements(@GetUser('id') userId: string): Promise<AchievementsResponseDto> {
    const achievements = await this.profileService.getMeAchievements(userId);

    return { achievements, message: 'You achievements data fetch successfully' };
  }

  @Serialize(SettingsDto)
  @Get('me/settings')
  async getSettings(@GetUser('id') userId: string): Promise<SettingsDto> {
    const settings = await this.profileService.getSettingsByUserId(userId);

    return { settings, message: 'You settings data fetch successfully' };
  }

  @Get('me/stats')
  async getStats(@GetUser('id') userId: string) {
    const stats = await this.profileService.getStatsByUserId(userId);

    return new SuccessResponse({ stats }, 'You stats data fetch successfully');
  }

  @Get('me/game-history')
  async getGameHistory(
    @GetUser('id') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const gameHistory = await this.profileService.getGameHistoryByUserId(userId, page, limit);

    return new SuccessResponse({ gameHistory }, 'You game history data fetch successfully');
  }

  // Update user profile
  @Serialize(ProfileResponseDto)
  @Patch('me')
  async update(@GetUser('id') userId: string, @ZodBody(UpdateProfileSchema) dto: TUpdateProfile) {
    await this.profileService.updateProfile(userId, dto);

    return { message: 'You profile data updated successfully' };
  }

  // Update user settings
  @Serialize(SettingsDto)
  @Patch('me/settings')
  async updateSettings(
    @GetUser('id') userId: string,
    @ZodBody(UpdateSettingsSchema) dto: TUpdateSettings,
  ) {
    console.log(dto);
    await this.profileService.updateSettings(userId, dto);

    return { message: 'You settings data updated successfully' };
  }

  // Update avatar
  @Patch('me/avatar')
  async updateAvatar(@GetUser('id') userId: string, @Body() dto: { avatarId?: number }) {
    await this.profileService.updateAvatar(userId, dto.avatarId);

    return { message: 'You avatar updated successfully' };
  }
}
