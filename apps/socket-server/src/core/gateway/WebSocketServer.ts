import jwt from 'jsonwebtoken'
import type { Server as HttpServer } from 'http'
import { Socket, Server as SocketServer } from 'socket.io'

import { Logger } from '../utils'
import { ENV } from '../../config/env'

class WebSocketServer {
    private logger = new Logger('WebSocketServer')
    private static instance: WebSocketServer
    private _server: SocketServer

    private constructor(private readonly httpServer: HttpServer) {
        this._server = new SocketServer(httpServer, {
            cors: { origin: ENV.CORS_ORIGIN },
            transports: ['websocket'],
            cookie: true,
        })

        // Initialize middleware
        this.initMiddleware()
        this.initListeners()
        this.logEventRequest(false)
    }
    /** Initialize WebSocketServer */
    static init(httpServer: HttpServer): WebSocketServer {
        if (!this.instance) {
            this.instance = new WebSocketServer(httpServer)
        }
        return this.instance
    }

    /** Initialize middleware */
    private initMiddleware(withAuth = true) {
        this._server.use((client, next) => {
            this.logger.verbose(`Client try to connect: ${client.id}`)
            if (!withAuth) {
                next()
                return
            }
            const token = this.extractTokenFromRequest(client)
            if (!token) return next(new Error('Unauthorized'))

            try {
                const decoded = jwt.verify(token, ENV.JWT_SECRET!)
                client.user = decoded
            } catch (error) {
                return next(new Error('Unauthorized'))
            }

            next()
        })
    }

    /** Extract token from request */
    private extractTokenFromRequest(client: Socket) {
        const token =
            client.handshake.auth.token ||
            client.request.headers.authorization?.split(' ')[1] ||
            client.request.headers.cookie
                ?.split(';')
                ?.find((cookie) => cookie.startsWith('__matrio.atk='))
                ?.split('=')[1]
        return token
    }

    /** Initialize listeners */
    private initListeners() {
        this._server.on('connection', (client) => {
            this.logger.log(`Client connected: ${client.id}`)

            client.on('disconnect', () => {
                this.logger.log(`Client disconnected: ${client.id}`)
            })
        })

        this.on('ping', (client, ...args) => {
            this.logger.verbose(`{ Client ${client.id} } [emitted] ping`, args)
            const ack = typeof args[args.length - 1] === 'function' ? args.pop() : null
            if (ack) ack('pong')
            else client.emit('pong', 'pong')
        })
    }

    /** Subscribe to client events */
    protected on(event: string, callback: (client: Socket, ...args: any[]) => void) {
        this._server.on('connection', (client) => {
            client.on(event, async (...args) => {
                const ack = typeof args[args.length - 1] === 'function' ? args.pop() : null
                try {
                    const result = await callback(client, ...args)
                    if (ack) ack(result)
                } catch (error: any) {
                    this.logger.error(error)
                    if (ack)
                        ack({
                            error: error.message || 'Internal server error',
                            success: false,
                        })
                }
            })
        })
    }

    /**
     * log client events
     */
    private logEventRequest(isDebug = true) {
        if (!isDebug) return

        this._server.on('connection', (client) => {
            client.onAny((event, ...args) => {
                this.logger.verbose(`[EVENT EMITTED || {${event}} || {${client.id}} ]`, ...args)
            })
        })
    }

    /** Unsubscribe from client events */
    protected off(event: string, callback: (client: Socket, ...args: any[]) => void) {
        this._server.on('connection', (client) => {
            client.off(event, callback)
        })
    }

    /**
     * Easy use -> subscribe to event
     * @param event
     * @param callback
     */
    subscribe(event: string, callback: (client: Socket, ...args: any[]) => void) {
        this.on(event, callback)
    }

    /**
     * Easy use -> unsubscribe from event
     * @param event
     * @param callback
     */
    unsubscribe(event: string, callback: (client: Socket, ...args: any[]) => void) {
        this.off(event, callback)
    }

    /** Access raw socket.io server */
    get io() {
        return this._server
    }
}

export default WebSocketServer
