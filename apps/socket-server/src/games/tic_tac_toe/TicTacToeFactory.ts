import { BadRequestException, EGameNamespace, NotImplementException } from '@/core/utils'
import { GameMode, IRoomManagerFactory, RoomType } from '@/core/interfaces/room.interface'

import { TicTacToeService } from './TicTacToeService'
import { ITicTacToePlayer, ITicTacToeRoom, ITicTacToeRoomManager, TicTacToeSymbol } from './TicTacToe.interface'
import { TicTacToeRoom } from './TicTacToeRoom'
import { CreatePrivateRoomDTO, CreatePublicRoomDTO } from './schema/CreateRoomSchema'
import { IPlayerManager } from '@/core/interfaces/player.interface'
import { TicTacToePlayer } from './TicTacToePlayer'
import { ServerTaskManger } from '@/core/scheduler'

export class TicTacToeFactory {
    private static initialized = false

    private static _roomManager: ITicTacToeRoomManager
    private static _playerManager: IPlayerManager
    private static _roomManagerFactory: IRoomManagerFactory

    static init(playerManager: IPlayerManager, roomManagerFactory: IRoomManagerFactory) {
        this._playerManager = playerManager
        this._roomManagerFactory = roomManagerFactory
        this._roomManager = this._roomManagerFactory.createSingleRoomManager(EGameNamespace.TIC_TAC_TOE)
        this.initialized = true
    }

    static createService(serverTaskManager: ServerTaskManger): TicTacToeService {
        if (!this.initialized) throw new NotImplementException('TicTacToeFactory is not initialized')

        return new TicTacToeService(this._playerManager, this._roomManager, serverTaskManager)
    }

    static createPrivateRoom(playerId: string, data: CreatePrivateRoomDTO): ITicTacToeRoom {
        if (!this.initialized) throw new NotImplementException('TicTacToeFactory is not initialized')
        const room = new TicTacToeRoom({
            options: {
                ...data,
                roomType: RoomType.PRIVATE,
                gameMode: GameMode.MULTIPLAYER,
                maxPlayers: 2,
            },
        })

        this._playerManager.occupancyTracker.trackPlayer(playerId, room.id)
        this._roomManager.addRoom(playerId, room.id, room)
        this._roomManagerFactory.registerRoomLocation(room.id, EGameNamespace.TIC_TAC_TOE)
        return room
    }

    static createRandomRoom(playerId: string, data: CreatePublicRoomDTO): ITicTacToeRoom {
        if (!this.initialized) throw new NotImplementException('TicTacToeFactory is not initialized')

        const room = new TicTacToeRoom({
            options: {
                ...data,
                roomType: RoomType.PUBLIC,
                gameMode: GameMode.MULTIPLAYER,
                maxPlayers: 2,
            },
        })

        this._playerManager.occupancyTracker.trackPlayer(playerId, room.id)
        this._roomManager.addRoom(playerId, room.id, room)
        this._roomManagerFactory.registerRoomLocation(room.id, EGameNamespace.TIC_TAC_TOE)
        return room
    }

    static createPlayer(socketId: string, symbol: TicTacToeSymbol): ITicTacToePlayer {
        if (!this.initialized) throw new NotImplementException('TicTacToeFactory is not initialized')

        const player = this._playerManager.getBySocketId(socketId)
        if (!player) throw new BadRequestException('Player not found')

        return new TicTacToePlayer({
            id: player.id,
            socketId,
            username: player.username,
            avatar: player.avatar,
            symbol,
        })
    }
}
