import { Prisma, PrismaClient } from "@prisma/client";

const avatarsData: Prisma.AvatarCreateManyInput[] = [
  {
    name: "Avatar 1",
    url: "https://res.cloudinary.com/dcufm6qr0/image/upload/v1756909254/matrio/avatar1_fh7p86.png",
    publicId: "avatar1",
    isDefault: true,
  },
  {
    name: "Avatar 2",
    url: "https://res.cloudinary.com/dcufm6qr0/image/upload/v1756909249/matrio/avatar2_kcku64.png",
    publicId: "avatar2",
  },
];

const gamesData: Prisma.GameCreateManyInput[] = [
  {
    name: "TIC_TAC_TOE",
    tagline: "The classic 3x3 grid game",
    description: "The classic 3x3 grid game",
    tag: "Quick",
    released: new Date(),
  },
  {
    name: "CHECKERS",
    tagline: "Classic board game for 2 players",
    description: "Classic board game of strategy and skill",
    tag: "Strategy",
  },
  {
    name: "SUDOKU",
    tagline: "The classic 9x9 grid game",
    description: "The classic 9x9 grid game",
    tag: "Quick",
  },
  {
    name: "CHESS",
    tagline: "The classic 8x8 grid game",
    description: "The classic 8x8 grid game",
    tag: "Strategy",
  },
];

const gameAchievementsData: Prisma.GameAchievementCreateManyInput[] = [
  {
    title: "First Victory",
    description: "Win your first game",
    type: "GENERAL",
    rewardName: "Achievement_First_Victory_Reward",
    condition: { type: "WINS", value: 1 },
  },
  {
    title: "Speed Demon",
    description: "Win a game in under 30 seconds",
    type: "GAME",
    rewardName: "Achievement_Speed_Demon_Reward",
    condition: { type: "TIME", value: 30 },
  },
  {
    title: "Strategist",
    description: "Win 10 Checkers games",
    type: "STREAK",
    rewardName: "Achievement_Strategist_Reward",
    condition: { type: "WIN_STREAK", value: 10 },
  },
  {
    title: "Tic Tac Master",
    description: "Win 25 Tic-Tac-Toe games",
    type: "GENERAL",
    rewardName: "Achievement_Tic_Tac_Master_Reward",
    condition: { type: "WINS", value: 25 },
  },
  {
    title: "Perfectionist",
    description: "Win 10 games in a row",
    type: "GENERAL",
    rewardName: "Achievement_Perfectionist_Reward",
    condition: { type: "WIN_STREAK", value: 10 },
  },
  {
    title: "Century Club",
    description: "Win 100 games in a row",
    type: "GENERAL",
    rewardName: "Achievement_Century_Club_Reward",
    condition: { type: "WINS", value: 100 },
  },
  {
    title: "Mastermind",
    description: "Win 50 games in a row",
    type: "GENERAL",
    rewardName: "Achievement_Mastermind_Reward",
    condition: { type: "WIN_STREAK", value: 50 },
  },
  {
    title: "Grandmaster",
    description: "Reach level 20",
    type: "LEVEL",
    rewardName: "Achievement_Grandmaster_Reward",
    condition: { type: "LEVEL", value: 20 },
  },
];

const couponData: Prisma.CouponCreateManyInput[] = [
  {
    name: "Welcome Coupon",
    description: "Welcome to Matrio!",
    code: "WELCOME100",
    coins: 1000,
    limit: 1,
    isOneTime: true,
  },
];

const prisma = new PrismaClient();

class PrismaSeed {
  constructor(private readonly prisma: PrismaClient) {
    console.log("Initializing Prisma Seed");
  }

  async seed() {
    await this.populate();
  }

  private async populate() {
    await this.populateAvatar();
    await this.populateGame();
    await this.populateCoupon();
    await this.populateReward();
    await this.populateGameAchievement();
    await this.populateXpLevel();
  }

  private async populateAvatar() {
    try {
      await this.prisma.avatar.createMany({ data: avatarsData });

      console.log("Populated avatars");
    } catch (error: any) {
      console.log("FAILED TO POPULATE AVATARS", error.message);
    }
  }

  private async populateGame() {
    try {
      await this.prisma.game.createMany({ data: gamesData });

      console.log("Populated games");
    } catch (error: any) {
      console.log("FAILED TO POPULATE GAMES", error.message);
    }
  }

  private async populateCoupon() {
    try {
      await this.prisma.coupon.createMany({ data: couponData });

      console.log("Populated coupons");
    } catch (error: any) {
      console.log("FAILED TO POPULATE COUPONS", error.message);
    }
  }

  private async populateGameAchievement() {
    try {
      await this.prisma.gameAchievement.createMany({
        data: gameAchievementsData,
      });

      console.log("Populated game achievements");
    } catch (error: any) {
      console.log("FAILED TO POPULATE GAME ACHIEVEMENTS", error.message);
    }
  }

  private get generatedLevelsRewards() {
    const rewardData: Prisma.RewardCreateManyInput[] = [];
    for (let i = 1; i <= 20; i++) {
      const name = `Level_${i}_Reward`;
      const description = `Level ${i} Rewards`;
      const coins = i * 50;
      const xp = Math.ceil(i / 5) * 10;
      let xpMultiplierAdd = undefined;
      if (i % 5 === 0)
        xpMultiplierAdd = {
          value: 0.5,
          expirationLimit: 24 * 60 * 60 * 1000,
        };
      else if (i % 10 === 0)
        xpMultiplierAdd = { value: 0.5, isPermanent: true };

      rewardData.push({
        name,
        description,
        coins,
        xp,
        xpMultiplierAdd,
      });
    }

    return rewardData;
  }

  private get achievementRewards() {
    const data = [
      {
        name: "Achievement_First_Victory_Reward",
        coins: 100,
        xp: 10,
      },
      {
        name: "Achievement_Speed_Demon_Reward",
        coins: 1000,
        xp: 50,
      },
      {
        name: "Achievement_Strategist_Reward",
        coins: 500,
        xp: 100,
      },
      {
        name: "Achievement_Tic_Tac_Master_Reward",
        coins: 100,
        xp: 10,
        xpMultiplierAdd: { value: 0.5, expirationLimit: 6 * 60 * 60 * 1000 },
      },
      {
        name: "Achievement_Perfectionist_Reward",
        coins: 500,
        xp: 100,
      },
      {
        name: "Achievement_Mastermind_Reward",
        coins: 1000,
        xp: 200,
        xpMultiplierAdd: { value: 0.5, isPermanent: true },
      },
      {
        name: "Achievement_Century_Club_Reward",
        coins: 1000,
        xp: 200,
      },
      {
        name: "Achievement_Grandmaster_Reward",
        coins: 1000,
        xp: 500,
      },
    ];

    return data;
  }

  private async populateReward() {
    try {
      await this.prisma.reward.createMany({
        data: [...this.generatedLevelsRewards, ...this.achievementRewards],
      });

      console.log("Populated rewards");
    } catch (error: any) {
      console.log("FAILED TO POPULATE REWARDS", error.message);
    }
  }

  private get generatedXpLevels() {
    const xpLevelData: Prisma.XpLevelCreateManyInput[] = [];

    let xpRequired = 0;
    let xpToNext = 100;
    for (let i = 1; i <= 20; i++) {
      const level = i;
      const rewardName = `Level_${i}_Reward`;

      if (i === 1) {
        xpRequired = 0;
        xpToNext = 100;
      } else {
        xpRequired += xpToNext;
        xpToNext += Math.ceil(xpToNext / 4);
      }

      xpLevelData.push({
        level,
        rewardName,
        xpRequired,
        xpToNext,
      });
    }

    return xpLevelData;
  }

  private async populateXpLevel() {
    try {
      await this.prisma.xpLevel.createMany({ data: this.generatedXpLevels });

      console.log("Populated xp levels");
    } catch (error: any) {
      console.log("FAILED TO POPULATE XP LEVELS", error.message);
    }
  }
}

const prismaSeed = new PrismaSeed(prisma);
prismaSeed.seed();
