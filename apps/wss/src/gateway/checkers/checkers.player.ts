import { TCheckersPieceColor } from "../../types/checkers.type";
import { BasePlayer, InitPlayer } from "../../common/player/base.player";

export class CheckersPlayer extends BasePlayer {
  pieceColor: TCheckersPieceColor;
  noOfCaptures: number;
  noOfMissedTurns: number;

  constructor(player: InitPlayer, pieceColor: TCheckersPieceColor) {
    super(player);

    this.pieceColor = pieceColor;
    this.noOfCaptures = 0;
    this.noOfMissedTurns = 0;
  }

  get sanitize() {
    return {
      ...super.sanitize,
      pieceColor: this.pieceColor,
      noOfCaptures: this.noOfCaptures,
      noOfMissedTurns: this.noOfMissedTurns,
    };
  }
}
