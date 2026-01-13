import { Server as HttpServer } from 'http'
import { Server as IoServer } from 'socket.io'

import { ENV } from '@/config/env'

import { EGameNamespace } from '@/core/utils'
import { AdminMonitor } from '@/core/admin/AdminMonitor'
import { AdminNamespace } from '@/core/admin/AdminNamespace'

import { PlayerManager } from '@/core/player/PlayerManager'
import { IPlayerManager } from '@/core/interfaces/player.interface'

import { WebSocketServer } from '@/core/common/WebSocketServer'
import { GameSocketServer } from '@/core/gateway/GameSocketServer'
import { GameSocketService } from '@/core/service/GameSocketService'
import { GameServiceRegistry } from '@/core/service/GameServiceRegistry'

import { TicTacToeFactory } from '@/games/tic_tac_toe/TicTacToeFactory'

import { IRoomManagerFactory } from '../interfaces/room.interface'
import { RoomManagerFactory } from '../room/manager/RoomManagerFactory'
import { ServerTaskManger } from '../scheduler'

export class SocketServerFactory {
    private static _io: IoServer
    private static playerManager: IPlayerManager
    private static roomManagerFactory: IRoomManagerFactory
    private static serverTaskManager: ServerTaskManger

    /** Setup game services */
    static SetupGameServices() {
        const registry = new GameServiceRegistry()

        // Tic Tac Toe Service
        TicTacToeFactory.init(this.playerManager, this.roomManagerFactory)
        registry.register(EGameNamespace.TIC_TAC_TOE, TicTacToeFactory.createService(this.serverTaskManager))

        const gameSocketService = new GameSocketService(registry)

        const gameSocketServer = new GameSocketServer(this._io, gameSocketService)
        return gameSocketServer
    }

    /** Create admin namespace */
    static CreateAdminNamespace(): {
        namespace: AdminNamespace
        monitor: AdminMonitor
    } {
        const adminNamespace = new AdminNamespace()
        const adminMonitor = new AdminMonitor()

        return { namespace: adminNamespace, monitor: adminMonitor }
    }

    /** Create web socket server */
    static CreateWebSocketServer(httpServer: HttpServer) {
        const webSocketServer = new WebSocketServer(httpServer, this.playerManager, {
            corsOrigin: ENV.CORS_ORIGIN,
            jwtSecret: ENV.JWT_SECRET,
            authRequired: true,
        })

        this._io = webSocketServer.io
        return webSocketServer
    }

    /** Create store */
    static CreateStore(adminMonitor: AdminMonitor) {
        this.playerManager = new PlayerManager(adminMonitor)
        this.roomManagerFactory = new RoomManagerFactory(this.playerManager, adminMonitor)

        return { playerManager: this.playerManager, roomManagerFactory: this.roomManagerFactory }
    }

    /** Get all players */
    static GetAllPlayers() {
        return this.playerManager.getAllPlayers().map((player) => ({
            id: player.id,
            username: player.username,
            email: player.email,
        }))
    }

    // Initialize server
    static Init(io: IoServer) {
        this.serverTaskManager = new ServerTaskManger(io)
    }
}
