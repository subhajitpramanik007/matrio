import EventEmitter from 'events'
import { Namespace } from 'socket.io'

import { ENV } from '@/config/env'
import { Logger } from '@/core/utils'

import { AdminEvent, AdminLoggerLevel } from './admin.type'

export class AdminMonitor extends EventEmitter {
    private _adminIo?: Namespace
    private readonly logger = new Logger('AdminMonitor')

    constructor() {
        super()

        this.watch()
    }

    init(adminIo: Namespace): AdminMonitor {
        this._adminIo = adminIo
        this.logger.debug('AdminMonitor setup completed')
        return this
    }

    emit<K extends AdminEvent>(eventName: K, ...args: any[]): boolean {
        return super.emit(eventName, ...args)
    }

    on<K extends AdminEvent>(eventName: K, listener: (...args: any[]) => void): this {
        return super.on(eventName, listener)
    }

    private watch() {
        if (ENV.NODE_ENV !== 'development') return

        this.on('players:added', this.onPlayerAdded)
        this.on('players:removed', this.onPlayerRemoved)
        this.on('players:reconnect', this.onPlayerReconnect)

        this.on('system', this.onSystem)

        this.on('rooms:created', (payload: { playerId: string; roomId: string }) => {
            this.logger.debug(`Room added to registry: ${payload.roomId}`)

            this.sendLog(`Room added: ${payload.roomId} by ${payload.playerId}`)
        })

        this.on('rooms:deleted', (roomId: string) => {
            this.logger.debug(`Room removed from registry: ${roomId}`)

            this.sendLog(`Room removed: ${roomId}`, 'warn')
        })

        this.on('rooms:join', (roomId: string, playerId: string) => {
            this.logger.debug(`Player joined room: ${roomId} by ${playerId}`)

            this.sendLog(`Player ${playerId} joined room: ${roomId}`)
        })

        this.on('rooms:leave', (roomId: string, playerId: string) => {
            this.logger.debug(`Player left room: ${roomId} by ${playerId}`)

            this.sendLog(`Player ${playerId} left room: ${roomId}`, 'warn')
        })

        this.on('rooms:makemove', (roomId: string, playerId: string, move: any) => {
            this.logger.debug(`Player made move in room: ${roomId} by ${playerId}`, move)

            this.sendLog(`Player ${playerId} made move in room: ${roomId}`)
        })
    }

    private onSystem(message: string) {
        this.logger.debug(message)

        this.sendLog(message, 'info')
    }

    private onPlayerAdded(player: any) {
        this.logger.debug(`Player added to registry: ${player.id}`, player)

        this.sendLog(`Player connected: ${player.id}`)
    }

    private onPlayerRemoved(playerId: string) {
        this.logger.debug(`Player removed from registry: ${playerId}`)

        this.sendLog(`Player disconnected: ${playerId}`, 'warn')
    }

    private onPlayerReconnect(playerId: string) {
        this.logger.debug(`Player reconnected: ${playerId}`)

        this.sendLog(`Player reconnected: ${playerId}`, 'warn')
    }

    private sendLog(message: string, level: AdminLoggerLevel = 'info') {
        this._adminIo?.emit('log', {
            message,
            level,
        })
    }
}
