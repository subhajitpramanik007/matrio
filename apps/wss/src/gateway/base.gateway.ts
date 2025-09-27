import { Socket } from "socket.io";
import WebSocketServer from "../socket";

export interface GatewayCallback {
  (client: Socket, data: any): any;
}

export class BaseGateway {
  constructor() {}

  on(event: string, callback: GatewayCallback) {
    WebSocketServer.instance.on(event, callback);
  }

  off(event: string, callback: GatewayCallback) {
    WebSocketServer.instance.off(event, callback);
  }

  broadcast(event: string, id: string[], ...args: any[]) {
    WebSocketServer.instance.io.to(id).emit(event, ...args);
  }

  broadcastToAll(event: string, ...args: any[]) {
    WebSocketServer.instance.io.emit(event, ...args);
  }

  broadcastToRoom(event: string, room: string, ...args: any[]) {
    WebSocketServer.instance.io.to(room).emit(event, ...args);
  }

  server() {
    return WebSocketServer.instance.io;
  }

  broadcastToRoomLater(event: string, room: string, ...args: any[]) {
    setImmediate(() => {
      this.broadcastToRoom(event, room, ...args);
    });
  }
}
