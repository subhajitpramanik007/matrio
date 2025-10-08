import { Socket } from "socket.io-client";
import { SocketClient } from "./base.socket";

export enum GameNameSpace {
  TIC_TAC_TOE = "tic_tac_toe",
}

export class GameSocket extends SocketClient {
  static instance: GameSocket;

  constructor(protected gameNameSpace: GameNameSpace) {
    super();
  }

  emit(event: string, data: any) {
    this.socket.emit(event, this.gameNameSpace, data);
  }
}
