import { TCheckersCellPosition, TCheckersPieceColor } from "../../types";

const PLAYER_CHECKERS_MOVE = ["forward", "backward", "both"] as const;
type TPlayerCheckersMove = (typeof PLAYER_CHECKERS_MOVE)[number];

export const CHECKERS_MOVE_DIRECTIONS: Record<
  TPlayerCheckersMove,
  [number, number][]
> = {
  forward: [
    [-1, -1],
    [-1, 1],
  ],
  backward: [
    [1, -1],
    [1, 1],
  ],
  both: [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ],
};

type TCheckersPieceID<
  T extends TCheckersPieceColor,
  P extends TCheckersCellPosition,
> = `${T}-${P[0]}-${P[1]}`;

type DirectionForColor<C extends TCheckersPieceColor> = // type guard
  C extends "red"
    ? "forward" //
    : C extends "black"
      ? "backward" //
      : "never";

class CheckersPiece<
  T extends TCheckersPieceColor = TCheckersPieceColor,
  P extends TCheckersCellPosition = TCheckersCellPosition,
  DC extends DirectionForColor<T> = DirectionForColor<T>,
> {
  readonly id: TCheckersPieceID<T, P>;
  readonly color: T;
  readonly moveDirection: DC;
  isKing: boolean = false;

  constructor(color: T, position: P) {
    this.id = `${color}-${position[0]}-${position[1]}`;
    this.color = color;
    this.moveDirection = (color === "red" ? "forward" : "backward") as DC;
    this.isKing = false;
  }

  toggleKing() {
    this.isKing = !this.isKing;
  }

  getMoveDirection(): TPlayerCheckersMove {
    return this.isKing ? "both" : this.moveDirection;
  }

  getMoveDirections(): [number, number][] {
    return CHECKERS_MOVE_DIRECTIONS[this.getMoveDirection()];
  }

  get sanitize() {
    return {
      id: this.id,
      color: this.color,
      isKing: this.isKing,
    };
  }
}

export { CheckersPiece };
