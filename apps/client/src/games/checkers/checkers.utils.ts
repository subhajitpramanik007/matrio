import { showGameNotification } from '../components/show-game-notification'
import { CHECKERS_BOARD_SIZE } from './checkers.constant'
import type {
  TCheckersBoard,
  TCheckersCell,
  TCheckersCellPosition,
  TCheckersPiece,
  TCheckersPieceColor,
} from './checkers.types'
import { deepClone } from '@/lib/utils'

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
            moveDirection: 'forward',
            isKing: false,
          }
        }
        if (row >= CHECKERS_BOARD_SIZE - 3) {
          piece = {
            id: `red-${row}-${col}`,
            color: 'red',
            moveDirection: 'backward',
            isKing: false,
          }
        }
        rowCells.push({ ...cell, piece })
      }
    }
    board.push(rowCells)
  }

  return board
}

const MoveDirectionToOffsets: Record<TCheckersPiece['moveDirection'], number[][]> = {
  forward: [
    [1, 1],
    [1, -1],
  ],
  backward: [
    [-1, 1],
    [-1, -1],
  ],
  both: [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ],
}

export function validatedPosition(position: TCheckersCellPosition): boolean {
  const [row, col] = position
  return row >= 0 && row < CHECKERS_BOARD_SIZE && col >= 0 && col < CHECKERS_BOARD_SIZE
}

// Checkers move
function getCell(board: TCheckersBoard, position: TCheckersCellPosition): TCheckersCell {
  const [row, col] = position
  return board[row][col]
}

function getPositionOfCell(cell: TCheckersCell): TCheckersCellPosition {
  return [cell.row, cell.col]
}

function setCellHighlight(
  board: TCheckersBoard,
  position: TCheckersCellPosition,
  highlightType: TCheckersCell['highlightType'],
) {
  showGameNotification(`${highlightType} ${getPositionOfCell(getCell(board, position))}`)
  const cell = getCell(board, position)
  cell.highlightType = highlightType
}

function getOldSelectedCell(board: TCheckersBoard): TCheckersCellPosition | null {
  let position: TCheckersCellPosition | null = null
  for (const row of board) {
    for (const cell of row) {
      if (cell.highlightType === 'selected_cell') {
        position = getPositionOfCell(cell)
        break
      }
    }
  }

  return position
}

function isPiecePresent(cell: TCheckersCell): boolean {
  return !!cell.piece
}

function clearCellHighlight(board: TCheckersBoard) {
  for (const row of board) {
    for (const cell of row) {
      cell.highlightType = 'none'
    }
  }
}

function swapCellPieces(from: TCheckersCell, to: TCheckersCell) {
  const temp = from.piece
  from.piece = to.piece
  to.piece = temp
}

function calculateAvailableMoves(
  board: TCheckersBoard,
  cell: TCheckersCell,
): TCheckersCellPosition[] {
  const normalMoves: TCheckersCellPosition[] = []

  const piece = cell.piece
  if (!piece) return normalMoves

  const directions = MoveDirectionToOffsets[piece.moveDirection]

  for (const [dRow, dCol] of directions) {
    const nextRow = cell.row + dRow
    const nextCol = cell.col + dCol
    if (!validatedPosition([nextRow, nextCol])) continue

    const landingCell = getCell(board, [nextRow, nextCol])

    // cannot land on dark colored cells
    if (landingCell.isDark) continue

    if (isPiecePresent(landingCell)) continue

    normalMoves.push([nextRow, nextCol])
  }

  return normalMoves
}

function calculateCaptures(board: TCheckersBoard, cell: TCheckersCell) {
  const piece = cell.piece
  const captures: { landing: TCheckersCellPosition; jumped: TCheckersCellPosition }[] = []

  if (!piece) return captures

  const directions = MoveDirectionToOffsets[piece.moveDirection]

  for (const [dRow, dCol] of directions) {
    const enemyRow = cell.row + dRow
    const enemyCol = cell.col + dCol
    const landingRow = cell.row + dRow * 2
    const landingCol = cell.col + dCol * 2

    // ensure both enemy & landing are valid
    if (!validatedPosition([enemyRow, enemyCol])) continue
    if (!validatedPosition([landingRow, landingCol])) continue

    const enemyCell = board[enemyRow][enemyCol]
    const landingCell = board[landingRow][landingCol]

    // enemy exists AND is opposite color AND landing is empty
    if (
      enemyCell.piece &&
      enemyCell.piece.color !== piece.color &&
      !landingCell.piece &&
      !landingCell.isDark
    ) {
      captures.push({
        landing: [landingRow, landingCol],
        jumped: [enemyRow, enemyCol],
      })
    }
  }

  return captures
}

export function checkersMove(
  board: TCheckersBoard,
  currentPlayerColor: TCheckersPieceColor,
  clickedPos: TCheckersCellPosition,
): [TCheckersBoard, boolean] {
  const newBoard = deepClone(board)
  const prevSelected = getOldSelectedCell(newBoard)
  const clickedCell = getCell(newBoard, clickedPos)

  // Selecting a piece
  if (clickedCell.piece?.color === currentPlayerColor) {
    clearCellHighlight(newBoard)

    setCellHighlight(newBoard, clickedPos, 'selected_cell')

    const captures = calculateCaptures(newBoard, clickedCell)
    const normalMoves = calculateAvailableMoves(newBoard, clickedCell)

    // If capturing is possible → force capture
    if (captures.length > 0) {
      captures.forEach(({ landing, jumped }) => {
        setCellHighlight(newBoard, landing, 'possible_move')
        setCellHighlight(newBoard, jumped, 'possible_capture')
      })
    } else {
      normalMoves.forEach((mv) => setCellHighlight(newBoard, mv, 'possible_move'))
    }

    return [newBoard, false]
  }

  // if selected, try to move
  if (prevSelected) {
    const fromCell = getCell(newBoard, prevSelected)
    const piece = fromCell.piece
    if (!piece) return [newBoard, false]

    const captures = calculateCaptures(newBoard, fromCell)

    // capture possible
    if (captures.length > 0) {
      const match = captures.find(
        (c) => c.landing[0] === clickedPos[0] && c.landing[1] === clickedPos[1],
      )

      if (match) {
        const jumpedCell = getCell(newBoard, match.jumped)
        const landingCell = getCell(newBoard, match.landing)

        // move piece
        landingCell.piece = piece
        fromCell.piece = null
        jumpedCell.piece = null

        // king promotion
        promoteIfNeeded(landingCell)

        clearCellHighlight(newBoard)

        // more jumps possible
        const followUp = calculateCaptures(newBoard, landingCell)
        if (followUp.length > 0) {
          // force continuation
          setCellHighlight(newBoard, match.landing, 'selected_cell')
          followUp.forEach(({ landing, jumped }) => {
            setCellHighlight(newBoard, landing, 'possible_move')
            setCellHighlight(newBoard, jumped, 'possible_capture')
          })
          return [newBoard, false] // still same player's turn
        }

        return [newBoard, true] // jump completed
      }

      clearCellHighlight(newBoard)
      return [newBoard, false]
    }

    // normal moves
    const normalMoves = calculateAvailableMoves(newBoard, fromCell)
    const isAllowed = normalMoves.some(([r, c]) => r === clickedPos[0] && c === clickedPos[1])

    if (isAllowed) {
      const toCell = getCell(newBoard, clickedPos)
      toCell.piece = piece
      fromCell.piece = null

      // king promotion
      promoteIfNeeded(toCell)

      clearCellHighlight(newBoard)
      return [newBoard, true]
    }

    clearCellHighlight(newBoard)
    return [newBoard, false]
  }

  clearCellHighlight(newBoard)
  return [newBoard, false]
}

function promoteIfNeeded(cell: TCheckersCell) {
  const piece = cell.piece
  if (!piece) return

  if (
    (piece.moveDirection === 'forward' && cell.row === CHECKERS_BOARD_SIZE - 1) ||
    (piece.moveDirection === 'backward' && cell.row === 0)
  ) {
    piece.isKing = true
    piece.moveDirection = 'both'
  }
}

export function calculateWinner(board: TCheckersBoard): TCheckersPieceColor | null {
  const redPieces = board.flat().filter((cell) => cell.piece?.color === 'red')
  const blackPieces = board.flat().filter((cell) => cell.piece?.color === 'black')

  if (redPieces.length === 0) return 'black'
  if (blackPieces.length === 0) return 'red'

  return null
}
