export interface Player {
  id: string;
  username: string;
  avatar?: string;
  isReady: boolean;
  isHost: boolean;
  noOfGamesPlayed: number;
  noOfWins: number;
  noOfLosses: number;
  noOfDraws: number;
  score?: number;
}

export type PlayerId = Player["id"];

export interface SocketPlayer extends Player {
  socketId: string;
}
