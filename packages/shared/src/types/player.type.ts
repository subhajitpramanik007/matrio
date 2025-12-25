export type PlayerStats = {
  noOfGamesPlayed: number;
  noOfWins: number;
  noOfLosses: number;
  noOfDraws: number;
};

export type InitPlayerData = {
  id: string;
  socketId: string;
  username: string;
  avatar?: string;
};

export type Player = InitPlayerData & {
  stats: PlayerStats;
  isReady?: boolean;
  isHost?: boolean;
};
