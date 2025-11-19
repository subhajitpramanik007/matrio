import { Socket } from 'socket.io'

export class GameBaseService {
    createRoom?(client: Socket, data: any): any
    joinRoom?(client: Socket, data: any): any
    randomRoom?(client: Socket, data: any): any
    makeMove?(client: Socket, data: any): any
    leaveRoom?(client: Socket, data: any): any
    restartGame?(client: Socket, data: any): any
    ready?(client: Socket, data: any): any
    endGame?(client: Socket, data: any): any
}
