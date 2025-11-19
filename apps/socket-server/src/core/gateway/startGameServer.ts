import WebSocketServer from './WebSocketServer'

import { RoomManager } from '../room/RoomManager'
import { GameServiceRegistry } from '../service/GameServiceRegistry'

import { CheckersService } from '../../games/checkers/CheckersService'
import { TicTacToeService } from '../../games/tic_tac_toe/TicTacToeService'
import { GameSocketService } from '../service/GameSocketService'
import { GameSocketServer } from './GameSocketServer'

export function startGameServer(wss: WebSocketServer) {
    // room manager
    const roomManager = new RoomManager()

    // game services
    const ticTacToeService = new TicTacToeService(roomManager)
    const checkersService = new CheckersService(roomManager)

    // service registry
    const serviceRegistry = new GameServiceRegistry()

    // register services to registry
    serviceRegistry.register('tic_tac_toe', ticTacToeService)
    serviceRegistry.register('checkers', checkersService)

    // game socket service
    const gameSocketService = new GameSocketService(roomManager, serviceRegistry)

    // start game server
    new GameSocketServer(wss, gameSocketService)
}
