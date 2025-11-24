import { Socket } from 'socket.io'
import { GameEvent } from '../utils/gameRouter'
import { BaseClass } from '../lifecycle/BaseClass'
import { RoomManager } from '../room'
import { PlayerAlreadyInRoomException } from '../utils'

export abstract class GameBaseService extends BaseClass {
    constructor(
        protected readonly roomManager: RoomManager,
        protected readonly schemas: Record<GameEvent, any>,
    ) {
        super()
    }

    protected abstract validateData<T extends GameEvent>(event: T, data: any): any

    protected checkPlayerIsAlreadyInRoom(playerId: string) {
        if (this.roomManager.isPlayerInRoom(playerId)) throw new PlayerAlreadyInRoomException()
    }

    abstract createRoom(client: Socket, data: any): any
    abstract joinRoom(client: Socket, data: any): any
    abstract randomRoom(client: Socket, data: any): any
    abstract makeMove(client: Socket, data: any): any
    abstract leaveRoom(client: Socket, data: any): any
    abstract restartGame(client: Socket, data: any): any
    abstract ready(client: Socket, data: any): any
    abstract endGame(client: Socket, data: any): any
}
