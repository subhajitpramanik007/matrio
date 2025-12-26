import { Server, Socket } from 'socket.io'

import { RoomManager } from '@/core/room'
import { Logger, UnauthorizedException, User } from '@/core/utils'

import { CheckersRoom } from '@checkers/checkers.room'
import { CheckersPlayer } from '@checkers/checkers.player'
import { CheckersService } from '@checkers/CheckersService'
import { TCheckersPieceColor, TCheckersRoomID, TCheckersRoomOptions } from '@checkers/checkers.type'

export class CheckersServiceUtils {
    private logger = new Logger('CheckersServiceUtils')

    constructor(
        // protected readonly io: Server,
        protected readonly roomManager: RoomManager,
    ) {}

    private validatedUser(user: any): Boolean {
        if (
            user &&
            typeof user === 'object' &&
            'id' in user &&
            typeof user.id === 'string' &&
            'username' in user &&
            typeof user.username === 'string'
            // TODO: add this
            // && 'avatar' in user
        )
            return true

        return false
    }

    /**
     * Extract user from socket
     *
     * - Throw error if user not found
     * @param client - {Socket}
     * @returns-{User}
     */
    extractUserFromSocket(client: Socket): User {
        const isAuthenticated = this.validatedUser(client.user)
        if (!isAuthenticated) throw new UnauthorizedException('User not authenticated')

        return client.user
    }

    createPlayerFormSocket(client: Socket, color: TCheckersPieceColor): CheckersPlayer {
        const user = this.extractUserFromSocket(client)

        return new CheckersPlayer({
            socketId: client.id,
            id: user.id,
            username: user.username,
            avatar: user?.avatar,
            pieceColor: color,
        })
    }

    createRoomInstance(
        options: Omit<TCheckersRoomOptions, 'roomType'>,
        roomType: TCheckersRoomOptions['roomType'],
    ): CheckersRoom {
        return new CheckersRoom({ ...options, roomType })
    }

    /**
     * Join player to room
     *
     * - Add player to room
     * - Join player in socket
     * - Add player to room manager
     */
    joinPlayerToRoom(client: Socket, room: CheckersRoom, player: CheckersPlayer): CheckersRoom {
        room.addPlayer(player)
        client.join(room.id)
        client.data.roomId = room.id

        this.roomManager.add(player.id, room)
        return room
    }

    /**
     * Get room id by room code
     *
     * @param roomCode - {string}
     * @returns - {TCheckersRoomID}
     */
    getRoomId(roomCode: string): TCheckersRoomID {
        return `${CheckersService.ROOM_PREFIX}${roomCode}`
    }
}
