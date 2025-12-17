import { Socket } from 'socket.io'

import { RoomManager } from '@/core/room'
import { GameBaseService } from '@/core/service/GameBaseService'
import { EGameNamespace, Logger, SocketResponse } from '@/core/utils'

export class TicTacToeService extends GameBaseService<EGameNamespace> {
    private logger = new Logger('TicTacToeService')

    constructor(protected readonly roomManager: RoomManager) {
        super(EGameNamespace.TIC_TAC_TOE, roomManager)
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
