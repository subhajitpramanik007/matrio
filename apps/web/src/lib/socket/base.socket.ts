import { io, Socket } from "socket.io-client";
import { useSessionStore } from "../store";

export class SocketClient {
  private _socket: Socket;
  static instance: SocketClient;

  constructor() {
    this.getAccessToken();

    this._socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL!, {
      autoConnect: false,
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    this.connect();
    this.pingPong();
  }

  private getAccessToken() {
    // watch for accessToken changes
    useSessionStore.subscribe((state) => {
      this._socket.auth = {
        token: state.accessToken,
      };
    });
  }

  static getInstance() {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance;
  }

  get socket() {
    return this._socket;
  }

  connect() {
    if (!this._socket.connected) this._socket.connect();

    this._socket.on("connect", () => {
      console.log("Socket connected");
    });

    this._socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }

  private pingPong() {
    this._socket.on("pong", (response: any) => {
      console.log("Pong response", response);
    })
    this._socket.emit("ping")
  }

  disconnect() {
    if (this._socket.connected) this._socket.disconnect();
    this._socket.removeAllListeners();
  }

  emit(event: string, data: any) {
    this._socket.emit(event, data);
  }

  emitWithAck(event: string, data: any[] | any) {
    return this._socket.emit(event, ...data, (ack: any) => {
      return ack;
    });
  }

  on(event: string, callback: (data: any) => void) {
    this._socket.on(event, callback);
  }
}

const socketClient = SocketClient.getInstance();
export { socketClient };
