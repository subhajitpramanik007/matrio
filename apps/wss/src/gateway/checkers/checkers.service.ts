import { Logger } from "../../common/logger";
import { TCheckersCellPosition, TCheckersRoomId } from "../../types";

import { roomCleaningCronJob } from "../../common/cron-job";

import { CheckersRoom } from "./checkers.room";
import { CheckersPlayer } from "./checkers.player";
import { InitPlayer } from "../../common/player/base.player";
import { CheckersRoomManager } from "./checkers.room-manger";

export class CheckersService {
  private logger = new Logger("Checkers Service");
  protected manager: CheckersRoomManager = new CheckersRoomManager();

  constructor() {
    this.logger.log("Checkers Service Initialized");

    roomCleaningCronJob(() => this.cleanRoom(), "Checkers Room Clean Cron Job");
  }

  get store() {
    return this.manager;
  }

  createPrivateRoom(
    cost: number,
    playerData: InitPlayer
  ): [CheckersRoom, CheckersPlayer] {
    const room = new CheckersRoom({ settings: { bettingCoins: cost } });
    const playerWithPiece = new CheckersPlayer(playerData, "red");

    room.addPlayer(playerWithPiece);
    this.manager.addRoom(room);
    return [room, playerWithPiece];
  }

  joinRoom(
    roomId: TCheckersRoomId,
    playerData: InitPlayer
  ): [CheckersRoom, CheckersPlayer] {
    const room = this.manager.getRoom(roomId)!;
    const playerWithPiece = new CheckersPlayer(playerData, "black");

    room.addPlayer(playerWithPiece);
    return [room, playerWithPiece];
  }

  joinRandomRoom(
    cost: number,
    playerData: InitPlayer
  ): [CheckersRoom, CheckersPlayer] {
    const existingRoom = this.manager.findRandomRoom(cost);

    if (existingRoom) {
      return this.joinRoom(existingRoom.id, playerData);
    }

    const room = new CheckersRoom({
      settings: { bettingCoins: cost, isRandom: true },
    });
    const playerWithPiece = new CheckersPlayer(playerData, "red");

    room.addPlayer(playerWithPiece);
    this.manager.addRandomRoom(room, cost);
    return [room, playerWithPiece];
  }

  playerMove(
    roomId: TCheckersRoomId,
    fromCellPosition: TCheckersCellPosition,
    toCellPosition: TCheckersCellPosition
  ): [CheckersRoom["board"], CheckersRoom["turn"]] {
    const room = this.store.getRoom(roomId)!;
    room.makeMove(fromCellPosition, toCellPosition);

    return [room.board, room.turn];
  }

  private cleanRoom() {
    this.logger.debug("Checkers Room Clean Cron Job Running...");

    this.store.allRooms.forEach((room) => {
      if (room.isCanCleanUp) {
        this.manager.cleanRoomDataByRoomId(room.id);
      }
    });
  }
}

export const checkersService = new CheckersService();
