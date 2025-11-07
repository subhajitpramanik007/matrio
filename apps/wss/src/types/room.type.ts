import { GameType } from "./game.type";

export enum RoomState {
  IDLE = "idle",
  WAITING = "waiting",
  PLAYING = "playing",
  ENDED = "ended",
}

export type RoomCode = string;
export type RoomId<
  T extends GameType,
  TRoomCode extends RoomCode,
> = `${T}-${TRoomCode}`;

export interface Room<T> {
  roomCode: RoomCode;
  id: RoomId<GameType, RoomCode>;
  state: RoomState;
  players: Map<string, T>;
}
