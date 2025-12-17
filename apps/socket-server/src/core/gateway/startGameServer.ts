import { EGameNamespace } from '@/core/utils'
import { RoomManager } from '@/core/room/RoomManager'
import { GameSocketService } from '@/core/service/GameSocketService'
import { GameServiceRegistry } from '@/core/service/GameServiceRegistry'

import { CheckersService } from '@checkers/CheckersService'
import { TicTacToeService } from '@tic-tac-toe/TicTacToeService'

import WebSocketServer from './WebSocketServer'
import { GameSocketServer } from './GameSocketServer'

export function startGameServer(wss: WebSocketServer): GameSocketServer {
    // room manager
    const roomManager = new RoomManager()

    // game services
    const ticTacToeService = new TicTacToeService(roomManager)
    const checkersService = new CheckersService(wss.io, roomManager)

    // service registry
    const serviceRegistry = new GameServiceRegistry()

    // register services to registry
    serviceRegistry.register(EGameNamespace.TIC_TAC_TOE, ticTacToeService)
    serviceRegistry.register(EGameNamespace.CHECKERS, checkersService)

    // game socket service
    const gameSocketService = new GameSocketService(roomManager, serviceRegistry)

    // start game server
    const gameSocketServer = new GameSocketServer(wss, gameSocketService)
    return gameSocketServer
}
