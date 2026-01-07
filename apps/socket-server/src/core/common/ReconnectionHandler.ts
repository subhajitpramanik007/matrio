import { Logger } from '@/core/utils/logger'
import { IReconnectionHandler } from '@/core/interfaces/reconnectionHandler.interface'

export class ReconnectionHandler implements IReconnectionHandler {
    private readonly _logger = new Logger('ReconnectionHandler')
    private readonly _timeouts = new Map<string, NodeJS.Timeout>()

    constructor(private readonly _gracePeriodMs: number = 30_000) {}

    handleDisconnect(playerId: string, onExpiry: () => void): void {
        this.cancelTimer(playerId)

        const timeout = setTimeout(() => {
            this._logger.warn(`Grace period expired for player: ${playerId}`)
            this.cleanup(playerId)
            onExpiry() // This is where the Room.leave() logic happens
        }, this._gracePeriodMs)

        this._timeouts.set(playerId, timeout)
        this._logger.warn(`Started ${this._gracePeriodMs}ms grace period for: ${playerId}`)
    }

    handleReconnect(playerId: string): boolean {
        if (this._timeouts.has(playerId)) {
            this.cancelTimer(playerId)
            this._logger.log(`Player ${playerId} can reconnect.`)
            return true
        }
        return false
    }

    private cancelTimer(playerId: string): void {
        const timeout = this._timeouts.get(playerId)
        if (timeout) {
            clearTimeout(timeout)
            this._timeouts.delete(playerId)
        }
    }

    private cleanup(playerId: string) {
        this.cancelTimer(playerId)
    }
}
