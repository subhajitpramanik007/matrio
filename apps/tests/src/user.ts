import crypto from "crypto";
import { io, Socket } from "socket.io-client";

export class User {
  _id: string;
  username: string;
  email: string;
  password: string;
  roomCode?: string;
  numberOfRoomsJoined: number = 0;
  isJoined: boolean = false;

  accessToken: string | null = null;
  socket: Socket | null = null;

  constructor() {
    this._id = crypto.randomUUID();
    this.username = "user_" + this._id.slice(0, 5);
    this.email = this.username + "@gmail.com";
    this.password = `pass_${this._id.slice(0, 5)}`;
  }

  setRoomCode(roomCode?: string) {
    this.roomCode = roomCode;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  connectSocket() {
    this.socket = io("http://localhost:8001", {
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

  pingPong() {
    this.socket?.emit("ping", "ping", (data: any) => {
      console.log(data);
    });
  }
}
