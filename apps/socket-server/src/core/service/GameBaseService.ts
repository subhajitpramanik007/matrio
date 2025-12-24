import { Socket } from 'socket.io'
import { BaseClass } from '../lifecycle/BaseClass'
import { RoomManager } from '../room'
import { EGameNamespace, Logger, PlayerAlreadyInRoomException } from '../utils'
import { GameEventMethod } from '../utils/gameRouter'

export abstract class GameBaseService<T extends EGameNamespace> extends BaseClass {
    protected readonly logger = new Logger(this.constructor.name)
    methods: Map<GameEventMethod, (client: Socket, data: any) => any> = new Map()
    protected readonly namespace: T

    constructor(
        namespace: T,
        protected readonly roomManager: RoomManager,
    ) {
        super()
        this.namespace = namespace
    }

    protected registerMethod(methodName: GameEventMethod, handler: (client: Socket, data: any) => any) {
        if (this.methods.has(methodName)) throw new Error(`Method ${methodName} already registered`)
        this.methods.set(methodName, handler)
        this.logger.verbose(`Mapped { gameNamespace: ${this.namespace}, event: ${methodName} }`)
    }

    protected checkPlayerIsAlreadyInRoom(playerId: string) {
        if (this.roomManager.isPlayerInRoom(playerId)) throw new PlayerAlreadyInRoomException()
    }

    protected createRoom?(client: Socket, data: any): any
    protected joinRoom?(client: Socket, data: any): any
    protected randomRoom?(client: Socket, data: any): any
    protected makeMove?(client: Socket, data: any): any
    protected leaveRoom?(client: Socket, data: any): any
    protected restartGame?(client: Socket, data: any): any
    protected ready?(client: Socket, data: any): any
    protected endGame?(client: Socket, data: any): any
}
