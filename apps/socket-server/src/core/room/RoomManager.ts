import { Logger } from '../utils'
import { BaseClass } from '../lifecycle/BaseClass'

import { RoomId, Room } from './room.type'
import { PlayerMap } from './PlayerMap'

export class RoomManager extends BaseClass {
    private logger = new Logger('RoomManager')
    private roomMap = new Map<RoomId, Room>()
    private playerMap = new PlayerMap()

    constructor() {
        super()
    }

    add(playerId: string, room: Room) {
        this.playerMap.set(playerId, room.id)
        this.roomMap.set(room.id, room)

        this.logger.debug(`Room added: ${room.id}`)
    }

    has(roomId: RoomId) {
        return this.roomMap.has(roomId)
    }

    remove(roomId: RoomId) {
        const room = this.roomMap.get(roomId)
        if (room) {
            const playerIds = Array.from(room.players).map((player) => player.id)
            playerIds.forEach((playerId) => this.playerMap.delete(playerId))

            this.roomMap.delete(roomId)
            this.logger.debug(`Room deleted: ${roomId}`)
        }
    }

    get(roomId: RoomId) {
        return this.roomMap.get(roomId)
    }

    getRoomIdByPlayerId(playerId: string) {
        return this.playerMap.get(playerId)
    }
}
