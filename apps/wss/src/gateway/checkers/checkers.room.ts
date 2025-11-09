import crypto from "crypto";
import {
  GameType,
  PlayerId,
  RoomCode,
  RoomState,
  TCheckersCellPosition,
  TCheckersRoomId,
} from "../../types";

import {
  CheckersRoomSettings,
  TCheckersRoomSettings,
} from "./checkers.room.settings";
import { CheckersBoard } from "./checkers.board";
import { CheckersPlayer } from "./checkers.player";
import { Timestamp } from "../../common/timestamp";

const ROOM_CLEAN_TIME = 5 * 60 * 1000;

export class CheckersRoom {
  id: TCheckersRoomId;
  roomCode: RoomCode;
  board: CheckersBoard;
  turn: PlayerId | null = null;
  state: RoomState = RoomState.IDLE;

  players: CheckersPlayer[] = [];
  settings: CheckersRoomSettings;
  timeStamp: Timestamp = new Timestamp();

  constructor({ settings }: { settings?: Partial<TCheckersRoomSettings> }) {
    const roomCode = this.generateRoomCode();

    this.id = `${GameType.CHECKERS}-${roomCode}`;
    this.roomCode = roomCode;

    this.settings = new CheckersRoomSettings(settings);
    this.board = new CheckersBoard(this.boardSize);
  }

  private generateRoomCode(): RoomCode {
    return crypto.randomInt(1000, 9999).toString();
  }

  get boardSize() {
    return this.settings.boardSize;
  }

  get isRandom() {
    return this.settings.isRandom;
  }

  get noOfPlayers() {
    return this.players.length;
  }

  get isFull() {
    return this.noOfPlayers === this.settings.maxPlayers;
  }

  get isEmpty() {
    return this.noOfPlayers === 0;
  }

  getPlayer(id: string): CheckersPlayer | null {
    return this.players.find((player) => player.id === id) ?? null;
  }

  addPlayer(player: CheckersPlayer) {
    this.players.push(player);
    this.timeStamp.update();
  }

  removePlayer(id: string) {
    this.players = this.players.filter((player) => player.id !== id);
    this.timeStamp.update();
  }

  newBoard() {
    this.board = new CheckersBoard(this.boardSize);
    this.timeStamp.update();
  }

  changeTurn() {
    const idx = this.players.findIndex((player) => player.id === this.turn);
    this.turn = this.players[(idx + 1) % this.players.length].id;

    this.timeStamp.update();
  }

  startGame() {
    this.board.init();
    this.turn = this.players[0].id;
    this.state = RoomState.PLAYING;

    this.timeStamp.update();
  }

  makeMove(
    fromCellPosition: TCheckersCellPosition,
    toCellPosition: TCheckersCellPosition
  ) {
    const fromCell = this.board.getCell(
      fromCellPosition[0],
      fromCellPosition[1]
    );
    const moves = this.board.getMultipleCapture(fromCell!);

    const isValidMove = moves.some((move) => move.includes(toCellPosition));
    if (!isValidMove) return null;

    this.board.getCellByPosition(fromCellPosition)!.removePiece();
    this.board.getCellByPosition(toCellPosition)!.changePiece(fromCell!.piece!);

    this.timeStamp.update();
  }

  get sanitize() {
    return {
      id: this.id,
      roomCode: this.roomCode,
      board: this.board.grid.map((row) => row.map((cell) => cell.sanitize)),
      turn: this.turn,
      state: this.state,
      settings: this.settings.sanitize,
      players: this.players.map((player) => player.sanitize),
    };
  }

  get isCanCleanUp() {
    const isRoomIdle = this.state === RoomState.IDLE;
    const isRoomEmpty = this.noOfPlayers === 0;

    const roomAge = Date.now() - this.timeStamp.updatedAt.getTime();
    const isRoomOld = roomAge > ROOM_CLEAN_TIME;

    return isRoomOld || (isRoomIdle && isRoomEmpty);
  }
}
