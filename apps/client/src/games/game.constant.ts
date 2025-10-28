import type { TGameCost, TGameMode } from './types/game.types'

export const GAME_NAME = ['Tic Tac Toe', 'Checkers', 'Chess'] as const
export const GAME_SLUG = ['tic-tac-toe', 'checkers', 'chess'] as const
export const GAME_MODE = ['online', 'local', 'ai'] as const
export const GAME_COST = ['100', '200', '500', '1000'] as const
export const GAME_ONLINE_MODE = ['public', 'private'] as const
export const GAME_PRIVATE_ROOM_ACTION = ['join', 'create'] as const

export const INITIAL_GAME_MODE: TGameMode = 'local'
export const INITIAL_ONLINE_GAME_COST: TGameCost = '100'
