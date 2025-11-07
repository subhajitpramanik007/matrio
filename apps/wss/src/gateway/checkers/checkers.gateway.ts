import { Socket } from "socket.io";
import {
  GameEventsResponse,
  GameType,
  TCheckersRoomId,
  TCheckersCellPosition,
  RoomCode,
} from "../../types";

import GameGateway from "../game.gateway";
import { CheckersRoom } from "./checkers.room";
import { CheckersPlayer } from "./checkers.player";
import { CheckersService, checkersService } from "./checkers.service";

import { SocketException } from "../../common/error";
import { SocketResponse } from "../../common/response";

class CheckersGateway extends GameGateway {
  constructor(private readonly service: CheckersService) {
    super(GameType.CHECKERS);
  }

  createRoom(client: Socket, data: any) {
    this.checkPlayerAvailability(client.user?.roomId);

    const cost = this.validateGameCost(data);
    const playerData = { ...client.user, isHost: true };

    const [room, player] = this.service.createPrivateRoom(cost, playerData);

    this.setupClientRoom(client, room.id, player);

    return new SocketResponse({ room: room.sanitize });
  }

  joinRoom(client: Socket, data: any) {
    this.checkPlayerAvailability(client.user?.roomId);

    const roomCode = this.validateJoinRoomCode(data);

    const room = this.service.store.getRoomByCode(roomCode);
    if (!room) throw new SocketException("Room not found");

    const playerData = { ...client.user };

    const [_, player] = this.service.joinRoom(room.id, playerData);

    this.setupClientRoom(client, room.id, player);
    this.broadcastPlayerJoined(room);
    return new SocketResponse({ room: room.sanitize });
  }

  randomRoom(client: Socket, data: { cost?: number | string }) {
    this.checkPlayerAvailability(client.user?.roomId);

    const cost = this.validateGameCost(data);
    const playerData = { ...client.user };

    const [room, player] = this.service.joinRandomRoom(cost, playerData);

    this.setupClientRoom(client, room.id, player);
    this.broadcastPlayerJoined(room);
    return new SocketResponse({ room: room.sanitize });
  }

  leaveRoom(client: Socket, data: any) {
    const roomId = String(data.roomCode) || client.user?.roomId;
    if (!roomId) throw new SocketException("Room code is required");

    const room = this.service.store.getRoom(roomId);
    if (!room) throw new SocketException("Room not found");

    client.user.roomId = null;
    client.leave(room.id);
    if (room.noOfPlayers < 2) this.service.store.deleteRoom(room.id);

    this.broadcastToRoomLater(
      GameEventsResponse.PLAYER_LEFTED,
      room.id,
      new SocketResponse({ room: room.sanitize })
    );

    return new SocketResponse();
  }

  makeMove(client: Socket, data: any) {
    const {
      fromCellPosition,
      toCellPosition,
      roomCode, // RoomCode
    } = this.validatePlayerMoveData(data);

    const room = this.service.store.getRoomByCode(roomCode);
    if (!room) throw new SocketException("Room not found");

    const player = room.getPlayer(client.id);
    if (!player) throw new SocketException("Player not found");

    const isPlayerTurn = player.id === room.turn;
    if (!isPlayerTurn) throw new SocketException("It is not your turn");

    const [board, nextTurn] = this.service.playerMove(
      room.id,
      fromCellPosition,
      toCellPosition
    );

    this.broadcastToRoomLater(
      GameEventsResponse.PLAYER_MOVED,
      room.id,
      new SocketResponse({ board, nextTurn })
    );
  }

  restartGame(client: Socket, data: any) {}

  onDisconnect(client: Socket) {}

  // Useless
  ready(client: Socket, data: any) {}

  startGame(client: Socket, data: any) {}

  endGame(client: Socket, data: any) {}

  result(client: Socket, data: any) {}
  // ---------------- Private methods -----------------------------------

  private validateGameCost(data: any) {
    const cost = Number(data?.cost);
    if (!cost) throw new SocketException("Cost is required");
    return cost;
  }

  private checkPlayerAvailability(roomId?: string) {
    if (roomId) {
      throw new SocketException("Player is already in room");
    }
  }

  private validateJoinRoomCode(data: any) {
    let error;
    const roomCode = data.roomCode;

    if (!roomCode) error = "Room code is required";
    if (typeof roomCode !== "string") error = "Room code must be a string";
    if (roomCode.length !== 4) error = "Room code must be 4 characters long";
    if (error) throw new SocketException(error);

    return roomCode as RoomCode;
  }

  private setupClientRoom(
    client: Socket,
    roomId: TCheckersRoomId,
    player: CheckersPlayer
  ) {
    client.join(roomId);
    client.user.roomId = roomId;

    client.emit(
      GameEventsResponse.PLAYER_DATA,
      new SocketResponse({ player: player.sanitize })
    );
  }

  private broadcastPlayerJoined(room: CheckersRoom) {
    if (room.noOfPlayers <= 1) return;

    // if more than 1 player
    this.broadcastToRoomLater(
      GameEventsResponse.PLAYER_JOINED,
      room.id,
      new SocketResponse({ room: room.sanitize })
    );

    if (!room.isFull) return;

    // if room is full
    this.broadcastToRoomLater(
      GameEventsResponse.GAME_STARTED,
      room.id,
      new SocketResponse({ room: room.sanitize })
    );
  }

  private validatePlayerMoveData(data: any): {
    fromCellPosition: TCheckersCellPosition;
    toCellPosition: TCheckersCellPosition;
    roomCode: string;
  } {
    const fromCellPosition = this.validatedBoardCell(data.fromCell);
    const toCellPosition = this.validatedBoardCell(data.toCell);
    const roomCode = this.validateJoinRoomCode(data.roomCode);

    return { fromCellPosition, toCellPosition, roomCode };
  }

  private validatedBoardCell(cell: any): TCheckersCellPosition {
    // cell must array of 2 numbers
    if (
      Array.isArray(cell) &&
      cell.length === 2 &&
      typeof cell[0] === "number" &&
      typeof cell[1] === "number" &&
      cell[0] >= 0 &&
      cell[0] < 8 &&
      cell[1] >= 0 &&
      cell[1] < 8
    ) {
      return [cell[0], cell[1]];
    }

    throw new SocketException(
      "Cell must be an array of 2 numbers between 0 and 8"
    );
  }
}

export default new CheckersGateway(checkersService);
