import { Logger } from "../../common/logger";
import { GameType, TCheckersRoomId } from "../../types";
import { CheckersRoom } from "./checkers.room";

export class CheckersRoomManager {
  private logger = new Logger("Checkers Room Manager");

  protected rooms: Map<TCheckersRoomId, CheckersRoom> = new Map();
  protected costToRandomRoomIds: Map<number, Set<TCheckersRoomId>> = new Map();

  constructor() {
    this.logger.log("Checkers Room Manager Initialized");

    setInterval(() => {
      this.logger.debug("No of rooms", this.rooms.size);

      this.costToRandomRoomIds.forEach((roomIds, cost) => {
        this.logger.debug(`Random rooms for cost (${cost}): ${roomIds.size}`);
      });
    }, 10 * 1000);
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
  }

  addRandomRoom(room: CheckersRoom, cost: number) {
    const isHasThisCostSet = this.isHasThisCostRoomSet(cost);
    if (!isHasThisCostSet) this.costToRandomRoomIds.set(cost, new Set()); // new set

    this.costToRandomRoomIds.get(cost)!.add(room.id); // add into existing set
    this.addRoom(room);
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

  cleanRoomDataByRoomId(roomId: TCheckersRoomId) {
    const room = this.getRoom(roomId);

    if (!room) return;
    this.deleteRoom(roomId);
    this.logger.debug(`Room deleted: ${roomId}`);

    if (!room.isRandom) return;
    this.costToRandomRoomIds.get(room.settings.bettingCoins)?.delete(roomId);
  }

  private isHasThisCostRoomSet(cost: number): boolean {
    return this.costToRandomRoomIds.has(cost);
  }
}
