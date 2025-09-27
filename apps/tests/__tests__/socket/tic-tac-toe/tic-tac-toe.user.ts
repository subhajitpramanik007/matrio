import { io, Socket } from "socket.io-client";

export class TicTacToeUser {
  id: string;
  accessToken?: string;
  roomCode?: string;
  numberOfRoomsJoined?: number;
  isJoined?: boolean;
  _socket: Socket | null = null;
  symbol?: string;

  constructor() {
    this.id = crypto.randomUUID();
  }

  get socket() {
    if (!this._socket) {
      throw new Error("Socket is not connected");
    }
    return this._socket;
  }

  connectSocket() {
    this._socket = io("http://localhost:8001", {
      auth: { token: this.accessToken },
      transports: ["websocket"], // ✅ force websocket for faster tests
    })
      .on("connect", () => {
        // console.log("Connected to socket" + this.socket?.id);
      })
      .on("disconnect", () => {
        // console.log("Disconnected from socket" + this.socket?.id);
      });
  }

  disconnectSocket() {
    this._socket?.disconnect();
    this._socket = null;
  }

  pingPong() {
    this.socket.emit("ping", "ping", (data: any) => {
      console.log(data);
    });
  }
}
