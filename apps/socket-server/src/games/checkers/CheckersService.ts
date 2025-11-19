import { Socket } from 'socket.io'

import { Logger } from '../../core/utils'
import { RoomManager } from '../../core/room/RoomManager'
import { BaseClass } from '../../core/lifecycle/BaseClass'

export class CheckersService extends BaseClass {
    private logger = new Logger('CheckersService')

    constructor(private readonly roomManager: RoomManager) {
        super()
    }

    createRoom(client: Socket, data: any) {}
    joinRoom(client: Socket, data: any) {}
    randomRoom(client: Socket, data: any) {}
    makeMove(client: Socket, data: any) {}
    leaveRoom(client: Socket, data: any) {}
    restartGame(client: Socket, data: any) {}
    ready(client: Socket, data: any) {}
    endGame(client: Socket, data: any) {}
}
