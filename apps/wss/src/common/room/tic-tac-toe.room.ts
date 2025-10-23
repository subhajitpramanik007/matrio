import {
  GameType,
  TicTacToeBoard,
  PlayerId,
  TicTacToeSymbol,
  RoomState,
} from "../../types";
import { TicTacToePlayer } from "../player/tic-tac-toe.player";

import { BaseRoom } from "./base.room";
import { TicTacToeWinningLines } from "../constants";

export class TicTacToeRoom extends BaseRoom<TicTacToePlayer> {
  board: TicTacToeBoard;

  result: {
    winningLine: number[] | null;
    winnerId: PlayerId | null;
    isDraw: boolean;
  };

  constructor(options?: { isRandom?: boolean }) {
    super(GameType.TIC_TAC_TOE, {
      isRandom: options?.isRandom || false,
    });

    this.board = this.initBoard();

    this.result = {
      winningLine: null,
      winnerId: null,
      isDraw: false,
    };
  }

  initBoard() {
    return [null, null, null, null, null, null, null, null, null];
  }

  getPlayerBySymbol(symbol: TicTacToeSymbol) {
    this.updateTimestamp();
    return this.players.find((player) => player.symbol === symbol);
  }

  startGame() {
    this.state = RoomState.PLAYING;
    this.turn = this.players[0].id;
    this.updateTimestamp();
  }

  checkWinning(): boolean {
    const board = this.board;
    this.updateTimestamp();

    // check win
    for (const line of TicTacToeWinningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        this.onGameCompleted({
          result: "win",
          winnerId: this.getPlayerBySymbol(board[a])!.id,
          winningLine: line,
        });
        return true;
      }
    }

    // check draw
    if (this.board.every((cell) => cell !== null)) {
      this.onGameCompleted({ result: "draw" });
      return true;
    }

    return false;
  }

  private onGameCompleted(
    data:
      | { result: "draw" }
      | { result: "win"; winnerId: PlayerId; winningLine: number[] }
  ) {
    if (data.result === "draw") {
      this.result.isDraw = true;
      this.players.forEach((player) => player.onGameCompleted("draw"));
    } else {
      this.result.winnerId = data.winnerId;
      this.result.winningLine = data.winningLine;
      this.players.forEach((player) =>
        player.onGameCompleted(player.id === data.winnerId ? "win" : "lose")
      );
    }
    this.players.forEach((player) => {
      player.isReady = false;
    });
    this.state = RoomState.ENDED;
    this.turn = null;
    this.updateTimestamp();
  }

  reset() {
    super.reset();

    this.board = this.initBoard();

    this.result = {
      winningLine: null,
      winnerId: null,
      isDraw: false,
    };
    this.updateTimestamp();
  }

  get sanitize() {
    return {
      ...super.sanitize,
      board: this.board,
    };
  }
}
