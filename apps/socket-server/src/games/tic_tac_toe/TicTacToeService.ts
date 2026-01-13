import { Socket } from 'socket.io'

import { ServerTaskManger } from '@/core/scheduler'
import { GameEventResponse } from '@/core/utils/gameRouter'
import { ZodValidation } from '@/core/validation/zodValidation'
import { GameBaseService } from '@/games/common/GameBaseService'
import { IPlayerManager } from '@/core/interfaces/player.interface'
import { GameMode, RoomType } from '@/core/interfaces/room.interface'
import { PayloadSchema } from '@/core/validation/GameSocketRequestSchema'
import { ISocketResponse, ISocketStringResponse } from '@/core/interfaces/response.interface'
import { BadRequestException, EGameNamespace, Logger, PlayerAlreadyInRoomException, SocketResponse } from '@/core/utils'

import { TicTacToeFactory } from './TicTacToeFactory'
import { TicTacToeMakeMoveSchema } from './schema/MakeMoveSchema'
import { JoinPrivateTicTacToeRoomSchema } from './schema/JoinPrivateRoomSchema'
import { CreatePrivateTicTacToeRoomSchema, CreatePublicTicTacToeRoomSchema } from './schema/CreateRoomSchema'
import { ITicTacToePlayer, ITicTacToeRoom, ITicTacToeRoomManager, TicTacToeSymbol } from './TicTacToe.interface'
import { CreateRoomResponseDTO, JoinRoomResponseDTO, MakeMoveResponseDTO, RandomRoomResponseDTO } from './TicTacToe.dto'

export class TicTacToeService extends GameBaseService<ITicTacToePlayer, ITicTacToeRoom> {
    protected readonly logger = new Logger('TicTacToeService')

    constructor(
        protected readonly _playerManager: IPlayerManager,
        protected readonly _roomManager: ITicTacToeRoomManager,
        protected readonly _serverTaskManager: ServerTaskManger,
    ) {
        super(EGameNamespace.TIC_TAC_TOE, _playerManager, _roomManager, _serverTaskManager)
    }

    protected override createRoom(client: Socket, payload: PayloadSchema): ISocketResponse<CreateRoomResponseDTO> {
        const isPlayerOccupied = this.isPlayerAlreadyInRoom(client.user?.id)
        if (isPlayerOccupied) throw new PlayerAlreadyInRoomException('Player already in room')

        const validatedData = ZodValidation(CreatePrivateTicTacToeRoomSchema, payload?.data)
        const room = TicTacToeFactory.createPrivateRoom(client.user?.id, validatedData)
        const player = TicTacToeFactory.createPlayer(client.id, 'X')
        room.addPlayer(player)

        this.sendPlayerData(client.id, player)

        return new SocketResponse(room.toJSON())
    }

    protected override joinRoom(client: Socket, payload: PayloadSchema): ISocketResponse<JoinRoomResponseDTO> {
        this.isPlayerAlreadyInRoom(client.user?.id)

        const validatedData = ZodValidation(JoinPrivateTicTacToeRoomSchema, payload?.data)
        const roomId = this.getRoomIdByRoomCode(validatedData.roomCode)
        const room = this._roomManager.getRoom(roomId)
        if (!room) throw new BadRequestException('Room not found')

        const player = TicTacToeFactory.createPlayer(client.id, 'O')
        room.addPlayer(player)

        this.sendPlayerData(client.id, player)

        return new SocketResponse(room.toJSON())
    }

    protected override randomRoom(client: Socket, payload: PayloadSchema): ISocketResponse<RandomRoomResponseDTO> {
        this.isPlayerAlreadyInRoom(client.user?.id)

        const validatedData = ZodValidation(CreatePublicTicTacToeRoomSchema, payload?.data)
        let room = this.availableRandomRoom(validatedData.bettingCoins)
        let playerSymbol: TicTacToeSymbol = 'O'

        if (!room) {
            room = TicTacToeFactory.createRandomRoom(client.user?.id, validatedData)
            playerSymbol = 'X'
        }

        const player = TicTacToeFactory.createPlayer(client.id, playerSymbol)
        room.addPlayer(player)

        this.sendPlayerData(client.id, player)

        return new SocketResponse(room.toJSON())
    }

    protected override leaveRoom(client: Socket): ISocketStringResponse {
        const roomId = this._playerManager.occupancyTracker.getRoomIdByPlayerId(client.user?.id)
        if (roomId) {
            const room = this._roomManager.getRoom(roomId)
            if (room) room.removePlayer(client.user?.id)
            if (room?.players.count === 0) this._roomManager.removeRoom(roomId)
            this._playerManager.occupancyTracker.untrackPlayer(client.user?.id)
        }

        return new SocketResponse('Left the room successfully')
    }

    protected override makeMove(client: Socket, payload: PayloadSchema): ISocketResponse<MakeMoveResponseDTO> {
        const validatedData = ZodValidation(TicTacToeMakeMoveSchema, payload?.data)

        const roomId = this._playerManager.occupancyTracker.getRoomIdByPlayerId(client.user?.id)
        if (!roomId) throw new BadRequestException('Player not in any room')

        const room = this._roomManager.getRoom(roomId)
        if (!room) throw new BadRequestException('Room not found')

        const result = room.makeMove(client.user?.id, validatedData.cell)
        if (result) {
            this._serverTaskManager.emitEventAfterLogic({
                name: 'TicTacToeGameResult',
                event: GameEventResponse.GAME_RESULT,
                payload: new SocketResponse(result),
                to: roomId,
            })
        }

        const roomData = room.toJSON()
        return new SocketResponse({
            metadata: roomData.metadata,
            state: roomData.state,
            timestamp: roomData.timestamp,
        })
    }

    /**
     * Find available random room
     * @param bettingCoins
     * @returns ITicTacToeRoom | undefined
     */
    private availableRandomRoom(bettingCoins: number): ITicTacToeRoom | undefined {
        return this._roomManager.all
            .filter(
                (r) =>
                    r.settings.roomType === RoomType.PUBLIC && // if room is public
                    r.settings.gameMode === GameMode.MULTIPLAYER && // if room is multiplayer
                    r.settings.maxPlayers > r.players.count && // if room is not full
                    r.settings.bettingCoins === bettingCoins, // if room is for same betting coins
            )
            .sort((a, b) => a.state.timestamp.age - b.state.timestamp.age)
            .shift()
    }
}
