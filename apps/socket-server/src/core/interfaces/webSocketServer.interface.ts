import { Server, Socket } from 'socket.io'

export interface IWebSocketServer {
    readonly io: Server

    subscribe(event: string, callback: (client: Socket, ...args: any[]) => void): void
    unsubscribe(event: string, callback: (client: Socket, ...args: any[]) => void): void
}
