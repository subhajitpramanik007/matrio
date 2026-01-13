import {
    IGameRoom,
    IRoomCreationData,
    IRoomData,
    IRoomPlayerManager,
    IRoomSettingsManager,
    IRoomStateManager,
    RoomCode,
    RoomId,
} from '@/core/interfaces/room.interface'
import { GameNamespace } from '@/core/utils'
import { IPlayer } from '@/core/interfaces/player.interface'

import { GameRoomFactory } from './GameRoomFactory'

export class GameRoom<TPlayer extends IPlayer, TMetadata extends Record<string, any>>
    implements IGameRoom<TPlayer, TMetadata>
{
    public readonly id: RoomId
    public readonly roomCode: RoomCode
    public readonly namespace: GameNamespace
    public readonly players: IRoomPlayerManager<TPlayer>
    public readonly settings: IRoomSettingsManager
    public readonly state: IRoomStateManager
    meta: TMetadata

    constructor(data: IRoomCreationData<TPlayer, TMetadata>) {
        const roomCode = GameRoomFactory.generateRoomCode()
        const roomId = GameRoomFactory.generateRoomId(data.namespace, roomCode)

        this.namespace = data.namespace
        this.id = roomId
        this.roomCode = roomCode

        this.state = GameRoomFactory.createRoomStateInstance()
        this.players = GameRoomFactory.createRoomPlayersInstance<TPlayer>(data.options.maxPlayers)
        this.settings = GameRoomFactory.createRoomSettingsInstance(data.options)
        this.meta = data.metadata
    }

    addPlayer(player: TPlayer): void {
        this.players.add(player)
    }

    removePlayer(playerId: string) {
        this.players.remove(playerId)
    }

    reset(): void {
        this.state.reset()
        this.players.clear()
        this.settings.reset()
    }

    toJSON(): IRoomData<TPlayer, Record<string, any>> {
        return {
            id: this.id,
            roomCode: this.roomCode,
            namespace: this.namespace,
            options: this.settings.toJSON(),
            timestamp: this.state.timestamp,
            state: this.state.current,
            metadata: this.meta,
            players: this.players.all,
        }
    }
}
