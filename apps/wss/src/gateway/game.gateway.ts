import { Socket } from "socket.io";
import WebSocketServer from "../socket";
import { BaseGateway, GatewayCallback } from "./base.gateway";
import { GameType, GameEventsRequest } from "../types/game.type";
import { Logger } from "../common/logger";

abstract class GameGateway extends BaseGateway {
  protected logger = new Logger("GameGateway");
  constructor(protected game: GameType) {
    super();

    this.subscribe(game)(GameEventsRequest.CREATE_ROOM, this.createRoom);
    this.subscribe(game)(GameEventsRequest.JOIN_ROOM, this.joinRoom);
    this.subscribe(game)(GameEventsRequest.RANDOM_ROOM, this.randomRoom);
    this.subscribe(game)(GameEventsRequest.LEAVE_ROOM, this.leaveRoom);
    this.subscribe(game)(GameEventsRequest.START_GAME, this.startGame);
    this.subscribe(game)(GameEventsRequest.READY, this.ready);
    this.subscribe(game)(GameEventsRequest.MAKE_MOVE, this.makeMove);
    this.subscribe(game)(GameEventsRequest.END_GAME, this.endGame);
    this.subscribe(game)(GameEventsRequest.RESTART_GAME, this.restartGame);
    this.subscribe(game)(GameEventsRequest.RESULT, this.result);

    // cleanup
    this.on("disconnect", this.onDisconnect);

    this.logger.log(`GameGateway initialized for ${game}`);
  }

  subscribe =
    (gameType: string) => (event: string, callback: GatewayCallback) => {
      WebSocketServer.instance.on(event, async (client, type, data) => {
        if (type !== gameType) {
          return { error: "Invalid game type" };
        }

        // before middleware hook
        await this.before(client, event, data);

        const result = await Promise.resolve(callback.call(this, client, data));

        // after middleware hook
        await this.after(client, event, data, result);

        return result;
      });
    };

  // middleware hooks for subclasses to override if needed
  protected async before(
    client: Socket,
    event: string,
    data: any
  ): Promise<void> {
    // this.logger.debug(`Event: ${event} | Data:`, data);
  }

  protected async after(
    client: Socket,
    event: string,
    data: any,
    result: any
  ): Promise<void> {
    this.logger.debug(result);
  }

  /**
   * Create Private Room
   * @param client - Socket instance
   * @param data - { cost: number }
   */
  abstract createRoom(client: Socket, data: any): any;

  /**
   * Join Private Room
   * @param client - Socket instance
   * @param data - { roomCode: string }
   */
  abstract joinRoom(client: Socket, data: any): any;

  /**
   * Join or Create Random Room
   * @param client - Socket instance
   * @param data  - { cost: number }
   */
  abstract randomRoom(client: Socket, data: any): any;

  /**
   * Leave Room - Its for cleanup room
   * @param client - Socket instance
   * @param data - { roomCode: string }
   */
  abstract leaveRoom(client: Socket, data: any): any;

  /**
   * Start Game
   * @param client
   * @param data
   */
  abstract startGame(client: Socket, data: any): any;

  /**
   * Start Game
   * @param client
   * @param data
   */
  abstract ready(client: Socket, data: any): any;

  /**
   * Make Move
   * @param client
   * @param data
   */
  abstract makeMove(client: Socket, data: any): any;

  /**
   * End Game
   * @param client
   * @param data
   */
  abstract endGame(client: Socket, data: any): any;

  /**
   * Restart Game
   * @param client
   * @param data
   */
  abstract restartGame(client: Socket, data: any): any;

  abstract result(client: Socket, data: any): any;

  /**
   * Disconnect - When client disconnect
   * @param client
   */
  abstract onDisconnect(client: Socket): any;
}

export default GameGateway;
