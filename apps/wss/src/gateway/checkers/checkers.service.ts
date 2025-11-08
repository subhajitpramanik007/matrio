import { roomCleaningCronJob } from "../../common/cron-job";
import { Logger } from "../../common/logger";
import { InitPlayer } from "../../common/player/base.player";
import { GameType, TCheckersCellPosition, TCheckersRoomId } from "../../types";
import { CheckersPlayer } from "./checkers.player";
import { CheckersRoom } from "./checkers.room";

class CheckersRoomManager {
  private logger = new Logger("Checkers Room Manager");

  protected rooms: Map<TCheckersRoomId, CheckersRoom> = new Map();
  protected costToRandomRoomIds: Map<number, Set<TCheckersRoomId>> = new Map();

  constructor() {
    this.logger.log("Checkers Room Manager Initialized");
  }

  getRoom(roomId: TCheckersRoomId): CheckersRoom | null {
    return this.rooms.get(roomId) ?? null;
  }

  getRoomByCode(roomCode: string): CheckersRoom | null {
    const id = `${GameType.CHECKERS}-${roomCode}` as TCheckersRoomId;

    return this.getRoom(id);
  }

  addRoom(room: CheckersRoom) {
    this.rooms.set(room.id, room);

    this.logger.debug(
      `New room created: ${room.id} | isRandom: ${room.isRandom}`
    );
  }

  deleteRoom(roomId: TCheckersRoomId) {
    this.rooms.delete(roomId);

    this.logger.debug(`Room deleted: ${roomId}`);
  }

  addRandomRoom(room: CheckersRoom, cost: number) {
    const isHasThisCostSet = this.isHasThisCostRoomSet(cost);
    if (!isHasThisCostSet) this.costToRandomRoomIds.set(cost, new Set()); // new set

    this.costToRandomRoomIds.get(cost)!.add(room.id); // add into existing set
  }

  findRandomRoom(cost: number): CheckersRoom | null {
    if (!this.isHasThisCostRoomSet(cost)) return null;
    const roomIds = this.costToRandomRoomIds.get(cost)!;

    if (roomIds.size === 0) return null;
    const randomIdx = Math.floor(Math.random() * roomIds.size);
    const randomRoomId = Array.from(roomIds)[randomIdx];
    return this.getRoom(randomRoomId) || null;
  }

  get allRooms(): CheckersRoom[] {
    return Array.from(this.rooms.values());
  }

  private isHasThisCostRoomSet(cost: number): boolean {
    return this.costToRandomRoomIds.has(cost);
  }
}

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

    const room = new CheckersRoom({ settings: { bettingCoins: cost } });
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
        this.manager.deleteRoom(room.id);
        this.logger.debug(`Room deleted: ${room.id}`);
      }
    });
  }
}

export const checkersService = new CheckersService();
