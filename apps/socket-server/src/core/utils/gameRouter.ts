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
