export type EGame = "tic-tac-toe" | "checkers";

export interface IGameStats {
  totalGames: number;
  totalWins: number;
  totalLosses: number;
  winRate: number;
  longestWinStreak: number;
  currentStreak: number;
  hoursPlayed: number;
  favoriteGames?: string[];
}

export interface ISpecificGameStats {
  title: string;
  stats: Omit<IGameStats, "favoriteGame">;
}

export interface IGameStatsWithGames extends IGameStats {
  games: {
    [key in EGame]: ISpecificGameStats;
  };
}

export interface IGameAchievement {
  title: string;
  description: string;
  unlocked: boolean;
  date: string | null;
}

export interface IGameRecentActivity {
  game: string;
  result: string;
  opponent: string;
  date: string;
  xpGained: number;
}

// Game Stats
export type TGameName = "TIC_TAC_TOE" | "CHECKERS" | "CHESS" | "SUDOKU";

export interface IGameStatsData {
  id: string;
  wins: number;
  losses: number;
  ties: number;
  totalGames: number;
  winRate: number;
  highestWinStreak: number;
  currentWinStreak: number;
  hoursPlayed: number;
  specificGameStats?: ISpecificGameStatsData[];
  userId?: string;
}

export interface ISpecificGameStatsData
  extends Omit<IGameStatsData, "specificGameStats" | "userId"> {
  gameName: TGameName;
}
