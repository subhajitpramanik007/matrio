import { InitPlayerData, PlayerStats } from '@matrio/shared/types/player.type'

export interface IPlayerStats extends PlayerStats {}

export interface IBasePlayerData extends InitPlayerData {}

export interface IPlayerData extends IBasePlayerData {
    stats: IPlayerStats
    isReady: boolean
    isHost: boolean
    [key: string]: any
}

export type PlayerDTO = Omit<IPlayerData, 'socketId'>

export interface IPlayer extends IPlayerData {
    setSocketId(socketId: string): void
    onReady(): void
    onNotReady(): void
    onGameCompleted: (result: 'win' | 'draw' | 'lose') => void
    onReconnect(socketId: string): void

    readonly serialize: PlayerDTO

    reset(): void
    resetStats(): void
}

export interface IPlayerRegistry {
    /**
     * Add a player to the registry
     */
    addPlayer(player: IPlayer): void
    /**
     * Remove player by player id
     */
    removePlayer(playerId: string): void
    /**
     * Check if a player is in the registry
     */
    hasPlayer(playerId: string): boolean
    /**
     * Get player by player id
     */
    getPlayer(playerId: string): IPlayer | undefined

    /**
     * Handle player reconnection
     */
    onPlayerReconnect(playerId: string, socketId: string): void

    /**
     * Get all players in the registry
     */
    getAllPlayers(): IPlayer[]
    /**
     * Get all ready players in the registry
     */
    getReadyPlayers(): IPlayer[]
    /**
     * Get the number of players in the registry
     */
    readonly playerCount: number

    clear(): void
}

export interface IPlayerConnectionMapper {
    /**
     * Map a socket id to a player id
     */
    mapSocketId(socketId: string, playerId: string): void
    /**
     * Get player id by socket id
     */
    getPlayerIdBySocketId(socketId: string): string | undefined
    /**
     * Unmap a socket id from a player id
     */
    unmapSocketId(socketId: string): void

    /**
     * Handle player reconnection
     */
    onPlayerReconnect(playerId: string, socketId: string): void

    clear(): void
}

export interface IPlayerOccupancyTracker {
    /**
     * Track a player in a room
     */
    trackPlayer(playerId: string, roomId: string): void
    /**
     * Get room id by player id
     */
    getRoomIdByPlayerId(playerId: string): string | undefined
    /**
     * Untrack a player from a room
     */
    untrackPlayer(playerId: string): void

    /**
     * Check if a player is available
     */
    isPlayerAvailable(playerId: string): boolean
    /**
     * Check if a player is in a room
     */
    isPlayerOccupied(playerId: string): boolean

    clear(): void
}

export interface IPlayerManager {
    /**
     * The registry of players
     */
    registry: IPlayerRegistry
    /**
     * The connection mapper of players
     */
    connectionMapper: IPlayerConnectionMapper
    /**
     * The occupancy tracker of players
     */
    occupancyTracker: IPlayerOccupancyTracker

    /**
     * Handle player connection
     */
    onConnection(player: IPlayer, roomId?: string): void
    /**
     * Handle player disconnection
     */
    onDisconnection(playerId: string): void

    /**
     * Get player by socket id
     */
    getBySocketId(socketId: string): IPlayer | undefined
    /**
     * Get all players
     */
    getAllPlayers(): IPlayer[]

    readonly playerCount: number
}
