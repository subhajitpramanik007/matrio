import { IPlayerOccupancyTracker } from '@/core/interfaces/player.interface'

export class PlayerOccupancyTracker implements IPlayerOccupancyTracker {
    /**
     * playerId -> roomId
     */
    private readonly _playerIdToRoomIdMap: Map<string, string> = new Map()

    /**
     * Tracks the player's occupancy in a room
     *
     * @param playerId
     * @param roomId
     */
    trackPlayer(playerId: string, roomId: string): void {
        this._playerIdToRoomIdMap.set(playerId, roomId)
    }

    /**
     * Gets the room id of the player
     *
     * @param playerId
     * @returns
     */
    getRoomIdByPlayerId(playerId: string): string | undefined {
        return this._playerIdToRoomIdMap.get(playerId)
    }

    /**
     * Untrack the player's occupancy in a room
     *
     * @param playerId
     */
    untrackPlayer(playerId: string): void {
        this._playerIdToRoomIdMap.delete(playerId)
    }

    /**
     * Check if a player is available
     */
    isPlayerAvailable(playerId: string): boolean {
        return !this._playerIdToRoomIdMap.has(playerId)
    }

    /**
     * Check if a player is in a room
     */
    isPlayerOccupied(playerId: string): boolean {
        return this._playerIdToRoomIdMap.has(playerId)
    }

    /**
     * Clear the player's occupancy in a room
     */
    clear(): void {
        this._playerIdToRoomIdMap.clear()
    }
}
