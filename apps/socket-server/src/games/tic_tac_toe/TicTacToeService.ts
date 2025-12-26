import { Socket } from 'socket.io'

import { RoomManager } from '@/core/room'
import { GameBaseService } from '@/core/service/GameBaseService'
import { EGameNamespace, Logger, SocketResponse } from '@/core/utils'

export class TicTacToeService extends GameBaseService<EGameNamespace> {
    protected readonly logger = new Logger('TicTacToeService')

    constructor(protected readonly roomManager: RoomManager) {
        super(EGameNamespace.TIC_TAC_TOE, roomManager)
    }
}
