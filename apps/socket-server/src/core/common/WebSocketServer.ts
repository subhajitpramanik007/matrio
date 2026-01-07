import { Server as HttpServer } from 'http'
import { DefaultEventsMap, Server as SocketIoServer, Socket, ServerOptions } from 'socket.io'

import { Logger } from '@/core/utils'

import { BasePlayer } from '@/core/player'
import { UserAuthHandler } from '@/core/common/UserAuthHandler'
import { IPlayerManager } from '@/core/interfaces/player.interface'
import { IWebSocketServer } from '@/core/interfaces/webSocketServer.interface'

interface WebSocketServerOptions extends ServerOptions {
    corsOrigin?: string
    namespace?: string
    jwtSecret?: string
    authRequired?: boolean
}

export class WebSocketServer implements IWebSocketServer {
    protected readonly logger = new Logger(this.constructor.name)
    protected readonly _io: SocketIoServer

    constructor(
        protected readonly _httpServer: HttpServer,
        protected readonly _playerManager: IPlayerManager,
        protected readonly _options?: Partial<WebSocketServerOptions>,
    ) {
        this._io = WebSocketServer.CreateSocketServer(_httpServer, _options)

        if (_options?.authRequired) this.middleware()

        this.listeners()
    }

    static CreateSocketServer(httpServer: HttpServer, options?: Partial<WebSocketServerOptions>): SocketIoServer {
        return new SocketIoServer(httpServer, {
            cors: { origin: options?.corsOrigin },
            cookie: true,
            transports: ['websocket'],
            ...options,
        })
    }

    get io(): SocketIoServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> {
        return this._io
    }

    subscribe(event: string, callback: (client: Socket, ...args: any[]) => void): void {
        this._io.on('connection', (client) => client.on(event, callback))
    }

    unsubscribe(event: string, callback: (client: Socket, ...args: any[]) => void): void {
        this._io.on('connection', (client) => client.off(event, callback))
    }

    private middleware() {
        this._io.use((socket, next) => {
            this.logger.verbose(`Client try to authenticate: ${socket.id}`)

            const token = UserAuthHandler.extractTokenFromRequest(socket)
            if (!token) return next(new Error('Authentication error'))

            const user = UserAuthHandler.verifyToken(token, this._options?.jwtSecret)
            if (!user) return next(new Error('Authentication error'))

            socket.user = user
            next()
        })
    }

    private listeners() {
        this._io.on('connection', (socket) => {
            this.logger.verbose(`Client connected: ${socket.id}`)

            const player = new BasePlayer({
                id: socket.user.id,
                socketId: socket.id,
                username: socket.user.username,
                avatar: socket.user.avatar,
            })

            this._playerManager.onConnection(player)

            socket.on('disconnect', () => {
                this.logger.log(`Client disconnected: ${socket.id}`)
                this._playerManager.onDisconnection(player.id)
            })

            socket.on('error', (error) => {
                this.logger.error(`Client error: ${socket.id}`, error)
            })
        })
    }
}
