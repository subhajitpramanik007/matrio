import { Logger, SocketError } from '../utils'

import { Socket } from 'socket.io'
import WebSocketServer from './WebSocketServer'
import { BaseClass } from '../lifecycle/BaseClass'

import { GameSocketService } from '../service/GameSocketService'

export class GameSocketServer extends BaseClass {
    private logger = new Logger('GameSocketServer')

    constructor(
        private readonly wss: WebSocketServer,
        private readonly service: GameSocketService,
    ) {
        super()

        this.wss.io.on('connect', this.onConnect.bind(this))
    }

    private onConnect(client: Socket) {
        client.onAny((...args) => this.service.handleEvent(client, ...args))
    }
}
