export enum RoomState {
  IDLE = "idle",
  WAITING = "waiting",
  PLAYING = "playing",
  ENDED = "ended",
}

export interface Room<T> {
  id: string;
  roomCode: string;
  state: RoomState;
  players: Map<string, T>;
}

export type RoomId = Room<any>["id"];
export type RoomCode = Room<any>["roomCode"];
