export type TCheckersRoomSettings = {
  readonly isRandom: boolean;
  readonly timer: number;
  readonly maxPlayers: number;
  readonly maxNoOfMissedTurns: number;
  readonly singlePlayer: boolean;
  readonly multipleCapture: boolean;
  readonly boardSize: number;
  readonly gameType: "multiplayer" | "you-vs-ai";
  readonly bettingCoins: number;
};

export const DEFAULT_SETTINGS: TCheckersRoomSettings = {
  isRandom: false,
  timer: 60,
  maxPlayers: 2,
  maxNoOfMissedTurns: 3,
  singlePlayer: false,
  multipleCapture: false,
  boardSize: 8,
  gameType: "multiplayer",
  bettingCoins: 0,
};

export class CheckersRoomSettings implements TCheckersRoomSettings {
  readonly isRandom: boolean = DEFAULT_SETTINGS.isRandom;
  readonly timer: number = DEFAULT_SETTINGS.timer;
  readonly maxPlayers: number = DEFAULT_SETTINGS.maxPlayers;
  readonly maxNoOfMissedTurns: number = DEFAULT_SETTINGS.maxNoOfMissedTurns;
  readonly singlePlayer: boolean = DEFAULT_SETTINGS.singlePlayer;
  readonly multipleCapture: boolean = DEFAULT_SETTINGS.multipleCapture;
  readonly boardSize: number = DEFAULT_SETTINGS.boardSize;
  readonly gameType: "multiplayer" | "you-vs-ai" = DEFAULT_SETTINGS.gameType;
  readonly bettingCoins: number = DEFAULT_SETTINGS.bettingCoins;

  constructor(settings?: Partial<TCheckersRoomSettings>) {
    this.isRandom = settings?.isRandom ?? this.isRandom;
    this.timer = settings?.timer ?? this.timer;
    this.maxPlayers = settings?.maxPlayers ?? this.maxPlayers;
    this.maxNoOfMissedTurns =
      settings?.maxNoOfMissedTurns ?? this.maxNoOfMissedTurns;
    this.singlePlayer = settings?.singlePlayer ?? this.singlePlayer;
    this.multipleCapture = settings?.multipleCapture ?? this.multipleCapture;
    this.boardSize = settings?.boardSize ?? this.boardSize;
    this.gameType = settings?.gameType ?? this.gameType;
  }

  get sanitize() {
    return {
      timer: this.timer,
      maxNoOfMissedTurns: this.maxNoOfMissedTurns,
      multipleCapture: this.multipleCapture,
      boardSize: this.boardSize,
      gameType: this.gameType,
      bettingCoins: this.bettingCoins,
    };
  }
}
