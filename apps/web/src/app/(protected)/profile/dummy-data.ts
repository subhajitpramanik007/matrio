import {
  IGameAchievement,
  IGameRecentActivity,
  IGameStatsWithGames,
  IProfile,
  IProfileSettings,
} from "@/types";

export const profile: IProfile = {
  name: "Alex Player",
  email: "alex.player@example.com",
  bio: "Casual gamer who loves strategy games and quick matches. Always up for a challenge!",
  avatar: "/diverse-gaming-avatars.png",
  joinDate: "March 2024",
  level: 12,
  xp: 2450,
  xpToNext: 3000,
};

export const profileSettings: IProfileSettings = {
  soundEffects: true,
  notifications: true,
  autoSave: true,
  darkMode: false,
  showOnlineStatus: true,
};

export const gameStats: IGameStatsWithGames = {
  totalGames: 127,
  totalWins: 86,
  totalLosses: 41,
  winRate: 68,
  longestWinStreak: 12,
  currentStreak: 3,
  hoursPlayed: 28,
  favoriteGames: ["Tic-Tac-Toe"],
  games: {
    "tic-tac-toe": {
      title: "Tic-Tac-Toe",
      stats: {
        totalGames: 77,
        totalWins: 53,
        totalLosses: 24,
        winRate: 68,
        longestWinStreak: 12,
        currentStreak: 3,
        hoursPlayed: 16,
      },
    },
    checkers: {
      title: "Checkers",
      stats: {
        totalGames: 50,
        totalWins: 32,
        totalLosses: 18,
        winRate: 64,
        longestWinStreak: 8,
        currentStreak: 2,
        hoursPlayed: 12,
      },
    },
  },
};

export const achievements: IGameAchievement[] = [
  {
    title: "First Victory",
    description: "Win your first game",
    unlocked: true,
    date: "Mar 15, 2024",
  },
  {
    title: "Speed Demon",
    description: "Win a game in under 30 seconds",
    unlocked: true,
    date: "Mar 18, 2024",
  },
  {
    title: "Strategist",
    description: "Win 10 Checkers games",
    unlocked: true,
    date: "Mar 25, 2024",
  },
  {
    title: "Tic-Tac-Master",
    description: "Win 25 Tic-Tac-Toe games",
    unlocked: true,
    date: "Apr 2, 2024",
  },
  {
    title: "Perfectionist",
    description: "Win 10 games in a row",
    unlocked: true,
    date: "Apr 8, 2024",
  },
  {
    title: "Century Club",
    description: "Play 100 games",
    unlocked: true,
    date: "Apr 15, 2024",
  },
  {
    title: "Grandmaster",
    description: "Reach level 15",
    unlocked: false,
    date: null,
  },
  {
    title: "Unstoppable",
    description: "Win 20 games in a row",
    unlocked: false,
    date: null,
  },
];

export const recentActivity: IGameRecentActivity[] = [
  {
    game: "Tic-Tac-Toe",
    result: "Won",
    opponent: "AI Medium",
    date: "2 hours ago",
    xpGained: 25,
  },
  {
    game: "Checkers",
    result: "Lost",
    opponent: "AI Hard",
    date: "5 hours ago",
    xpGained: 10,
  },
  {
    game: "Tic-Tac-Toe",
    result: "Won",
    opponent: "AI Easy",
    date: "1 day ago",
    xpGained: 15,
  },
  {
    game: "Checkers",
    result: "Won",
    opponent: "AI Medium",
    date: "1 day ago",
    xpGained: 30,
  },
  {
    game: "Tic-Tac-Toe",
    result: "Won",
    opponent: "AI Hard",
    date: "2 days ago",
    xpGained: 40,
  },
];
