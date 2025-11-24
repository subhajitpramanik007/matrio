import { GameNamespace, Logger } from '../utils'
import { BaseClass } from '../lifecycle/BaseClass'

import { RoomId, Room } from './room.type'
import { PlayerMap } from './PlayerMap'
import { CheckersRoom } from '../../games/checkers'
import { RoomState } from './roomState'

// TODO: add more game types
type StoreRoom<T extends GameNamespace> = T extends 'checkers' ? CheckersRoom : never

export class RoomManager extends BaseClass {
    private logger = new Logger('RoomManager')
    private roomMap = new Map<RoomId, StoreRoom<GameNamespace>>()
    private playerMap = new PlayerMap()

    constructor() {
        super()
    }

    add<T extends GameNamespace>(playerId: string, room: StoreRoom<T>) {
        // Remove player from existing room if present
        const existingRoomId = this.playerMap.get(playerId)
        if (existingRoomId && existingRoomId !== room.id) {
            const existingRoom = this.roomMap.get(existingRoomId)
            if (existingRoom) {
                // Remove player from old room's player collection
                existingRoom.removePlayer?.(playerId)
            }
        }

        // Add player to new room
        this.playerMap.set(playerId, room.id)
        if (!this.roomMap.has(room.id)) this.roomMap.set(room.id, room)

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

    get<T extends GameNamespace>(roomId: RoomId<T>): StoreRoom<T> | undefined {
        return this.roomMap.get(roomId) as StoreRoom<T>
    }

    findRandomRoom<T extends GameNamespace>(gameNamespace: T, cost: number): StoreRoom<T> | undefined {
        const thisGameRooms = Array.from(this.roomMap.values()).filter((room) => room.namespace === gameNamespace)

        const availableRooms = thisGameRooms.filter(
            ({ options, state, isFull }) =>
                options.bettingCoins === cost && options.roomType === 'public' && state === RoomState.IDLE && !isFull,
        )

        if (availableRooms.length === 0) {
            return undefined
        }

        const randomIdx = Math.floor(Math.random() * availableRooms.length)
        return availableRooms[randomIdx] as StoreRoom<T>
    }

    getRoomIdByPlayerId(playerId: string) {
        return this.playerMap.get(playerId)
    }

    isPlayerInRoom(playerId: string): boolean {
        return this.playerMap.has(playerId)
    }
}
