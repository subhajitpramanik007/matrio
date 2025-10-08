export const GameSlug = ["tic-tac-toe", "checkers"] as const;
export type EGameSlug = (typeof GameSlug)[number];

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
    [key in EGameSlug]: ISpecificGameStats;
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

// Game Name
export type TGameName = "TIC_TAC_TOE" | "CHECKERS" | "CHESS" | "SUDOKU";

// Game Stats
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

// Game Mode
export const GameMode = ["ai", "local", "online"] as const;
export type GameMode = (typeof GameMode)[number];

export type GameAndMode = `${EGameSlug}::${GameMode}`;

// Game Store
export type TGameStore = {
  game: EGameSlug | null;
  mode: GameMode | null;
  gameAndMode: GameAndMode | null;
  status: "idle" | "loading" | "success" | "error";
  setGame: (game: EGameSlug) => void;
  setMode: (mode: GameMode) => void;
  clear: () => void;
};
