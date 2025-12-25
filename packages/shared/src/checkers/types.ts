import { Brand } from "types/brand.type";
import { Player } from "../types/player.type";

export type TCheckersPosition = [row: number, col: number];

export type TCheckersPieceColor = "black" | "red";

export type TCheckersPieceMoveDirection = "forward" | "backward" | "both";

export type TCheckersPiece = {
  id: Brand<string, "CheckersPieceId">;
  color: TCheckersPieceColor;
  moveDirection: TCheckersPieceMoveDirection;
  isKing: boolean | undefined;
  ownerId?: string;
};

export type TCheckersCell = {
  row: number;
  col: number;
  piece: TCheckersPiece | null;
  isDark: boolean;
  highlightType?:
    | "old_selected_cell"
    | "selected_cell"
    | "possible_move"
    | "possible_capture"
    | "none";
};

export type TCheckersMove = {
  from: TCheckersPosition;
  to: TCheckersPosition;
  captures: TCheckersPosition[];
  isCapture: boolean;
};

export type TCheckersBoard = TCheckersCell[][];

export type TCheckersPlayer = Player & {
  pieceColor: TCheckersPieceColor;
  noOfCaptures: number;
  noOfMissedTurns: number;
};

export type TCheckersGameResult =
  | { winner: TCheckersPlayer["id"]; isDraw: false }
  | { isDraw: true };

export type TCheckersRoomMetadata = {
  readonly boardSize: number;
  board: TCheckersCell[][];
  turn: string | null;

  result: TCheckersGameResult | null;
};
