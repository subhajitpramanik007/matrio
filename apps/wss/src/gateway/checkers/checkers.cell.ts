import { TCheckersPieceColor } from "../../types";
import { CheckersPiece } from "./checkers.piece";

export class CheckersCell {
  row: number;
  col: number;
  isVisited: boolean = false;
  piece: CheckersPiece | null = null;

  constructor(row: number, col: number, piece: CheckersPiece | null = null) {
    this.row = row;
    this.col = col;
    if (piece) {
      this.isVisited = true;
      this.piece = piece;
    }
  }

  visited() {
    this.isVisited = true;
  }

  initPiece(color: TCheckersPieceColor) {
    if (this.isVisited) return;

    const piece = new CheckersPiece(color, this.position);
    this.piece = piece;
  }

  changePiece(piece: CheckersPiece) {
    this.piece = piece;
  }

  removePiece() {
    this.piece = null;
  }

  isPiecePresent(): boolean {
    return this.piece !== null;
  }

  get position(): [number, number] {
    return [this.row, this.col];
  }

  get sanitize() {
    return {
      row: this.row,
      col: this.col,
      piece: this.piece?.sanitize,
    };
  }
}
