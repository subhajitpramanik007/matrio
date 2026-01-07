import { Logger } from '@/core/utils'
import {
    IPlayer,
    IPlayerConnectionMapper,
    IPlayerManager,
    IPlayerOccupancyTracker,
    IPlayerRegistry,
} from '@/core/interfaces/player.interface'
import { LifecycleBaseClass } from '@/core/lifecycle/BaseClass'

import { ReconnectionHandler } from '@/core/common/ReconnectionHandler'
import { IReconnectionHandler } from '@/core/interfaces/reconnectionHandler.interface'

import { PlayerRegistry } from './PlayerRegistry'
import { PlayerConnectionMapper } from './PlayerConnectionMapper'
import { PlayerOccupancyTracker } from './PlayerOccupancyTracker'
import { AdminMonitor } from '../admin/AdminMonitor'

export class PlayerManager extends LifecycleBaseClass implements IPlayerManager {
    private readonly logger = new Logger('PlayerManager')

    private readonly _registry: IPlayerRegistry = new PlayerRegistry()
    private readonly _connectionMapper: IPlayerConnectionMapper = new PlayerConnectionMapper()
    private readonly _occupancyTracker: IPlayerOccupancyTracker = new PlayerOccupancyTracker()
    private readonly _reconnectionHandler: IReconnectionHandler = new ReconnectionHandler()

    constructor(private readonly _adminMonitor: AdminMonitor) {
        super()
    }

    get registry(): IPlayerRegistry {
        return this._registry
    }

    get connectionMapper(): IPlayerConnectionMapper {
        return this._connectionMapper
    }

    get occupancyTracker(): IPlayerOccupancyTracker {
        return this._occupancyTracker
    }

    onConnection(player: IPlayer, roomId?: string): void {
        const isReconnected = this._reconnectionHandler.handleReconnect(player.id)
        if (isReconnected) {
            this.onPlayerReconnect(player.id, player.socketId)
            return
        }

        // check player is already in registry
        if (this._registry.getPlayer(player.id)) {
            this.logger.warn(`Player already in registry: ${player.id}`)
            return
        }

        this._registry.addPlayer(player)
        this._connectionMapper.mapSocketId(player.socketId, player.id)
        if (roomId) this._occupancyTracker.trackPlayer(player.id, roomId)

        this.logger.log(`Player added to registry: ${player.id}`)
        this._adminMonitor.emit('players:added', player)
    }

    onDisconnection(playerId: string): void {
        const player = this.registry.getPlayer(playerId)
        if (!player) return

        const onExpiry = this.onPlayerExpiry.bind(this, playerId)
        this._reconnectionHandler.handleDisconnect(playerId, onExpiry)

        this.logger.warn(`Player has been disconnected: ${playerId}`)
        this._adminMonitor.emit('players:removed', playerId)
    }

    getBySocketId(socketId: string): IPlayer | undefined {
        const playerId = this._connectionMapper.getPlayerIdBySocketId(socketId)
        if (!playerId) return undefined
        return this._registry.getPlayer(playerId)
    }

    getAllPlayers(): IPlayer[] {
        return this._registry.getAllPlayers()
    }

    get playerCount(): number {
        return this._registry.playerCount
    }

    async onDestroy(): Promise<void> {
        this._registry.clear()
        this._connectionMapper.clear()
        this._occupancyTracker.clear()

        await super.onDestroy()
    }

    private onPlayerExpiry(playerId: string): void {
        this._registry.removePlayer(playerId)
        this._connectionMapper.unmapSocketId(playerId)
        this._occupancyTracker.untrackPlayer(playerId)

        this.logger.warn(`Player removed from registry: ${playerId}`)
    }

    private onPlayerReconnect(playerId: string, socketId: string): void {
        this._registry.onPlayerReconnect(playerId, socketId)
        this._connectionMapper.onPlayerReconnect(playerId, socketId)

        this.logger.verbose(`Player reconnected: ${playerId}`)
        this._adminMonitor.emit('players:reconnect', playerId)
    }
}
