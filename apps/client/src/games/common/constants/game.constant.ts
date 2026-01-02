export const GAME_NAME = ['Tic Tac Toe', 'Checkers', 'Chess'] as const
export const GAME_SLUG = ['checkers', 'tic-tac-toe', 'chess'] as const
export const GAME_MODE = ['online', 'local', 'ai'] as const
export const ONLINE_GAME_BETTING_COST = ['100', '200', '500', '1000'] as const
export const GAME_ONLINE_ROOM_TYPE = ['random', 'private'] as const
export const GAME_PRIVATE_ROOM_ACTION = ['create', 'join'] as const

export const INITIAL_GAME_MODE = GAME_MODE[1]
export const INITIAL_ONLINE_GAME_BETTING_COST = ONLINE_GAME_BETTING_COST[0]
export const INITIAL_ONLINE_ROOM_TYPE = GAME_ONLINE_ROOM_TYPE[0]
export const INITIAL_PRIVATE_ROOM_ACTION = GAME_PRIVATE_ROOM_ACTION[0]
