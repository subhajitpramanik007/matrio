import { Logger } from '@/core/utils'
import { IPlayerConnectionMapper } from '@/core/interfaces/player.interface'

export class PlayerConnectionMapper implements IPlayerConnectionMapper {
    private readonly logger = new Logger('PlayerConnectionMapper')

    private readonly _socketIdToPlayerIdMap: Map<string, string> = new Map()
    private readonly _playerIdToSocketIdMap: Map<string, string> = new Map()

    mapSocketId(socketId: string, playerId: string): void {
        // Clean up existing mappings
        const oldSocket = this._playerIdToSocketIdMap.get(playerId)
        if (oldSocket) {
            this.logger.warn(`Removing old socket mapping for player ${playerId}: ${oldSocket}`)
            this._socketIdToPlayerIdMap.delete(oldSocket)
        }

        this.logger.verbose(`Mapping player ${playerId} to socket ${socketId}`)
        this._socketIdToPlayerIdMap.set(socketId, playerId)
        this._playerIdToSocketIdMap.set(playerId, socketId)
    }

    getPlayerIdBySocketId(socketId: string): string | undefined {
        return this._socketIdToPlayerIdMap.get(socketId)
    }

    unmapSocketId(socketId: string): void {
        const playerId = this._socketIdToPlayerIdMap.get(socketId)
        if (playerId) this._playerIdToSocketIdMap.delete(playerId)
        this._socketIdToPlayerIdMap.delete(socketId)
    }

    onPlayerReconnect(playerId: string, socketId: string): void {
        this.unmapSocketId(socketId)
        this.mapSocketId(socketId, playerId)
    }

    clear(): void {
        this._socketIdToPlayerIdMap.clear()
        this._playerIdToSocketIdMap.clear()
    }
}
