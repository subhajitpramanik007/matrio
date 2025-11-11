import { CHECKERS_BOARD_SIZE } from './checkers.constant'
import type {
  TCheckersBoard,
  TCheckersCell,
  TCheckersPiece,
} from './checkers.types'

export function initialCheckersBoard(): TCheckersBoard {
  const board: TCheckersBoard = []

  for (let row = 0; row < CHECKERS_BOARD_SIZE; row++) {
    const rowCells: TCheckersCell[] = []
    for (let col = 0; col < CHECKERS_BOARD_SIZE; col++) {
      const isEven = (row + col) % 2 === 0
      const cell = {
        row,
        col,
        piece: null,
        isDark: isEven,
      }

      if (isEven) {
        rowCells.push(cell)
      } else {
        let piece: TCheckersPiece | null = null
        if (row < 3) {
          piece = {
            id: `black-${row}-${col}`,
            color: 'black',
            isKing: Math.random() > 0.5,
            moveDirection: 'forward',
          }
        }
        if (row >= CHECKERS_BOARD_SIZE - 3) {
          piece = {
            id: `red-${row}-${col}`,
            color: 'red',
            isKing: Math.random() > 0.5,
            moveDirection: 'backward',
          }
        }
        rowCells.push({ ...cell, piece })
      }
    }
    board.push(rowCells)
  }

  return board
}
