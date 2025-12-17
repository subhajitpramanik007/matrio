import { Socket } from 'socket.io'
import { BaseClass } from '../lifecycle/BaseClass'
import { RoomManager } from '../room'
import { EGameNamespace, PlayerAlreadyInRoomException } from '../utils'

export abstract class GameBaseService<T extends EGameNamespace> extends BaseClass {
    protected readonly namespace: T

    constructor(
        namespace: T,
        protected readonly roomManager: RoomManager,
    ) {
        super()
        this.namespace = namespace
    }

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
