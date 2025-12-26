import { Server, Socket } from 'socket.io'

import { RoomManager, RoomState } from '@/core/room'
import { GameEventResponse, GameEventRouter } from '@/core/utils/gameRouter'
import { ZodValidation } from '@/core/validation/zodValidation'
import { GameBaseService } from '@/core/service/GameBaseService'
import { EGameNamespace, Logger, RoomNotFoundException, SocketResponse } from '@/core/utils'

import { CheckersRoom } from '@checkers/checkers.room'
import { CheckersPlayer } from '@checkers/checkers.player'
import { CheckersServiceUtils } from '@checkers/checkers.utils'
import { ServerTaskManger, TaskScheduler } from '@/core/scheduler'
import { CheckersSchemaRegistry } from '@checkers/checkers.schemas'
import { ICheckersPlayerDataResponse, TCheckersPrefix } from '@checkers/checkers.type'

export class CheckersService extends GameBaseService<EGameNamespace> {
    protected readonly logger = new Logger('CheckersService')
    private utils = new CheckersServiceUtils(this.roomManager)
    private serverTaskManager = new ServerTaskManger(this.io)

    constructor(
        protected readonly io: Server,
        protected readonly roomManager: RoomManager,
    ) {
        super(EGameNamespace.CHECKERS, roomManager)

        this.registerMethod(GameEventRouter.create_room, this.createRoom)
        this.registerMethod(GameEventRouter.join_room, this.joinRoom)
        this.registerMethod(GameEventRouter.random_room, this.randomRoom)
        this.registerMethod(GameEventRouter.make_move, this.makeMove)
        this.registerMethod(GameEventRouter.leave_room, this.leaveRoom)
        this.registerMethod(GameEventRouter.restart_game, this.restartGame)
        this.registerMethod(GameEventRouter.ready, this.ready)
        this.registerMethod(GameEventRouter.end_game, this.endGame)
    }

    static ROOM_PREFIX: TCheckersPrefix = `${EGameNamespace.CHECKERS}_`

    private get task(): TaskScheduler {
        return this.serverTaskManager.getScheduler('checkers')
    }

    /**
     * Create checkers private room
     *
     * - Steps:
     *      1. Check user authenticated and Extract user from socket
     *      2. Check player is already in room
     *      3. Validate room options
     *      4. Create room instance
     *      5. Create player form socket
     *      6. Join player to room
     *      7. Send player data
     *      8. Return room
     */
    createRoom(client: Socket, data: any) {
        try {
            const user = this.utils.extractUserFromSocket(client)
            this.checkPlayerIsAlreadyInRoom(user.id)

            const roomOptions = ZodValidation(CheckersSchemaRegistry.create_room, data)
            const createRoom = this.utils.createRoomInstance(roomOptions, 'private')
            const player = this.utils.createPlayerFormSocket(client, 'red')

            createRoom.setState(RoomState.WAITING)

            const room = this.utils.joinPlayerToRoom(client, createRoom, player)

            this.sendPlayerData(client.id, { player: player.serialize })

            return new SocketResponse({ room: room.serialize }, 'Room created')
        } catch (error) {
            this.logger.error('CREATING ROOM ERROR :: ', error)
            throw error
        }
    }

    /**
     * Join checkers room
     *
     * - Steps:
     *      1. Check user authenticated and Extract user from socket
     *      2. Check player is already in room
     *      3. Validate room code
     *      4. Get room id by room code
     *      5. Get room by room id if not found throw error
     *      6. Create player form socket
     *      7. Join player to room
     *      8. Send player data
     *      9. Return room
     */
    joinRoom(client: Socket, data: any) {
        try {
            const user = this.utils.extractUserFromSocket(client)
            this.checkPlayerIsAlreadyInRoom(user.id)

            const { roomCode } = ZodValidation(CheckersSchemaRegistry.join_room, data)
            const roomId = this.utils.getRoomId(roomCode)
            const room = this.roomManager.get(roomId)
            if (!room) throw new RoomNotFoundException()

            const player = this.utils.createPlayerFormSocket(client, 'black')

            this.utils.joinPlayerToRoom(client, room, player)

            if (room.isFull && room.isAllPlayersReady) {
                room.startGame()
                this.sendGameStartedResponse(room)
            }

            this.sendPlayerData(client.id, { player: player.serialize })

            return new SocketResponse({ room: room.serialize }, 'Room joined')
        } catch (error) {
            this.logger.error('JOINING ROOM ERROR :: ', error)
            throw error
        }
    }

    /**
     * Random room
     *
     * - Steps:
     *      1. Check user authenticated and Extract user from socket
     *      2. Check player is already in room
     *      3. Validated request data
     *      4. Find random room in room manger with matching betting coins
     *      5. If room found join player to room, else create random room
     *      6. Send player data
     *      7. Return room
     */
    randomRoom(client: Socket, data: any) {
        try {
            const user = this.utils.extractUserFromSocket(client)
            this.checkPlayerIsAlreadyInRoom(user.id)

            const roomOptions = ZodValidation(CheckersSchemaRegistry.random_room, data)
            const findRandomRoom = this.roomManager.findRandomRoom(EGameNamespace.CHECKERS, roomOptions.bettingCoins)
            let player: CheckersPlayer
            let room: CheckersRoom

            if (!findRandomRoom) {
                room = this.utils.createRoomInstance(roomOptions, 'public')
                player = this.utils.createPlayerFormSocket(client, 'red')
            } else {
                room = findRandomRoom
                player = this.utils.createPlayerFormSocket(client, 'black')
            }

            this.utils.joinPlayerToRoom(client, room, player)

            this.sendPlayerData(client.id, { player: player.serialize })

            if (room.isFull && room.isAllPlayersReady) {
                room.startGame()

                this.sendGameStartedResponse(room)
            }

            return new SocketResponse({ room: room.serialize }, 'Room joined')
        } catch (error) {
            this.logger.error('RANDOM ROOM ERROR :: ', error)
            throw error
        }
    }

    /**
     * Make move
     *
     * - Steps:
     *      1. Check user authenticated
     *      2. Validate request data
     *      3. Apply move logic
     *      4. Send room data to room players
     */
    makeMove(client: Socket, data: any) {
        try {
            const user = this.utils.extractUserFromSocket(client)
            const { roomCode, ...move } = ZodValidation(CheckersSchemaRegistry.make_move, data)

            const roomId = this.utils.getRoomId(roomCode)
            const room = this.roomManager.get(roomId)
            if (!room) throw new RoomNotFoundException()

            const result = room.applyMove(user.id, move)
            if (result) this.sendGameResult(room)

            this.sendRoomData(room)

            return new SocketResponse({}, 'Move applied')
        } catch (error) {
            this.logger.error('MAKE MOVE ERROR :: ', error)
            throw error
        }
    }

    /**
     * Leave room
     *
     * - Steps:
     *      1. Check user authenticated
     *      2. Validate request data
     *      3. Check player is in room
     *      4. Leave player from room
     *      5. Clean up
     *      6. Send to data to opponents
     *      7. Send ok response
     */
    leaveRoom(client: Socket, data: any) {
        try {
            const user = this.utils.extractUserFromSocket(client)
            const validatedData = ZodValidation(CheckersSchemaRegistry.leave_room, data)

            const roomId = validatedData.roomCode
                ? CheckersService.ROOM_PREFIX + validatedData.roomCode
                : client.data.roomId
            if (roomId) {
                const room = this.roomManager.get(roomId)
                if (room) {
                    const player = room.players.find((player) => player.id === user.id)
                    if (player) {
                        this.roomManager.remove(room.id)
                    }
                }
            }

            this.io.to(roomId).emit(GameEventResponse.PLAYER_LEFT, new SocketResponse({}))

            client.data.roomId = null
            client.leave(roomId)

            return new SocketResponse({}, 'Room left')
        } catch (error) {
            this.logger.error('LEAVE ROOM ERROR :: ', error)
            throw error
        }
    }

    /**
     * Restart game
     *
     * - Steps:
     *      1. Check user authenticated
     *      2. Validate request data
     *      3. Run game logic
     *      4. Restart game
     *      5. Send room data to room players
     */
    restartGame(client: Socket, data: any) {
        try {
            const user = this.utils.extractUserFromSocket(client)
            const roomId = client.data.roomId
            const room = this.roomManager.get(roomId)
            if (!room) throw new RoomNotFoundException()
            room.setPlayerReady(user.id)

            if (room.isAllPlayersReady) {
                room.startGame()
                this.sendRoomData(room)
            }

            return new SocketResponse({}, 'Waiting for opponent')
        } catch (error) {
            this.logger.error('RESTART GAME ERROR :: ', error)
            throw error
        }
    }

    /**
     * Start game
     *
     * - Steps:
     *      1. Check user authenticated
     *      2. Validate request data
     *      3. Read this player and check all players are ready
     *      4. If all players are ready start game
     *      5. Send room data to room players
     */
    ready(client: Socket, data: any) {
        try {
            const user = this.utils.extractUserFromSocket(client)
            const roomId = client.data.roomId
            const room = this.roomManager.get(roomId)
            if (!room) throw new RoomNotFoundException()
            room.setPlayerReady(user.id)

            if (room.isAllPlayersReady) {
                room.startGame()
                this.sendRoomData(room)
            }

            return new SocketResponse({}, 'Waiting for opponent')
        } catch (error) {
            this.logger.error('READY ERROR :: ', error)
            throw error
        }
    }

    /**
     * End game
     * Use for force stop
     */
    endGame(client: Socket, data: any) {
        try {
            const roomId = client.data.roomId
            const room = this.roomManager.get(roomId)
            if (!room) throw new RoomNotFoundException()
            this.roomManager.remove(roomId)
            this.emitToClient(room.id, GameEventResponse.ROOM_DELETED, {}, 'Room deleted')
            return new SocketResponse({}, 'Game stopped')
        } catch (error) {
            this.logger.error('END GAME ERROR :: ', error)
            throw error
        }
    }

    private sendPlayerData(clientId: string, data: ICheckersPlayerDataResponse) {
        this.task.createImmediate(() => this.emitToClient(clientId, GameEventResponse.PLAYER_DATA, data))
    }

    private sendRoomData(room: CheckersRoom) {
        this.task.createImmediate(() =>
            this.emitToClient(room.id, GameEventResponse.PLAYER_MOVED, { room: room.serialize }),
        )
    }

    private sendGameStartedResponse(room: CheckersRoom) {
        this.task.createTimeout(
            () => this.emitToClient(room.id, GameEventResponse.GAME_STARTED, { room: room.serialize }),
            3000,
        )
    }

    private sendGameResult(room: CheckersRoom) {
        this.task.createMicrotask(() =>
            this.emitToClient(room.id, GameEventResponse.GAME_RESULT, { room: room.serialize }),
        )
    }

    private emitToClient(room: string | string[], event: string, data: any, message?: string) {
        this.io.to(room).emit(event, new SocketResponse(data, message))
    }
}
