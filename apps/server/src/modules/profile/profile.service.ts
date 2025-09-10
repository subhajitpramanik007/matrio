import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ProfileDto, Settings } from './dto/profile.dto';
import { AchievementDto } from './dto/achivements.dto';
import { TUpdateProfile, TUpdateSettings } from '@matrio/shared/schemas/profile.schemas';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string): Promise<ProfileDto> {
    const res = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        avatar: { select: { url: true } },
        profile: { include: { levelData: true } },
      },
    });

    if (!res) throw new BadRequestException('User not found');

    const { profile, avatar, ...user } = res;
    if (!profile) throw new BadRequestException('User not found');
    const { levelData, ...profileData } = profile;

    return {
      ...user,
      ...profileData,
      userId: user.id,
      avatar: avatar.url,
      xpInfo: {
        xp: profile?.xp ?? 0,
        level: profile?.level ?? 1,
        xpRequired: levelData.xpRequired,
        xpToNext: levelData.xpToNext,
      },
    };
  }

  async getSettingsByProfileId(profileId: string): Promise<Settings> {
    const res = await this.prisma.userSettings.findUnique({
      where: { profileId },
      select: {
        autoSave: true,
        locale: true,
        notification: true,
        showOnlineStats: true,
        sound: true,
        theme: true,
      },
    });

    if (!res) throw new BadRequestException('User not found');
    return res;
  }

  async getSettingsByUserId(userId: string): Promise<Settings> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { profile: { select: { id: true } } },
    });

    if (!user || !user.profile) throw new BadRequestException('User not found');
    const profileId = user.profile.id;
    return this.getSettingsByProfileId(profileId);
  }

  async getMeAchievements(userId: string): Promise<AchievementDto[]> {
    const gameAchievements = await this.prisma.gameAchievement.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        condition: true,
        imageUrl: true,
        type: true,
        gameName: true,
        reward: {
          omit: {
            updatedAt: true,
            createdAt: true,
          },
        },
        userAchievements: {
          where: { userId },
          select: {
            id: true,
            completedCondition: true,
            progress: true,
            unlockedAt: true,
            unlocked: true,
          },
        },
      },
    });

    const achievements = gameAchievements.map((achievement) => {
      const { userAchievements, reward, ...rest } = achievement;
      const isUnlocked = userAchievements[0]?.unlocked ?? false;

      return {
        ...rest,
        reward,
        unlocked: isUnlocked,
        unlockedAt: isUnlocked ? userAchievements[0]?.unlockedAt : null,
        progress: isUnlocked ? userAchievements[0]?.progress : 0,
        completedCondition: isUnlocked ? userAchievements[0]?.completedCondition : null,
      };
    });

    return achievements;
  }

  async getStatsByUserId(userId: string) {
    const gameStats = await this.prisma.gameStats.findFirst({
      where: { AND: [{ userId }, { gameName: null }] },
      include: {
        specificGameStats: {
          omit: {
            createdAt: true,
            updatedAt: true,
            specificStatsId: true,
            userId: true,
          },
        },
      },
      omit: {
        createdAt: true,
        updatedAt: true,
        gameName: true,
        specificStatsId: true,
      },
    });

    return gameStats;
  }

  async getGameHistoryByUserId(userId: string, page: number, limit: number) {
    const gameHistory = await this.prisma.gameSessionPlayer.findMany({
      where: { userId },
      include: {
        session: {
          include: {
            players: { include: { user: { include: { avatar: { select: { url: true } } } } } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
    });

    const history = gameHistory.map((game) => {
      const { session, ...rest } = game;
      const { players, ...restSession } = session;

      const opponentType = rest.opponentType;
      if (opponentType === 'AI') {
        return {
          id: rest.id,
          game: restSession.gameName,
          result: rest.result,
          xpGained: rest.xpGained,
          opponentType: 'AI',
          players: rest.opponentType,
          playedAt: rest.createdAt,
        };
      }

      const gamePlayers = players.map((player) => {
        return {
          id: player.user.id,
          username: player.user.username,
          avatar: player.user.avatar.url,
          isHost: player.isHost,
          isMe: player.userId === userId,
        };
      });

      return {
        id: rest.id,
        game: restSession.gameName,
        result: rest.result,
        xpGained: rest.xpGained,
        opponentType: 'Player',
        players: gamePlayers,
        playedAt: rest.createdAt,
      };
    });

    return history;
  }

  private async getProfileByUserId(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, include: { profile: true } });

    return user?.profile;
  }

  private async getUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // Update user profile
  async updateProfile(userId: string, updateProfileDto: TUpdateProfile) {
    const profile = await this.getProfileByUserId(userId);

    if (!profile) throw new BadRequestException('User not found');

    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          username: updateProfileDto.username,
          profile: {
            update: {
              name: updateProfileDto.name,
              bio: updateProfileDto.bio,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error('Error updating profile', error);
      throw new BadRequestException('Error updating profile');
    }
  }

  // Update user settings
  async updateSettings(id: string, updateSettingsDto: TUpdateSettings) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: { include: { settings: true } } },
    });

    if (!user) throw new BadRequestException('User not found');

    const { profile } = user;
    if (!profile || !profile.settings) throw new BadRequestException('User not found');

    try {
      const { settings, ...rest } = profile;
      const { autoSave, notification, showOnlineStats, sound, theme } = updateSettingsDto;

      return this.prisma.userSettings.update({
        where: { id: profile.settings.id },
        data: {
          autoSave: autoSave ?? settings.autoSave,
          showOnlineStats: showOnlineStats ?? settings.showOnlineStats,
          sound: sound ?? settings.sound,
          notification: notification ?? settings.notification,
          theme: theme ?? settings.theme,
        },
      });
    } catch (error) {
      this.logger.error('Error updating settings', error);
      throw new BadRequestException('Error updating settings');
    }
  }

  // Update avatar
  async updateAvatar(userId: string, avatarId?: number) {
    if (!avatarId) throw new BadRequestException('Avatar id is required');
    const user = await this.getUserById(userId);

    if (!user) throw new BadRequestException('User not found');

    try {
      return this.prisma.user.update({
        where: { id: userId },
        data: { avatarId },
      });
    } catch (error) {
      this.logger.error('Error updating avatar', error);
      throw new BadRequestException('Error updating avatar');
    }
  }
}
