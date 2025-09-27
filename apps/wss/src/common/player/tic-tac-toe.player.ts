import { TicTacToeSymbol } from "../../types/tic-tac-toe.type";

import { BasePlayer, InitPlayer } from "./base.player";

export class TicTacToePlayer extends BasePlayer {
  symbol: TicTacToeSymbol;

  constructor(player: InitPlayer & { symbol: TicTacToeSymbol }) {
    super(player);

    this.symbol = player.symbol;
  }

  setSymbol(symbol: TicTacToeSymbol) {
    this.symbol = symbol;
  }

  is(symbol: TicTacToeSymbol) {
    return this.symbol === symbol;
  }
}
