import { Server as HttpServer } from 'http'
import { Server as IoServer } from 'socket.io'

import { ENV } from '@/config/env'

import { EGameNamespace } from '@/core/utils'
import { AdminMonitor } from '@/core/admin/AdminMonitor'
import { AdminNamespace } from '@/core/admin/AdminNamespace'

import { RoomManager } from '@/core/room/RoomManager'
import { PlayerManager } from '@/core/player/PlayerManager'
import { IPlayerManager } from '@/core/interfaces/player.interface'

import { WebSocketServer } from '@/core/common/WebSocketServer'
import { GameSocketServer } from '@/core/gateway/GameSocketServer'
import { GameSocketService } from '@/core/service/GameSocketService'
import { GameServiceRegistry } from '@/core/service/GameServiceRegistry'

import { CheckersService } from '@/games/checkers'

export class SocketServerFactory {
    private static playerManager: PlayerManager
    private static roomManager: RoomManager

    /** Setup game services */
    static SetupGameServices(io: IoServer) {
        const registry = new GameServiceRegistry()

        const checkersService = new CheckersService(io, this.playerManager, this.roomManager)

        registry.register(EGameNamespace.CHECKERS, checkersService)

        const gameSocketService = new GameSocketService(registry)

        const gameSocketServer = new GameSocketServer(io, gameSocketService)
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
    static CreateWebSocketServer(httpServer: HttpServer, playerManager: PlayerManager) {
        const webSocketServer = new WebSocketServer(httpServer, playerManager, {
            corsOrigin: ENV.CORS_ORIGIN,
            jwtSecret: ENV.JWT_SECRET,
            authRequired: true,
        })

        return webSocketServer
    }

    /** Create store */
    static CreateStore(adminMonitor: AdminMonitor): {
        playerManager: PlayerManager
        roomManager: RoomManager
    } {
        const playerManager = new PlayerManager(adminMonitor)
        const roomManager = new RoomManager()

        this.playerManager = playerManager
        this.roomManager = roomManager

        return { playerManager, roomManager }
    }

    /** Get all players */
    static GetAllPlayers() {
        return this.playerManager.getAllPlayers().map((player) => ({
            id: player.id,
            username: player.username,
            email: player.email,
        }))
    }
}
