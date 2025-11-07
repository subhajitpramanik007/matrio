import { TCheckersPieceColor } from "../../types/checkers.type";
import { BasePlayer, InitPlayer } from "../../common/player/base.player";

export class CheckersPlayer extends BasePlayer {
  piece: TCheckersPieceColor;
  noOfCaptures: number;
  noOfMissedTurns: number;

  constructor(player: InitPlayer, piece: TCheckersPieceColor) {
    super(player);

    this.piece = piece;
    this.noOfCaptures = 0;
    this.noOfMissedTurns = 0;
  }

  get sanitize() {
    return {
      ...super.sanitize,
      piece: this.piece,
    };
  }
}
