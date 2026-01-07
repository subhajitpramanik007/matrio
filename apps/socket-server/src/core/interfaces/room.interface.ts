import { RoomState } from '@/core/room'
import { GameNamespace, Timestamp } from '@/core/utils'

export type RoomCode = string
export type RoomId = `${GameNamespace}_${RoomCode}`

export enum RoomType {
    PUBLIC = 'public',
    PRIVATE = 'private',
}

export enum GameMode {
    MULTIPLAYER = 'multiplayer',
    VS_AI = 'you-vs-ai',
}

export interface IRoomOptions {
    readonly roomType: RoomType
    readonly gameMode: GameMode
    readonly maxPlayers: number
    readonly bettingCoins: number
    readonly gameDuration?: number
    readonly maxTimePerTurn?: number
    readonly maxNoOfMissedTurns?: number
}

export interface IRoomData<TPlayer, TMetadata = Record<string, any>, TRoomOptions extends IRoomOptions = IRoomOptions> {
    readonly id: RoomId
    readonly roomCode: RoomCode
    readonly namespace: GameNamespace
    readonly options: TRoomOptions
    readonly createdAt: Timestamp

    state: RoomState
    metadata: TMetadata
    players: TPlayer[]
}

export type IRoomCreationData<
    TPlayer,
    TMetadata = Record<string, any>,
    TRoomOptions extends IRoomOptions = IRoomOptions,
> = Omit<IRoomData<TPlayer, TMetadata, TRoomOptions>, 'createdAt'>

// Specialized manager for Players
export interface IRoomPlayerManager<TPlayer> {
    /**
     * Add a player to the room
     */
    add(player: TPlayer): void
    /**
     * Remove a player from the room
     */
    remove(playerId: string): void
    /**
     * Check if a player is in the room
     */
    has(playerId: string): boolean
    /**
     * Clear all players from the room
     */
    clear(): void

    /**
     * Get all players in the room
     */
    get all(): TPlayer[]
    /**
     * Get the number of players in the room
     */
    readonly count: number
}

// Specialized manager for Room State & Timing
export interface IRoomStateManager {
    /**
     * The current state of the room
     */
    current: RoomState
    /**
     * Set the state of the room
     */
    set(state: RoomState): void
    /**
     * The timestamp of the last update of the state
     */
    readonly updatedAt: number
    /**
     * Reset the state manager
     */
    reset(): void
}

// Specialized manager for Configuration
export interface IRoomSettingsManager<TMetadata, TRoomOptions extends IRoomOptions = IRoomOptions> {
    /**
     * The current options of the room
     */
    readonly options: TRoomOptions
    /**
     * The metadata of the room
     */
    metadata: TMetadata
    /**
     * Update the options of the room
     */
    updateOptions(patch: Partial<TRoomOptions>): void
    /**
     * Update the metadata of the room
     */
    updateMetadata(patch: Partial<TMetadata>): void
    /**
     * Reset the settings manager
     */
    reset(): void
}

export interface IGameRoom<TPlayer, TMetadata, TRoomOptions extends IRoomOptions> {
    /**
     * The id of the room
     */
    readonly id: RoomId
    /**
     * The players in the room
     */
    readonly players: IRoomPlayerManager<TPlayer>
    /**
     * The state manager of the room
     */
    readonly state: IRoomStateManager
    /**
     * The settings manager of the room
     */
    readonly settings: IRoomSettingsManager<TMetadata, TRoomOptions>

    /**
     * Add a player to the room
     */
    addPlayer(player: TPlayer): void
    /**
     * Remove a player from the room
     */
    removePlayer(playerId: string): void

    /**
     * Reset the room
     */
    reset(): void

    /**
     * Convert the room to a JSON object
     */
    toJSON(): IRoomData<TPlayer, TMetadata>
}

export interface IRoomGameEngine<TPlayer, TMetadata, TRoomOptions extends IRoomOptions> {
    /**
     * Reset the game engine
     */
    reset(): void
}

// ROOM MANAGER
export interface ISingleRoomManager<TPlayer, TMetadata, TRoomOptions extends IRoomOptions> {
    /**
     * Add a room to the manager
     */
    add(playerId: string, room: IGameRoom<TPlayer, TMetadata, TRoomOptions>): void
    /**
     * Remove a room from the manager
     */
    remove(playerId: string): void
    /**
     * Check if a room is in the manager
     */
    has(playerId: string): boolean
    /**
     * Clear all rooms from the manager
     */
    clear(): void

    /**
     * Get all rooms in the manager
     */
    get all(): IGameRoom<TPlayer, TMetadata, TRoomOptions>[]
    /**
     * Get the number of rooms in the manager
     */
    readonly count: number
}

export interface IRoomManagerFactory {
    /**
     * Create a single room manager
     */
    createSingleRoomManager<TPlayer, TMetadata, TRoomOptions extends IRoomOptions>(
        namespace: GameNamespace,
    ): ISingleRoomManager<TPlayer, TMetadata, TRoomOptions>

    /**
     * Get a single room manager
     */
    getRoomManager<TPlayer, TMetadata, TRoomOptions extends IRoomOptions>(
        namespace: GameNamespace,
    ): ISingleRoomManager<TPlayer, TMetadata, TRoomOptions> | null

    /**
     * Get a single room manager by player id
     */
    getRoomManagerByPlayerId<TPlayer, TMetadata, TRoomOptions extends IRoomOptions>(
        playerId: string,
    ): ISingleRoomManager<TPlayer, TMetadata, TRoomOptions> | null

    /**
     * Get a single room manager by room id
     */
    getRoomManagerByRoomId<TPlayer, TMetadata, TRoomOptions extends IRoomOptions>(
        roomId: RoomId,
    ): ISingleRoomManager<TPlayer, TMetadata, TRoomOptions> | null

    /**
     * Get the total number of rooms
     */
    readonly totalRooms: number

    /**
     * Reset the room manager factory
     */
    reset(): void
}
