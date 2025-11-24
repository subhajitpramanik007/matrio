import crypto from 'crypto'

import { GameNamespace, RoomIsFullException, Timestamp } from '../utils'
import { CommonRoomMetadata, Room, RoomCode, RoomId, RoomOptions } from './room.type'
import { RoomState } from './roomState'
import { BasePlayer } from '../player'

export abstract class BaseRoom<
    TPlayer extends BasePlayer = BasePlayer,
    TRoomMetadata extends CommonRoomMetadata = CommonRoomMetadata,
    TOptions extends RoomOptions = RoomOptions,
> implements Room<TPlayer, TRoomMetadata, TOptions>
{
    readonly id: RoomId<GameNamespace, RoomCode>
    readonly roomCode: RoomCode
    readonly namespace: GameNamespace
    state: RoomState

    players: TPlayer[]
    meta: TRoomMetadata
    options: TOptions

    timeStamp: Timestamp = new Timestamp()

    constructor({
        namespace,
        options,
        meta = {} as TRoomMetadata,
    }: {
        namespace: GameNamespace
        options: TOptions
        meta?: TRoomMetadata
    }) {
        const roomCode = this.generateRoomCode
        this.roomCode = roomCode
        this.id = `${namespace}:${roomCode}`

        this.namespace = namespace
        this.state = RoomState.IDLE

        this.players = []
        this.options = options satisfies TOptions

        this.meta = meta satisfies TRoomMetadata
        this.touch()
    }

    protected touch() {
        this.timeStamp.update()
    }

    private get generateRoomCode() {
        return crypto.randomInt(1000, 9999).toString()
    }

    get isFull() {
        return this.players.length == this.options.maxPlayers
    }

    protected isPlayerAlreadyInRoom(playerId: string) {
        return this.players.find((p) => p.id === playerId)
    }

    addPlayer(player: TPlayer) {
        if (this.isPlayerAlreadyInRoom(player.id)) return
        if (this.isFull) throw new RoomIsFullException()

        this.players.push(player)
        this.touch()
    }

    removePlayer(id: string) {
        this.players = this.players.filter((p) => p.id !== id)
        this.touch()
    }

    updateMeta(meta: Partial<TRoomMetadata>) {
        this.meta = { ...this.meta, ...meta }
        this.touch()
    }

    updateOptions(options: Partial<TOptions>) {
        this.options = { ...this.options, ...options }
        this.touch()
    }

    set updateState(state: RoomState) {
        this.state = state
        this.touch()
    }

    get serialize() {
        return {
            id: this.id,
            roomCode: this.roomCode,
            state: this.state,
            players: this.players.map((p) => p.serialize),
            meta: this.meta,
            options: this.options,
        }
    }

    reset() {
        this.touch()
    }
}
