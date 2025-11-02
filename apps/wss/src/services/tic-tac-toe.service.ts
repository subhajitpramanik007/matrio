import { RoomId, RoomState } from "../types/room.type";

import { TicTacToeRoom } from "../common/room/tic-tac-toe.room";
import { TicTacToePlayer } from "../common/player/tic-tac-toe.player";
import { Logger } from "../common/logger";
import WebSocketServer from "../socket";

export class TicTacToeService {
  private logger = new Logger("TicTacToeService");
  rooms: Map<RoomId, TicTacToeRoom>;

  constructor() {
    this.logger.log("TicTacToeService initialized");

    this.rooms = new Map();
  }

  checkRooms() {
    [...this.rooms.values()].forEach((room) => {
      if (room.canClean) {
        this.logger.log(
          `Room ${room.id} deleted | players: ${room.noOfPlayers}`
        );
        this.rooms.delete(room.id);
        WebSocketServer.instance.cleanRoomData(room.id);
      }
    });

    const roomSize = this.rooms.size;
    const noOfPlayers = [...this.rooms.values()].reduce(
      (acc, room) => acc + room.noOfPlayers,
      0
    );

    if (roomSize > 0) {
      this.logger.log(`${roomSize} rooms | players: ${noOfPlayers}`);
    }
  }

  getRandomRoom() {
    const randomRooms = [];
    for (const room of this.rooms.values()) {
      if (
        room.state === RoomState.IDLE &&
        room.isRandom &&
        room.noOfPlayers < room.settings.maxPlayers
      ) {
        randomRooms.push(room);
      }
    }
    if (randomRooms.length === 0) return null;
    const lengthOfRandomRooms = randomRooms.length;
    const randomIndex = Math.floor(Math.random() * lengthOfRandomRooms);
    return randomRooms[randomIndex];
  }

  createRoom(isRandom?: boolean) {
    const room = new TicTacToeRoom({ isRandom });
    this.rooms.set(room.id, room);
    return room;
  }

  getRoom(roomId: RoomId) {
    return this.rooms.get(roomId);
  }

  deleteRoom(roomId: RoomId) {
    this.rooms.delete(roomId);
  }

  joinRoom(roomId: RoomId, player: TicTacToePlayer) {
    const room = this.getRoom(roomId);
    if (!room) throw new Error("Room not found");
    if (room.isFull) throw new Error("Room is full");
    room.addPlayer(player);
    return room;
  }

  checkWinning(room: TicTacToeRoom) {}
}

const ticTacToeService = new TicTacToeService();

export { ticTacToeService };
