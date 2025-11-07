import { GameType } from "./game.type";
import { RoomCode, RoomId } from "./room.type";

export type TCheckersPieceColor = "red" | "black";
export type TCheckersCellPosition = [row: number, col: number];
export type TCheckersRoomId = RoomId<GameType.CHECKERS, RoomCode>;
