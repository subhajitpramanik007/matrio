import { PlayerID } from '../player'
import { GameNamespace, Timestamp } from '../utils'
import { RoomState } from './roomState'

export type RoomCode = string
export type RoomId<
    TGameNamespace extends GameNamespace = GameNamespace,
    TRoomCode extends RoomCode = RoomCode,
> = `${TGameNamespace}:${TRoomCode}`

export type RoomOptions = {
    readonly roomType: 'public' | 'private'
    readonly gameType: 'multiplayer' | 'you-vs-ai'
    readonly maxPlayers: number
    readonly bettingCoins: number
    readonly gameDuration?: number
    readonly maxTimePerTurn?: number
    readonly maxNoOfMissedTurns?: number
    [key: string]: any
}

export type CommonRoomMetadata = Record<string, any>

type CommonRoom<
    TPlayer = any,
    TRoomMetadata = any,
    TRoomOptions = RoomOptions,
    TGameNamespace extends GameNamespace = GameNamespace,
    TRoomCode extends RoomCode = RoomCode,
> = {
    readonly id: RoomId<TGameNamespace, TRoomCode>
    readonly roomCode: TRoomCode
    readonly namespace: TGameNamespace
    state: RoomState

    players: TPlayer[]

    meta: TRoomMetadata
    options: TRoomOptions

    timeStamp: Timestamp
}

export type Room<TPlayer = any, TRoomMetadata = CommonRoomMetadata, TRoomOptions = RoomOptions> = CommonRoom<
    TPlayer,
    TRoomMetadata,
    TRoomOptions,
    GameNamespace,
    RoomCode
> & {
    addPlayer(player: TPlayer): void
    removePlayer(playerId: PlayerID): void
    updateOptions(options: Partial<TRoomOptions>): void
    updateMeta(meta: Partial<TRoomMetadata>): void
    set updateState(state: RoomState)
    get serialize(): any
    reset(): void
}
