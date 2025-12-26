export enum SocketErrorCode {
    INTERNAL = 'INTERNAL_SERVER_ERROR',
    BAD_REQUEST = 'BAD_REQUEST',
    VALIDATION = 'VALIDATION_ERROR',
    NOT_FOUND = 'NOT_FOUND',
    FORBIDDEN = 'FORBIDDEN',
    UNAUTHORIZED = 'UNAUTHORIZED',
    ROOM_FULL = 'ROOM_FULL',
    ROOM_NOT_FOUND = 'ROOM_NOT_FOUND',
    PLAYER_IN_ROOM = 'PLAYER_ALREADY_IN_ROOM',
    UNKNOWN_EVENT = 'UNKNOWN_EVENT',
    MISSING_NAMESPACE = 'MISSING_NAMESPACE',
    GAME_RULES_ERROR = 'GAME_RULES_ERROR',
}

export class SocketError {
    success: boolean = false
    message: string
    error: SocketErrorCode = SocketErrorCode.INTERNAL

    constructor(message: string, error?: SocketErrorCode) {
        this.message = message
        if (error) this.error = error

        Object.setPrototypeOf(this, SocketError.prototype)
    }
}

export class SocketException extends SocketError {
    constructor(message: string, error?: SocketErrorCode) {
        super(message, error)
    }
}

export class UnauthorizedException extends SocketException {
    constructor(message: string = 'Unauthorized') {
        super(message, SocketErrorCode.UNAUTHORIZED)
    }
}

export class BadRequestException extends SocketException {
    constructor(message: string = 'Bad Request') {
        super(message, SocketErrorCode.BAD_REQUEST)
    }
}

export class NotFoundException extends SocketException {
    constructor(message: string = 'Not Found') {
        super(message, SocketErrorCode.NOT_FOUND)
    }
}

export class InternalServerError extends SocketException {
    constructor(message: string = 'Internal Server Error') {
        super(message, SocketErrorCode.INTERNAL)
    }
}

export class RoomNotFoundException extends SocketException {
    constructor(message: string = 'Room Not Found') {
        super(message, SocketErrorCode.ROOM_NOT_FOUND)
    }
}

export class RoomIsFullException extends SocketException {
    constructor(message: string = 'Room Is Full') {
        super(message, SocketErrorCode.ROOM_FULL)
    }
}

export class PlayerAlreadyInRoomException extends SocketException {
    constructor(message: string = 'Player Already In Room') {
        super(message, SocketErrorCode.PLAYER_IN_ROOM)
    }
}

export class ValidationException extends SocketException {
    constructor(message: string = 'Validation Error') {
        super(message, SocketErrorCode.VALIDATION)
    }
}

export class GameRulesException implements SocketException {
    error: SocketErrorCode = SocketErrorCode.GAME_RULES_ERROR
    message: string = 'Game Rules Error'
    success: boolean = false

    constructor(message?: string) {
        if (message) this.message = message
    }
}
