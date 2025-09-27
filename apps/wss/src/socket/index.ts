import { Socket, Server as SocketServer } from "socket.io";
import type { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";
import { Logger } from "../common/logger";
import { GameEventsResponse, RoomId } from "../types";
import { SocketResponse } from "../common/response";

class WebSocketServer {
  private logger = new Logger("WebSocketServer");
  private static _instance: WebSocketServer;
  private _server: SocketServer;

  constructor(private readonly httpServer: HttpServer) {
    this._server = new SocketServer(httpServer, {
      cors: { origin: "*" },
      transports: ["websocket"],
      cookie: true,
    });

    this.logger.emptyLine();
    this.logger.log("WebSocketServer initialized");

    // Initialize middleware
    this.initMiddleware();
    this.initListeners();
  }

  /** Initialize WebSocketServer */
  static init(httpServer: HttpServer) {
    if (!this._instance) {
      this._instance = new WebSocketServer(httpServer);
    }
    return this._instance;
  }

  static get instance() {
    if (!this._instance) {
      throw new Error("WebSocketServer instance not initialized");
    }
    return this._instance;
  }

  /** Initialize middleware */
  private initMiddleware() {
    this._server.use((client, next) => {
      const token = this.extractTokenFromRequest(client);
      if (!token) return next(new Error("Unauthorized"));

      client.onAny((event, ...args) => {
        this.logger.verbose(`{ Client ${client.id} } [emitted] ${event}`, args);
      });

      try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
        client.user = decoded;
      } catch (error) {
        return next(new Error("Unauthorized"));
      }

      next();
    });
  }

  /** Extract token from request */
  private extractTokenFromRequest(client: Socket) {
    const token =
      client.handshake.auth.token ||
      client.request.headers.authorization?.split(" ")[1] ||
      client.request.headers.cookie
        ?.split(";")
        ?.find((cookie) => cookie.startsWith("__matrio.atk="))
        ?.split("=")[1];
    return token;
  }

  /** Initialize listeners */
  private initListeners() {
    this._server.on("connection", (client) => {
      this.logger.log(`Client connected: ${client.id}`);

      client.on("ping", (data) => {
        this.logger.log(`[User]`, client.user);
        client.emit("pong", "pong");
      });

      client.on("disconnect", () => {
        this.logger.log(`Client disconnected: ${client.id}`);
      });
    });
  }

  /** Subscribe to client events */
  on(event: string, callback: (client: Socket, ...args: any[]) => void) {
    this._server.on("connection", (client) => {
      client.on(event, async (...args) => {
        const ack =
          typeof args[args.length - 1] === "function" ? args.pop() : null;
        try {
          const result = await callback(client, ...args);
          if (ack) ack(result);
        } catch (error: any) {
          this.logger.error(error);
          if (ack)
            ack({
              error: error.message || "Internal server error",
              success: false,
            });
        }
      });
    });
  }

  /** Unsubscribe from client events */
  off(event: string, callback: (client: Socket, ...args: any[]) => void) {
    this._server.on("connection", (client) => {
      client.off(event, callback);
    });
  }

  /** Access raw socket.io server */
  get io() {
    return this._server;
  }

  /** Clean room data */
  cleanRoomData(roomId: RoomId) {
    this._server
      .to(roomId)
      .emit(GameEventsResponse.ROOM_DELETED, new SocketResponse());

    this._server.sockets.sockets.forEach((socket) => {
      socket.leave(roomId);
      socket.user.roomId = null;
    });
  }
}

export default WebSocketServer;
