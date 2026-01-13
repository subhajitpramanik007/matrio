import { Socket } from 'socket.io'

import { Logger } from '@/core/utils/logger'
import { IPlayer, IPlayerManager } from '@/core/interfaces/player.interface'
import { EGameNamespace, NotImplementException, PlayerAlreadyInRoomException, SocketResponse } from '@/core/utils'
import { GameEventMethod, GameEventResponse, GameEventRouter } from '@/core/utils/gameRouter'
import { IGameRoom, ISingleRoomManager } from '@/core/interfaces/room.interface'
import { PayloadSchema } from '@/core/validation/GameSocketRequestSchema'
import { RoomId } from '@/core/interfaces/room.interface'
import { ServerTaskManger } from '@/core/scheduler'

type Handler = (socket: Socket, payload: any) => any

export abstract class GameBaseService<
    TPlayer extends IPlayer = IPlayer,
    TRoom extends IGameRoom<TPlayer, any> = IGameRoom<TPlayer, any>,
> {
    protected readonly logger = new Logger('GameBaseService')
    private readonly eventRouterToRegister = new Map<GameEventMethod, Handler>()

    constructor(
        protected readonly namespace: EGameNamespace,
        protected readonly _playerManager: IPlayerManager,
        protected readonly _roomManager: ISingleRoomManager<TRoom>,
        protected readonly _serverTaskManager: ServerTaskManger,
    ) {
        this.registerEvents()
    }

    protected registerEvents() {
        this.registerEventRouter(GameEventRouter.create_room, this.createRoom.bind(this))
        this.registerEventRouter(GameEventRouter.join_room, this.joinRoom.bind(this))
        this.registerEventRouter(GameEventRouter.random_room, this.randomRoom.bind(this))
        this.registerEventRouter(GameEventRouter.make_move, this.makeMove.bind(this))
        this.registerEventRouter(GameEventRouter.leave_room, this.leaveRoom.bind(this))
        this.registerEventRouter(GameEventRouter.restart_game, this.restartGame.bind(this))
        this.registerEventRouter(GameEventRouter.ready, this.ready.bind(this))
        this.registerEventRouter(GameEventRouter.end_game, this.endGame.bind(this))
    }

    get eventsRouter() {
        return this.eventRouterToRegister
    }

    protected registerEventRouter(method: GameEventMethod, handler: Handler) {
        this.eventRouterToRegister.set(method, handler)
        this.logger.verbose(`Mapped { gameNamespace: ${this.namespace}, event: ${method} }`)
    }

    protected createRoom(client: Socket, payload: PayloadSchema): any {
        throw new NotImplementException('Method not implemented')
    }

    protected joinRoom(client: Socket, payload: PayloadSchema): any {
        throw new NotImplementException('Method not implemented')
    }

    protected randomRoom(client: Socket, payload: PayloadSchema): any {
        throw new NotImplementException('Method not implemented')
    }

    protected makeMove(client: Socket, payload: PayloadSchema): any {
        throw new NotImplementException('Method not implemented')
    }

    protected leaveRoom(client: Socket, payload: PayloadSchema): any {
        throw new NotImplementException('Method not implemented')
    }

    protected restartGame(client: Socket, payload: PayloadSchema): any {
        throw new NotImplementException('Method not implemented')
    }

    protected ready(client: Socket, payload: PayloadSchema): any {
        throw new NotImplementException('Method not implemented')
    }

    protected endGame(client: Socket, payload: PayloadSchema): any {
        throw new NotImplementException('Method not implemented')
    }

    // ----------------- Helper Methods -----------------

    protected isPlayerAlreadyInRoom(playerId: string): boolean {
        const isOccupied = this._playerManager.occupancyTracker.isPlayerOccupied(playerId)
        if (isOccupied) throw new PlayerAlreadyInRoomException('Player already in room')
        return isOccupied
    }

    protected getRoomIdByRoomCode(roomCode: string): RoomId {
        return `${this.namespace}_${roomCode}`
    }

    protected sendPlayerData(clientId: string, player: TPlayer) {
        this._serverTaskManager.emitEventWithDelay(
            {
                name: this.namespace,
                event: GameEventResponse.PLAYER_DATA,
                to: clientId,
                payload: new SocketResponse(player.toJSON()),
            },
            1000,
        )
    }
}
