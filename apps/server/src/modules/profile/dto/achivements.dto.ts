import { ResponseDto } from '@/common/response/response.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { GameAchievement, Reward, UserAchievement } from '@matrio/db';

export class UserAchievements implements Partial<UserAchievement> {
  @Expose()
  completedCondition: any;
  @Expose()
  id: string;
  @Expose()
  progress: number;
  @Expose()
  unlocked: boolean;
  @Expose()
  unlockedAt: Date | null;
}

export class RewardDto {
  @Expose()
  id: Reward['id'];
  @Expose()
  name: Reward['name'];
  @Expose()
  coins: Reward['coins'];
  @Expose()
  xp: Reward['xp'];
  @Expose()
  xpMultiplierAdd: Reward['xpMultiplierAdd'];
  @Expose()
  image: Reward['image'];
}

export class AchievementDto {
  @Expose()
  id: GameAchievement['id'];
  @Expose()
  title: GameAchievement['title'];
  @Expose()
  description: GameAchievement['description'];
  @Expose()
  condition: GameAchievement['condition'];
  @Expose()
  imageUrl: GameAchievement['imageUrl'];
  @Expose()
  type: GameAchievement['type'];
  @Expose()
  gameName: GameAchievement['gameName'];

  @Expose()
  @Type(() => RewardDto)
  reward: RewardDto | null;

  @Expose()
  unlocked: boolean;
  @Expose()
  progress: number;
  @Expose()
  completedCondition: any;
  @Expose()
  unlockedAt: Date | null;
}

export class AchievementsResponseDto extends ResponseDto {
  @Expose()
  achievements: AchievementDto[];
}
