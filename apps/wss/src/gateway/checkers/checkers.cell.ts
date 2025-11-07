import { TCheckersPieceColor } from "../../types";
import { CheckersPiece } from "./checkers.piece";

export class CheckersCell {
  row: number;
  col: number;
  isPiecePlaced: boolean = false;
  piece: CheckersPiece | null = null;

  constructor(row: number, col: number, piece: CheckersPiece | null = null) {
    this.row = row;
    this.col = col;
    if (piece) {
      this.isPiecePlaced = true;
      this.piece = piece;
    }
  }

  initPiece(color: TCheckersPieceColor) {
    if (this.isPiecePlaced) throw new Error("Piece already placed");

    const piece = new CheckersPiece(color, this.position);
    this.piece = piece;
    this.isPiecePlaced = true;
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
      isPiecePlaced: this.isPiecePlaced,
      piece: this.piece?.sanitize,
    };
  }
}
