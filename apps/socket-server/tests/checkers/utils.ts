import {
    CHECKERS_PIECE_MOVE_DIRECTION,
    TCheckersPiece,
    TCheckersPieceColor,
    TCheckersPosition,
} from '../../src/games/checkers'
import { CheckersEngine } from '../../src/games/checkers/checkers.engine'

export function createCheckersPiece(
    [row, col]: TCheckersPosition,
    color: TCheckersPieceColor,
    isKing: boolean = false,
): TCheckersPiece {
    return {
        id: `${color}-${row}-${col}`,
        color,
        moveDirection: CHECKERS_PIECE_MOVE_DIRECTION[color],
        isKing,
    }
}

export function createCheckersEngine(size: number = 8, color: TCheckersPieceColor = 'red') {
    return new CheckersEngine(size, color)
}
