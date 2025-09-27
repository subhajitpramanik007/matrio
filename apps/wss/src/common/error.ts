export class SocketError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = "SocketError";
    if (code) this.code = code;
  }
}

export class SocketException extends SocketError {
  constructor(message: string, code?: string) {
    super(message, code);
    this.name = "SocketException";
  }
}

export class UnauthorizedException extends SocketException {
  constructor(message: string = "Unauthorized") {
    super(message, "UNAUTHORIZED");
  }
}

export class BadRequestException extends SocketException {
  constructor(message: string = "Bad Request") {
    super(message, "BAD_REQUEST");
  }
}

export class NotFoundException extends SocketException {
  constructor(message: string = "Not Found") {
    super(message, "NOT_FOUND");
  }
}

export class InternalServerError extends SocketException {
  constructor(message: string = "Internal Server Error") {
    super(message, "INTERNAL_SERVER_ERROR");
  }
}

export class RoomNotFoundException extends SocketException {
  constructor(message: string = "Room Not Found") {
    super(message, "ROOM_NOT_FOUND");
  }
}

export class RoomIsFullException extends SocketException {
  constructor(message: string = "Room Is Full") {
    super(message, "ROOM_IS_FULL");
  }
}

export class PlayerAlreadyInRoomException extends SocketException {
  constructor(message: string = "Player Already In Room") {
    super(message, "PLAYER_ALREADY_IN_ROOM");
  }
}
