import { GameNamespace, RoomCode, Timestamp } from '../utils'
import { RoomState } from './roomState'

type RoomId<TGameNamespace extends GameNamespace, TRoomCode extends RoomCode> = `${TGameNamespace}:${TRoomCode}`

export type RoomOptions<TExtraOptions = any> = {
    readonly roomType: 'public' | 'private'
    readonly gameType: 'multiplayer' | 'you-vs-ai'
    readonly maxPlayers: number
    readonly bettingCoins?: number
    readonly gameDuration?: number
    readonly maxTimePerTurn?: number
    readonly maxNoOfMissedTurns?: number
} & TExtraOptions

export type CommonRoom<
    TPlayer = any,
    TGameMetadata = any,
    TExtraOptions = any,
    TGameNamespace extends GameNamespace = GameNamespace,
    TRoomCode extends RoomCode = RoomCode,
> = {
    readonly id: RoomId<TGameNamespace, TRoomCode>
    readonly roomCode: TRoomCode
    readonly namespace: TGameNamespace
    state: RoomState

    players: Set<TPlayer>

    meta: TGameMetadata
    options: RoomOptions<TExtraOptions>

    timeStamp: Timestamp
}

export type Room<TPlayer = any, TGameMetadata = any, TExtraOptions = any> = CommonRoom<
    TPlayer,
    TGameMetadata,
    TExtraOptions,
    GameNamespace,
    RoomCode
>
