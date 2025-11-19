import { Socket } from 'socket.io'
import { Logger, SocketError, SocketErrorCode } from '../utils'

import { BaseClass } from '../lifecycle/BaseClass'
import { RoomManager } from '../room/RoomManager'
import { GameServiceRegistry } from './GameServiceRegistry'

import { GameEvent, GameEventRouter } from '../utils/gameRouter'
import { GameSocketRequestSchema, PayloadSchema } from '../validation/GameSocketRequestSchema'

export class GameSocketService extends BaseClass {
    private logger = new Logger('GameSocketService')

    constructor(
        private readonly roomManager: RoomManager,
        private readonly registry: GameServiceRegistry,
    ) {
        super()
    }

    handleEvent(client: Socket, ...args: any): any {
        // validate event
        const parsed = GameSocketRequestSchema.safeParse(args)

        if (!parsed.success) {
            this.logger.error(parsed.error.message)
            const callback = typeof args[args.length - 1] === 'function' ? args.pop() : null
            if (callback) callback(new SocketError('Validation error'))
            return
        }

        const [event, payload, callback] = parsed.data
        const result = this.validateEvent(client, event, payload)
        if (callback) callback(result)
    }

    private validateEvent(client: Socket, event: GameEvent, payload: PayloadSchema) {
        // validate event method
        const methodName = GameEventRouter[event]
        if (!methodName) {
            this.logger.warn(`Unknown event ${event}`)
            return new SocketError('Unknown event received from client', SocketErrorCode.UNKNOWN_EVENT)
        }

        // extract namespace
        const namespace = payload?.gameNamespace
        if (!namespace) {
            this.logger.warn(`Missing namespace in payload`)
            return new SocketError('Missing namespace in payload', SocketErrorCode.MISSING_NAMESPACE)
        }

        //  service registry
        const svc = this.registry.get(namespace)
        if (!svc) {
            this.logger.warn('No service found for namespace', namespace)
            return new SocketError('No service found for namespace', SocketErrorCode.NOT_FOUND)
        }

        const handler = (svc as any)[methodName]
        if (!handler) {
            this.logger.warn(`Handler not implemented: ${methodName} for ${namespace}`)
            return new SocketError(`Handler not implemented: ${methodName} for ${namespace}`, SocketErrorCode.NOT_FOUND)
        }

        try {
            return handler.call(svc, client, payload)
        } catch (error) {
            this.logger.error('Error handling event', error)
            return new SocketError('Internal server error')
        }
    }
}
