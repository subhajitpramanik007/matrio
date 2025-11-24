export const GameEvents = [
    'create_room',
    'join_room',
    'random_room',
    'leave_room',
    'start_game',
    'ready',
    'make_move',
    'end_game',
    'restart_game',
    'result',
] as const

export type GameEvent = (typeof GameEvents)[number]

export const GameEventRouter: Record<GameEvent, string> = {
    create_room: 'createRoom',
    join_room: 'joinRoom',
    random_room: 'randomRoom',
    leave_room: 'leaveRoom',
    start_game: 'startGame',
    ready: 'ready',
    make_move: 'makeMove',
    end_game: 'endGame',
    restart_game: 'restartGame',
    result: 'result',
} satisfies Record<GameEvent, string>

// export type GameEvent = keyof typeof GameEventRouter
export type GameEventMethod = (typeof GameEventRouter)[GameEvent]

export enum GameEventResponse {
    PLAYER_LEFT = 'player_left',
    PLAYER_JOINED = 'player_joined',
    PLAYER_DATA = 'player_data',
    PLAYER_READY = 'player_ready',
    GAME_STARTED = 'game_started',
    GAME_RESULT = 'game_result',
    ROOM_DELETED = 'room_deleted',
    PLAYER_MOVED = 'player_moved',
}
