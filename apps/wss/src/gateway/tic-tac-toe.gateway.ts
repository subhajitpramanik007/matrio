import { Socket } from "socket.io";
import GameGateway from "./game.gateway";

import {
  GameEventsRequest,
  GameEventsResponse,
  GameType,
} from "../types/game.type";
import { RoomCode, RoomState } from "../types/room.type";

import {
  TicTacToeService,
  ticTacToeService,
} from "../services/tic-tac-toe.service";
import { TicTacToePlayer } from "../common/player/tic-tac-toe.player";
import { SocketResponse } from "../common/response";
import {
  BadRequestException,
  PlayerAlreadyInRoomException,
  RoomNotFoundException,
} from "../common/error";
import { TIC_TAC_TOE_ROOM_CLEANUP_CHECK_INTERVAL } from "../common/constants";
import { Logger } from "../common/logger";
import { returnAfterComplete } from "../common/utils";

class TicTacToeGateway extends GameGateway {
  logger = new Logger("TicTacToeGateway");
  interval: NodeJS.Timeout;

  constructor(private readonly service: TicTacToeService) {
    super(GameType.TIC_TAC_TOE);

    this.logger.log("TicTacToeGateway initialized");

    this.interval = setInterval(() => {
      this.service.checkRooms();
    }, TIC_TAC_TOE_ROOM_CLEANUP_CHECK_INTERVAL);
  }

  private checkPlayerAvailability(roomId?: string) {
    if (roomId) throw new PlayerAlreadyInRoomException();
  }

  private checkRoomAvailability(roomId?: string) {
    if (!roomId) throw new RoomNotFoundException();
  }

  createRoom(client: Socket, data: any) {
    this.checkPlayerAvailability(client.user?.roomId);

    const room = this.service.createRoom();

    const player = new TicTacToePlayer({
      id: client.id,
      username: client.user.username,
      avatar: client.user.avatar,
      isReady: false,
      isHost: true,
      symbol: "X",
    });

    room.addPlayer(player);
    client.join(room.id);
    client.user.roomId = room.id;

    client.emit(
      GameEventsResponse.PLAYER_DATA,
      new SocketResponse({ player: player.sanitize })
    );

    return new SocketResponse({ room: room.sanitize });
  }

  joinRoom(client: Socket, data: { roomCode?: RoomCode }) {
    this.checkRoomAvailability(data.roomCode);
    this.checkPlayerAvailability(client.user?.roomId);

    const player = new TicTacToePlayer({
      id: client.id,
      isHost: false,
      isReady: false,
      username: client.user.username,
      avatar: client.user.avatar,
      symbol: "O",
    });

    const room = this.service.joinRoom(`${this.game}_${data.roomCode}`, player);
    client.join(room.id);
    client.user.roomId = room.id;

    client.emit(
      GameEventsResponse.PLAYER_DATA,
      new SocketResponse({ player: player.sanitize })
    );

    this.broadcastToRoomLater(
      GameEventsResponse.PLAYER_JOINED,
      room.id,
      new SocketResponse({ room: room.sanitize })
    );

    return new SocketResponse({ room: room.sanitize });
  }

  randomRoom(client: Socket, data: any) {
    this.checkPlayerAvailability(client.user.roomId);
    let isRoomCreated = false;

    let room = this.service.getRandomRoom();

    if (!room) {
      // create room
      isRoomCreated = true;
      room = this.service.createRoom(true);
    }

    this.logger.debug("Random room created", room);

    const player = new TicTacToePlayer({
      id: client.id,
      username: client.user.username,
      avatar: client.user.avatar,
      isReady: false,
      isHost: false,
      symbol: isRoomCreated ? "X" : "O",
    });

    room.addPlayer(player);
    client.join(room.id);
    client.user.roomId = room.id;

    client.emit(
      GameEventsResponse.PLAYER_DATA,
      new SocketResponse({ player: player.sanitize })
    );

    this.logger.debug("Room is full", room.noOfPlayers);
    if (room.isFull) {
      returnAfterComplete(() => {
        this.logger.debug("Game started");
        room.startGame();
        // game started after 10 seconds
        this.broadcastToRoom(
          GameEventsResponse.GAME_STARTED,
          room.id,
          new SocketResponse({ room: room.sanitize })
        );
        // TODO: fix this
      }, 1_000);
    }

    if (!isRoomCreated) {
      this.logger.debug("Player join");
      this.broadcastToRoomLater(
        GameEventsResponse.PLAYER_JOINED,
        room.id,
        new SocketResponse({ room: room.sanitize })
      );
    }

    this.logger.debug("Room created or joined");
    return new SocketResponse({ room: room.sanitize });
  }

  leaveRoom(client: Socket) {
    const room = this.service.getRoom(client.user.roomId);
    if (!room) throw new RoomNotFoundException();

    client.user.roomId = null;
    client.leave(room.id);

    this.broadcastToRoomLater(
      GameEventsResponse.PLAYER_LEFTED,
      room.id,
      new SocketResponse({ room: room.sanitize })
    );

    return new SocketResponse();
  }

  startGame(client: Socket, data: { roomCode?: RoomCode }) {
    const room = this.service.getRoom(`${this.game}_${data.roomCode}`);
    if (!room) throw new RoomNotFoundException();

    room.startGame();

    this.broadcastToRoomLater(
      GameEventsRequest.START_GAME,
      room.id,
      new SocketResponse({ room: room.sanitize })
    );

    return new SocketResponse({ room: room.sanitize });
  }

  ready(client: Socket) {
    const roomId = client.user?.roomId;
    if (!roomId) throw new BadRequestException("Room id is required");

    const room = this.service.getRoom(roomId);
    if (!room) throw new RoomNotFoundException();

    room.players.forEach((player) => {
      if (player.id === client.id) {
        player.isReady = !player.isReady;
      }
    });

    const response = new SocketResponse({
      player: room.getPlayer(client.id)?.sanitize,
    });

    this.broadcastToRoomLater(
      GameEventsResponse.PLAYER_READY,
      room.id,
      response
    );

    return response;
  }

  leaveGame(client: Socket, data: any) {
    this.leaveRoom(client);
    return new SocketResponse();
  }

  makeMove(client: Socket, data: { roomCode?: RoomCode; cell: number }) {
    const { roomCode, cell } = data;
    const roomId = `${this.game}_${roomCode}` || client.user?.roomId;
    if (!roomId) throw new BadRequestException("Room id is required");

    if (!cell && typeof cell !== "number") {
      throw new BadRequestException("Cell is required and should be a number");
    }
    if (cell < 0 || cell > 8) {
      throw new BadRequestException("Cell is out of range (0-8)");
    }
    const room = this.service.getRoom(roomId);
    if (!room) throw new RoomNotFoundException();

    const player = room.getPlayer(client.id);
    if (!player) {
      throw new BadRequestException("Player not found");
    }
    // check if cell is already taken
    if (room.board[cell])
      throw new BadRequestException("Cell is already taken");

    // is game started
    switch (room.state) {
      case RoomState.ENDED:
        throw new BadRequestException("Game is ended");
      case RoomState.PLAYING:
        break;
      default:
        throw new BadRequestException("Game is not started");
    }

    // is current player turn
    if (!room.isPlayerTurn(player.id))
      throw new BadRequestException("Not your turn");

    room.board[cell] = player.symbol;
    room.nextTurn();

    if (room.checkWinning()) {
      this.broadcastToRoomLater(
        GameEventsResponse.GAME_RESULT,
        room.id,
        new SocketResponse({ result: room.result })
      );
    }

    this.broadcastToRoomLater(
      GameEventsRequest.MAKE_MOVE,
      room.id,
      new SocketResponse({ room: room.sanitize })
    );

    return new SocketResponse({ room: room.sanitize });
  }

  endGame(client: Socket, data: any) {
    return {
      room: "end_game_1",
    };
  }

  restartGame(client: Socket, data: { roomCode?: string }) {
    const roomId = data.roomCode || client.user.roomId;
    if (!roomId) throw new BadRequestException("Room id is required");

    const room = this.service.getRoom(roomId);
    if (!room) throw new RoomNotFoundException();
    room.reset();

    this.broadcastToRoomLater(
      GameEventsRequest.RESTART_GAME,
      room.id,
      new SocketResponse({ room: room.sanitize })
    );

    return new SocketResponse({ room: room.sanitize });
  }

  result(client: Socket, data: any) {
    const roomId = client.user?.roomId;
    if (!roomId) throw new BadRequestException("Room id is required");

    const room = this.service.getRoom(roomId);
    if (!room) throw new RoomNotFoundException();
    const status = room.result;

    return new SocketResponse({ status });
  }

  onDisconnect(client: Socket) {
    const roomId = client.user?.roomId;
    if (!roomId) return;
    this.leaveRoom(client);
  }
}

export default new TicTacToeGateway(ticTacToeService);
