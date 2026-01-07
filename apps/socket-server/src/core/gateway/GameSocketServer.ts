import { Logger } from '../utils'

import { Server, Socket } from 'socket.io'
import { LifecycleBaseClass } from '../lifecycle/BaseClass'

import { GameSocketService } from '../service/GameSocketService'

export class GameSocketServer extends LifecycleBaseClass {
    private logger = new Logger('GameSocketServer')

    constructor(
        private readonly _io: Server,
        private readonly _service: GameSocketService,
    ) {
        super()

        this._io.on('connect', this.onConnect.bind(this))
    }

    private onConnect(client: Socket) {
        client.onAny((...args) => this._service.handleEvent(client, ...args))
    }
}
