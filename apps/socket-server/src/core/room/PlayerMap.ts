import { RoomId } from './room.type'

export class PlayerMap {
    private map = new Map<string, RoomId>() // playerId → roomId

    set(playerId: string, roomId: RoomId) {
        this.map.set(playerId, roomId)
    }

    get(playerId: string) {
        return this.map.get(playerId)
    }

    delete(playerId: string) {
        this.map.delete(playerId)
    }

    has(playerId: string) {
        return this.map.has(playerId)
    }
}
