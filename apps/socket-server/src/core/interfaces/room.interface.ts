import { RoomState } from '@/core/room'
import { GameNamespace, Timestamp } from '@/core/utils'
import { IPlayer, PlayerDTO } from './player.interface'
import { ITimestamp } from './timestamp.interface'

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

export interface IRoomData<TPlayer, TMetadata = Record<string, any>> {
    readonly id: RoomId
    readonly roomCode: RoomCode
    readonly namespace: GameNamespace
    readonly options: IRoomOptions
    readonly timestamp: ITimestamp

    state: RoomState
    metadata: TMetadata
    players: PlayerDTO[]
}

export type IRoomCreationData<TPlayer, TMetadata = Record<string, any>> = Pick<
    IRoomData<TPlayer, TMetadata>,
    'options' | 'namespace' | 'metadata' | 'players'
>

// Specialized manager for Players
export interface IRoomPlayerManager<TPlayer extends IPlayer = IPlayer> {
    /**
     * Add a player to the room
     */
    add(player: TPlayer): void
    /**
     * Get a player from the room
     */
    get(playerId: string): TPlayer | null
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
    get all(): PlayerDTO[]
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
     * Touch the state manager
     */
    touch(): void
    /**
     * The timestamp of the last update of the state
     */
    readonly updatedAt: number
    /**
     * The timestamp of the last update of the state
     */
    readonly timestamp: ITimestamp
    /**
     * Reset the state manager
     */
    reset(): void
}

// Specialized manager for Configuration
export interface IRoomSettingsManager extends IRoomOptions {
    /**
     * Update the options of the room
     */
    updateOptions(patch: Partial<IRoomSettingsManager>): void

    toJSON(): IRoomOptions
    /**
     * Reset the settings manager
     */
    reset(): void
}

export interface IGameRoom<TPlayer, TMetadata = Record<string, any>> {
    /**
     * The id of the room
     */
    readonly id: RoomId
    /**
     * The code of the room
     */
    readonly roomCode: RoomCode
    /**
     * The namespace of the room
     */
    readonly namespace: GameNamespace
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
    readonly settings: IRoomSettingsManager
    /**
     * The metadata of the room
     */
    readonly meta: TMetadata

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
    toJSON(): IRoomData<TPlayer>
}

export interface IRoomGameEngine<
    TPlayer,
    TMetadata = Record<string, any>,
    TRoomOptions extends IRoomOptions = IRoomOptions,
> {
    /**
     * Reset the game engine
     */
    reset(): void
}

// ROOM MANAGER
export interface ISingleRoomManager<TGameRoom extends IGameRoom<any, any>> {
    /**
     * Add a room to the manager
     */
    addRoom(playerId: string, roomId: RoomId, room: TGameRoom): void
    /**
     * Get a room from the manager
     */
    getRoom(roomId: RoomId): TGameRoom | undefined
    /**
     * Remove a room from the manager
     */
    removeRoom(roomId: RoomId): void
    /**
     * Check if a room is in the manager
     */
    has(roomId: RoomId): boolean
    /**
     * Clear all rooms from the manager
     */
    clear(): void

    /**
     * Get all rooms in the manager
     */
    get all(): TGameRoom[]
    /**
     * Get the number of rooms in the manager
     */
    readonly count: number
}

export interface IRoomManagerFactory {
    /**
     * Create a single room manager
     */
    createSingleRoomManager<TGameRoom extends IGameRoom<any, any>>(
        namespace: GameNamespace,
    ): ISingleRoomManager<TGameRoom>

    /**
     * Get a single room manager
     */
    getRoomManager<TGameRoom extends IGameRoom<any, any>>(
        namespace: GameNamespace,
    ): ISingleRoomManager<TGameRoom> | null

    /**
     * Get a single room manager by player id
     */
    getRoomManagerByPlayerId<TGameRoom extends IGameRoom<any, any>>(
        playerId: string,
    ): ISingleRoomManager<TGameRoom> | null

    /**
     * Get a single room manager by room id
     */
    getRoomManagerByRoomId<TGameRoom extends IGameRoom<any, any>>(roomId: RoomId): ISingleRoomManager<TGameRoom> | null

    /**
     * Register a room location
     */
    registerRoomLocation(roomId: RoomId, namespace: GameNamespace): void

    /**
     * Remove a room location
     */
    removeRoomLocation(roomId: RoomId): void

    /**
     * Get the total number of rooms
     */
    readonly totalRooms: number

    /**
     * Reset the room manager factory
     */
    reset(): void
}
