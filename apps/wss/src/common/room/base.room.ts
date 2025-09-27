import { GameType } from "../../types/game.type";
import { PlayerId } from "../../types/player.type";
import { RoomCode, RoomId, RoomState } from "../../types/room.type";

import crypto from "crypto";
import { BasePlayer } from "../player/base.player";
import { TIC_TAC_TOE_ROOM_CLEANUP_TIMEOUT } from "../constants";

export class BaseRoom<TPlayer extends BasePlayer = BasePlayer> {
  readonly id: RoomId;
  readonly roomCode: RoomCode;
  readonly game: GameType;
  readonly isRandom: boolean;
  players: TPlayer[];
  state: RoomState;
  turn: PlayerId | null;

  result: {
    winnerId: PlayerId | null;
    isDraw: boolean | null;
  };

  settings: {
    timer: number;
    maxPlayers: number;
  };
  updatedAt: number;

  constructor(
    game: GameType,
    options?: {
      timer?: number;
      maxPlayers?: number;
      players?: TPlayer[];
      state?: RoomState;
      turn?: PlayerId;
      isRandom?: boolean;
    }
  ) {
    this.game = game;
    const roomCode = this.generateRoomCode();
    this.id = `${game}_${roomCode}`;
    this.roomCode = roomCode;
    this.players = options?.players || [];
    this.state = options?.state || RoomState.IDLE;
    this.turn = options?.turn || null;
    this.isRandom = options?.isRandom || false;

    this.result = {
      winnerId: null,
      isDraw: null,
    };

    this.settings = {
      timer: 60,
      maxPlayers: 2,
    };

    if (options?.timer) this.settings.timer = options.timer;
    if (options?.maxPlayers) this.settings.maxPlayers = options.maxPlayers;
    this.updatedAt = Date.now();
  }

  protected generateRoomCode() {
    return crypto.randomInt(1000, 9999).toString();
  }

  protected updateTimestamp() {
    this.updatedAt = Date.now();
  }

  update<T extends keyof Omit<BaseRoom<TPlayer>, "id" | "roomCode" | "game">>(
    key: T,
    value: this[T]
  ) {
    this[key] = value;
    this.updateTimestamp();
  }

  updateSettings<T extends keyof this["settings"]>(
    key: T,
    value: this["settings"][T]
  ) {
    this.settings = {
      ...this.settings,
      [key]: value,
    };
    this.updateTimestamp();
  }

  addPlayer(player: TPlayer) {
    this.players.push(player);
    this.updateTimestamp();
  }

  removePlayer(playerId: PlayerId) {
    this.players = this.players.filter((player) => player.id !== playerId);
    this.updateTimestamp();
  }

  getPlayer(playerId: PlayerId) {
    return this.players.find((player) => player.id === playerId);
  }

  get noOfPlayers() {
    return this.players.length;
  }

  get isFull() {
    return this.noOfPlayers === this.settings.maxPlayers;
  }

  isPlayerTurn(playerId: PlayerId) {
    return this.turn === playerId;
  }

  nextTurn() {
    const index = this.players.findIndex((player) => player.id === this.turn);
    this.turn = this.players[(index + 1) % this.players.length].id;
  }

  reset() {
    this.state = RoomState.IDLE;
    this.turn = null;
    this.result = {
      winnerId: null,
      isDraw: null,
    };
    this.updateTimestamp();
  }

  get sanitize() {
    return {
      id: this.id,
      roomCode: this.roomCode,
      game: this.game,
      players: this.players.map((player) => player.sanitize),
      state: this.state,
      turn: this.turn,
      settings: this.settings,
    };
  }

  get canClean() {
    const isRoomIdle = this.state === RoomState.IDLE;
    const isRoomEmpty = this.noOfPlayers === 0;
    const isRoomOld =
      Date.now() - this.updatedAt > TIC_TAC_TOE_ROOM_CLEANUP_TIMEOUT;

    return isRoomOld || (isRoomIdle && isRoomEmpty);
  }
}
