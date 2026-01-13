import { AdminMonitor } from '@/core/admin/AdminMonitor'
import { IGameRoom, ISingleRoomManager, RoomId } from '@/core/interfaces/room.interface'

export class SingleRoomManager<TGameRoom extends IGameRoom<any, any>> implements ISingleRoomManager<TGameRoom> {
    private rooms = new Map<RoomId, TGameRoom>()

    constructor(private readonly _adminMonitor: AdminMonitor) {}

    addRoom(playerId: string, roomId: RoomId, room: TGameRoom) {
        this.rooms.set(roomId, room)
        this._adminMonitor.emit('rooms:created', { playerId, roomId })
    }

    removeRoom(roomId: RoomId) {
        this.rooms.delete(roomId)
        this._adminMonitor.emit('rooms:deleted', { roomId })
    }

    has(roomId: RoomId) {
        return this.rooms.has(roomId)
    }

    getRoom(roomId: RoomId): TGameRoom | undefined {
        return this.rooms.get(roomId)
    }

    clear() {
        this.rooms.clear()
    }

    get all() {
        return Array.from(this.rooms.values())
    }

    get count() {
        return this.rooms.size
    }
}
