import { TCheckersPieceColor, TInitCheckersRoomOptions } from './checkers.type'

/**
 * Default checkers board size
 */
export const DEFAULT_CHECKERS_BOARD_SIZE = 8

/**
 * Default checkers game betting coins
 */
export const DEFAULT_CHECKERS_BETTING_COINS = 100

/**
 * Default checkers game duration in seconds
 */
export const DEFAULT_CHECKERS_GAME_DURATION = 15 * 60

/**
 * Default checkers max time per turn in seconds
 */
export const DEFAULT_CHECKERS_MAX_TIME_PER_TURN = 30

/**
 * Default checkers setting options
 */
export const DEFAULT_CHECKERS_ROOM_OPTIONS: TInitCheckersRoomOptions = {
    gameType: 'multiplayer',
    maxPlayers: 2,
    roomType: 'public',
    bettingCoins: DEFAULT_CHECKERS_BETTING_COINS,
    gameDuration: DEFAULT_CHECKERS_GAME_DURATION,
    maxTimePerTurn: DEFAULT_CHECKERS_MAX_TIME_PER_TURN,
    maxNoOfMissedTurns: 0,
    boardSize: DEFAULT_CHECKERS_BOARD_SIZE,
}

/**
 * Checkers piece move direction
 */
export const CHECKERS_PIECE_MOVE_DIRECTION: Record<TCheckersPieceColor, 'forward' | 'backward'> = {
    black: 'forward',
    red: 'backward',
}
