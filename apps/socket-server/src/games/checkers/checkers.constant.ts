import {
    TCheckersBoard,
    TCheckersCell,
    TCheckersPiece,
    TCheckersPieceColor,
    TCheckersRoomOptions,
    TInitCheckersRoomOptions,
} from './checkers.type'

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
 * Checkers piece
 */
export const checkersPiece = (color: TCheckersPieceColor, position: [number, number]): TCheckersPiece => ({
    id: `${color}-${position[0]}-${position[1]}`,
    color,
    moveDirection: color === 'black' ? 'forward' : 'backward',
    isKing: false,
})

/**
 * Create a new checkers board
 */
export const newCheckersBoard = (boardSize: number) => {
    const board = [] as TCheckersBoard

    // place cells
    for (let i = 0; i < boardSize; i++) {
        const row = [] as TCheckersCell[]
        for (let j = 0; j < boardSize; j++) {
            const isEven = (i + j) % 2 === 0
            row.push({
                row: i,
                col: j,
                piece: null,
                isDark: isEven,
            })
        }
        board.push(row)
    }

    // place pieces
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const isEven = (i + j) % 2 === 0
            if (isEven) continue

            if (i < boardSize / 2 - 1) {
                board[i][j].piece = checkersPiece('black', [i, j])
            } else if (i >= boardSize / 2) {
                board[i][j].piece = checkersPiece('red', [i, j])
            }
        }
    }

    return board
}
