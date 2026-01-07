import { Namespace, Server, Socket } from 'socket.io'

import { Logger } from '@/core/utils'
import { LifecycleBaseClass } from '@/core/lifecycle/BaseClass'

export class AdminNamespace extends LifecycleBaseClass {
    private readonly logger = new Logger('AdminNamespace')
    private _adminNamespace!: Namespace

    constructor() {
        super()
    }

    get adminIo(): Namespace {
        return this._adminNamespace
    }

    init(ioServer: Server) {
        this.logger.debug('AdminNamespace setup started')
        this._adminNamespace = ioServer.of('/admin')

        this.start()
    }

    start() {
        this._adminNamespace.on('connect', this.onConnection.bind(this))
        this._adminNamespace.on('disconnect', this.onDisconnection.bind(this))

        this._adminNamespace.use(this.namespaceMiddleware.bind(this))
    }

    private namespaceMiddleware(socket: Socket, next: Function) {
        socket.onAnyOutgoing((event) => this.logger.debug(`Admin event sent: ${event}`))
        next()
    }

    private onConnection(socket: Socket) {
        this.logger.debug(`Admin connected: ${socket.id}`)

        socket.onAny((event) => this.logger.debug(`Admin event received: ${event}`))

        socket.on('disconnect', this.onDisconnection.bind(this))
    }

    private onDisconnection(reason: string) {
        this.logger.debug(`Admin disconnected: ${reason}`)
    }
}
