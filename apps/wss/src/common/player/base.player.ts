import { PlayerId } from "../../types/player.type";

export interface InitPlayer {
  id: PlayerId;
  username: string;
  avatar?: string;
  isReady?: boolean;
  isHost?: boolean;
}

export class BasePlayer {
  readonly id: PlayerId;
  username: string;
  avatar?: string;
  isReady: boolean;
  isHost: boolean;
  noOfGamesPlayed: number;
  noOfWins: number;
  noOfLosses: number;
  noOfDraws: number;
  score?: number;

  constructor({ id, username, avatar, isReady, isHost }: InitPlayer) {
    this.id = id;
    this.username = username;
    this.avatar = avatar;
    this.isReady = isReady || false;
    this.isHost = isHost || false;
    this.noOfGamesPlayed = 0;
    this.noOfWins = 0;
    this.noOfLosses = 0;
    this.noOfDraws = 0;
    this.score = 0;
  }

  update<K extends Exclude<keyof this, "id">>(key: K, value: this[K]) {
    this[key] = value;
    return this;
  }

  onGameCompleted(result: "win" | "draw" | "lose") {
    if (result === "win") this.noOfWins += 1;
    else if (result === "draw") this.noOfDraws += 1;
    else this.noOfLosses += 1;
    this.noOfGamesPlayed += 1;
  }

  get sanitize() {
    return {
      id: this.id,
      username: this.username,
      isReady: this.isReady,
      isHost: this.isHost,
      noOfGamesPlayed: this.noOfGamesPlayed,
      noOfWins: this.noOfWins,
      noOfLosses: this.noOfLosses,
      noOfDraws: this.noOfDraws,
      score: this.score,
    };
  }
}
