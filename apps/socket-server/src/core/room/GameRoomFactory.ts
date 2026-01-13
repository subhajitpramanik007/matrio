import crypto from 'crypto'
import {
    IGameRoom,
    IRoomGameEngine,
    IRoomOptions,
    IRoomPlayerManager,
    IRoomSettingsManager,
    IRoomStateManager,
} from '@/core/interfaces/room.interface'
import { GameNamespace, Timestamp } from '@/core/utils'
import { IPlayer } from '@/core/interfaces/player.interface'

import { RoomCode, RoomId } from '@/core/interfaces/room.interface'
import { RoomPlayerManager } from './RoomPlayerManager'
import { RoomSettingsManager } from './RoomSettingsManager'
import { RoomStateManager } from './RoomStateManager'
import { RoomState } from './roomState'

export class GameRoomFactory {
    static generateRoomCode(): RoomCode {
        return crypto.randomBytes(6).toString('hex').slice(0, 6).toUpperCase()
    }

    static generateRoomId(namespace: GameNamespace, roomCode: RoomCode): RoomId {
        return `${namespace}_${roomCode}`
    }

    static createRoomPlayersInstance<TPlayer extends IPlayer>(maxPlayers: number): IRoomPlayerManager<TPlayer> {
        return new RoomPlayerManager<TPlayer>(maxPlayers)
    }

    static createRoomSettingsInstance(options: IRoomOptions): IRoomSettingsManager {
        return new RoomSettingsManager(options)
    }

    static createRoomStateInstance(): IRoomStateManager {
        return new RoomStateManager(RoomState.IDLE, new Timestamp())
    }
}
