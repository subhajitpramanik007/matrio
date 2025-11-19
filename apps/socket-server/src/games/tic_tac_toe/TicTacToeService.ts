import { Socket } from 'socket.io'

import { Logger, SocketResponse } from '../../core/utils'
import { RoomManager } from '../../core/room/RoomManager'
import { BaseClass } from '../../core/lifecycle/BaseClass'
import { GameBaseService } from '../../core/service/GameBaseService'

export class TicTacToeService extends BaseClass implements GameBaseService {
    private logger = new Logger('TicTacToeService')

    constructor(private readonly roomManager: RoomManager) {
        super()
    }

    createRoom(client: Socket, data: any) {
        return new SocketResponse({ room: { id: '1234' } }, 'Room created')
    }
    joinRoom(client: Socket, data: any) {}
    randomRoom(client: Socket, data: any) {}
    makeMove(client: Socket, data: any) {}
    leaveRoom(client: Socket, data: any) {}
    restartGame(client: Socket, data: any) {}
    ready(client: Socket, data: any) {}
    endGame(client: Socket, data: any) {}
}
