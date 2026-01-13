import { Logger } from '@/core/utils'
import { GameNamespace } from '@/core/utils'
import { AdminMonitor } from '@/core/admin/AdminMonitor'
import { LifecycleBaseClass } from '@/core/lifecycle/BaseClass'
import { IPlayerManager } from '@/core/interfaces/player.interface'
import { IGameRoom, IRoomManagerFactory, ISingleRoomManager } from '@/core/interfaces/room.interface'

import { SingleRoomManager } from './SingleRoomManager'

export class RoomManagerFactory extends LifecycleBaseClass implements IRoomManagerFactory {
    private readonly logger = new Logger('RoomManagerFactory')
    private readonly singleRoomManagers = new Map<GameNamespace, ISingleRoomManager<IGameRoom<any, any>>>()
    private readonly roomToNamespaceMap = new Map<string, GameNamespace>()

    constructor(
        private readonly _playerManager: IPlayerManager,
        private readonly _adminMonitor: AdminMonitor,
    ) {
        super()
    }

    createSingleRoomManager<TGameRoom extends IGameRoom<any, any>>(
        namespace: GameNamespace,
    ): ISingleRoomManager<TGameRoom> {
        const existingManager = this.singleRoomManagers.get(namespace)
        if (existingManager) {
            this.logger.warn(`Single room manager for namespace ${namespace} already exists`)
            return existingManager as ISingleRoomManager<TGameRoom>
        }

        this.logger.log(`Creating single room manager for namespace ${namespace}`)
        const manager = new SingleRoomManager<TGameRoom>(this._adminMonitor)
        this.singleRoomManagers.set(namespace, manager)
        return manager
    }

    getRoomManager<TGameRoom extends IGameRoom<any, any>>(
        namespace: GameNamespace,
    ): ISingleRoomManager<TGameRoom> | null {
        return this.singleRoomManagers.get(namespace) as ISingleRoomManager<TGameRoom> | null
    }

    getRoomManagerByPlayerId<TGameRoom extends IGameRoom<any, any>>(
        playerId: string,
    ): ISingleRoomManager<TGameRoom> | null {
        const roomId = this._playerManager.occupancyTracker.getRoomIdByPlayerId(playerId)
        return roomId ? this.getRoomManagerByRoomId<TGameRoom>(roomId) : null
    }

    getRoomManagerByRoomId<TGameRoom extends IGameRoom<any, any>>(
        roomId: string,
    ): ISingleRoomManager<TGameRoom> | null {
        const namespace = this.roomToNamespaceMap.get(roomId)
        return namespace ? this.getRoomManager<TGameRoom>(namespace) : null
    }

    registerRoomLocation(roomId: string, namespace: GameNamespace) {
        this.roomToNamespaceMap.set(roomId, namespace)
    }

    removeRoomLocation(roomId: string) {
        this.roomToNamespaceMap.delete(roomId)
    }

    get totalRooms() {
        let count = 0
        this.singleRoomManagers.forEach((manager) => (count += manager.count))
        return count
    }

    reset() {
        this.singleRoomManagers.forEach((manager) => manager.clear())
    }

    async onDestroy() {
        this.singleRoomManagers.clear()

        await super.onDestroy()
    }
}
