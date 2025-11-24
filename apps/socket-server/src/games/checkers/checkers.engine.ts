import { PlayerID } from '../../core/player'
import { GameRulesException } from '../../core/utils'
import { CHECKERS_PIECE_MOVE_DIRECTION } from './checkers.constant'
import {
    TCheckersBoard,
    TCheckersCell,
    TCheckersMove,
    TCheckersPiece,
    TCheckersPieceColor,
    TCheckersPosition,
} from './checkers.type'

export class CheckersEngine {
    private board: TCheckersBoard
    private turn: TCheckersPieceColor
    private boardSize: number

    constructor(size: number, startingTurn: TCheckersPieceColor) {
        if (size % 2 !== 0 || size <= 6) {
            throw new GameRulesException('Board size must be an even number greater than 6')
        }
        this.boardSize = size
        this.board = this.createEmptyBoard(size)
        this.initPiecesDefault()
        this.turn = startingTurn
    }

    /* ------- Utilities ------- */
    private createEmptyBoard(size: number): TCheckersBoard {
        const board = []
        for (let row = 0; row < size; row++) {
            const rowCells: TCheckersCell[] = []
            for (let col = 0; col < size; col++) {
                const isDark = this.isDark([row, col])
                rowCells.push({ row, col, piece: null, isDark })
            }
            board.push(rowCells)
        }
        return board
    }

    private createCheckersPiece(row: number, col: number, color: TCheckersPieceColor): TCheckersPiece {
        return {
            id: `${color}-${row}-${col}`,
            color,
            moveDirection: CHECKERS_PIECE_MOVE_DIRECTION[color],
            isKing: false,
        }
    }

    clone(): CheckersEngine {
        const newEngine = new CheckersEngine(this.boardSize, this.turn)
        newEngine.board = this.board.map((row) =>
            row.map((cell) => ({
                ...cell,
                piece: cell.piece ? { ...cell.piece } : null,
            })),
        )
        return newEngine
    }

    inBounds([row, col]: TCheckersPosition) {
        return row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize
    }

    getPiece([row, col]: TCheckersPosition): TCheckersPiece | null {
        const inBounds = this.inBounds([row, col])
        if (!inBounds) return null
        return this.board[row][col].piece
    }

    setPiece([row, col]: TCheckersPosition, piece: TCheckersPiece | null) {
        const inBounds = this.inBounds([row, col])
        if (!inBounds) throw new GameRulesException('Position out of bounds')
        this.board[row][col].piece = piece ? piece : null
    }

    swapTurn() {
        this.turn = this.turn === 'red' ? 'black' : 'red'
    }

    /* ------- Initial Setup ------- */
    private initPiecesDefault() {
        const rowsPerPlayer = Math.floor(this.boardSize / 2 - 1)

        // place pieces red
        for (let row = 0; row < rowsPerPlayer; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.isDark([row, col])) continue
                const piece = this.createCheckersPiece(row, col, 'red')
                this.setPiece([row, col], piece)
            }
        }

        // place pieces black
        for (let row = this.boardSize - rowsPerPlayer; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.isDark([row, col])) continue
                const piece = this.createCheckersPiece(row, col, 'black')
                this.setPiece([row, col], piece)
            }
        }
    }

    private isDark([row, col]: TCheckersPosition) {
        return (row + col) % 2 === 0
    }

    /* ------- Game Logic ------- */
    private directionsForPiece(piece: TCheckersPiece): TCheckersPosition[] {
        if (piece.isKing) {
            return [
                [-1, -1],
                [-1, 1],
                [1, -1],
                [1, 1],
            ]
        }
        return piece.moveDirection === 'forward'
            ? [
                  [1, -1],
                  [1, 1],
              ]
            : [
                  [-1, -1],
                  [-1, 1],
              ]
    }

    private simulateMoveFrom([row, col]: TCheckersPosition): TCheckersMove[] {
        const piece = this.getPiece([row, col])
        if (!piece) return []
        const moves: TCheckersMove[] = []

        for (const [dRow, dCol] of this.directionsForPiece(piece)) {
            const to: TCheckersPosition = [row + dRow, col + dCol]
            if (!this.inBounds(to)) continue
            if (this.getPiece(to) === null) {
                moves.push({ from: [row, col], to, captures: [], isCapture: false })
            }
        }
        return moves
    }

    private captureSequencesFrom(startingPos: TCheckersPosition): TCheckersMove[] {
        const rootPiece = this.getPiece(startingPos)
        if (!rootPiece) return []
        const moves: TCheckersMove[] = []

        const dfs = (pos: TCheckersPosition, boardSnapshot: TCheckersBoard, captures: TCheckersPosition[]) => {
            const piece = boardSnapshot[pos[0]][pos[1]].piece
            if (!piece) return

            let foundCapture = false
            const dirs = this.directionsForPiece(piece)
            for (const [dRow, dCol] of dirs) {
                const midPos: TCheckersPosition = [pos[0] + dRow, pos[1] + dCol]
                const landingPos: TCheckersPosition = [pos[0] + 2 * dRow, pos[1] + 2 * dCol]

                if (!this.inBounds(midPos) || !this.inBounds(landingPos)) continue

                const midPiece = boardSnapshot[midPos[0]][midPos[1]].piece
                const landingPiece = boardSnapshot[landingPos[0]][landingPos[1]].piece

                if (midPiece && midPiece.color !== piece.color && !landingPiece) {
                    foundCapture = true

                    const nextBoardSnapshot: TCheckersBoard = boardSnapshot.map((row) =>
                        row.map((cell) => ({ ...cell })),
                    )
                    nextBoardSnapshot[midPos[0]][midPos[1]]!.piece = null
                    nextBoardSnapshot[landingPos[0]][landingPos[1]]!.piece = nextBoardSnapshot[pos[0]][pos[1]]!.piece
                    nextBoardSnapshot[pos[0]][pos[1]]!.piece = null

                    const landingRow = landingPos[0]
                    const becomeKing =
                        !piece.isKing &&
                        (piece.moveDirection === 'forward' ? landingRow === 0 : landingRow === this.boardSize - 1)
                    if (becomeKing) {
                        nextBoardSnapshot[landingPos[0]][landingPos[1]]!.piece!.isKing = true
                    }

                    dfs(landingPos, nextBoardSnapshot, [...captures, landingPos])
                }
            }

            if (!foundCapture) {
                moves.push({ from: startingPos, to: pos, captures, isCapture: true })
            }
        }

        const boardSnapshot = this.clone().board
        dfs(startingPos, boardSnapshot, [])
        return moves
    }

    getAllPossibleMovesFor(color: TCheckersPieceColor): TCheckersMove[] {
        const captures: TCheckersMove[] = []
        const simpleMoves: TCheckersMove[] = []

        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const piece = this.getPiece([row, col])
                if (!piece || piece.color !== color) continue

                const from: TCheckersPosition = [row, col]

                const caps = this.captureSequencesFrom(from)
                if (caps.length > 0) {
                    captures.push(...caps)
                }

                const simpleMovesFrom = this.simulateMoveFrom(from)
                if (simpleMovesFrom.length > 0) {
                    simpleMoves.push(...simpleMovesFrom)
                }
            }
        }
        if (captures.length > 0) return captures

        return simpleMoves
    }

    /* ------- Validation helpers ------- */
    validateMove(move: TCheckersMove, playerId?: PlayerID): TCheckersMove {
        const piece = this.getPiece(move.from)
        if (!piece) throw new GameRulesException('Piece not found at start position')
        if (piece.color !== playerId) throw new GameRulesException('Not your turn')

        const isYourPiece = playerId && piece.ownerId && playerId === piece.ownerId
        if (!isYourPiece) throw new GameRulesException('Piece does not belong to you')

        const allValidMoves = this.getAllPossibleMovesFor(piece.color)
        const captureExists = allValidMoves.some((m) => m.isCapture)

        if (captureExists) {
            if (!move.isCapture) throw new GameRulesException('Move is not a capture')
            const match = allValidMoves.find(
                (m) =>
                    m.isCapture &&
                    this.samePosition(m.from, move.from) &&
                    this.samePosition(m.to, move.to) &&
                    this.sameCaptures(m.captures, move.captures),
            )

            if (!match) throw new GameRulesException('Invalid capture sequence')
            return match
        } else {
            const simpleMatch = allValidMoves.find(
                (m) =>
                    !m.isCapture && // not capture
                    this.samePosition(m.from, move.from) &&
                    this.samePosition(m.to, move.to),
            )

            if (!simpleMatch) throw new GameRulesException('Invalid move')
            return simpleMatch
        }
    }

    private samePosition(x: TCheckersPosition, y: TCheckersPosition) {
        return x[0] === y[0] && x[1] === y[1]
    }

    private sameCaptures(x: TCheckersPosition[], y: TCheckersPosition[]) {
        if (x.length !== y.length) return false
        for (let i = 0; i < x.length; i++) {
            if (!this.samePosition(x[i], y[i])) return false
        }
        return true
    }

    /* ------- Game Logic ------- */
    applyMove(move: TCheckersMove, playerId?: PlayerID) {
        const canonicalMove = this.validateMove(move, playerId)

        const piece = this.getPiece(canonicalMove.from)
        this.setPiece(canonicalMove.from, null)
        this.setPiece(canonicalMove.to, { ...piece! })

        for (const capture of canonicalMove.captures) {
            this.setPiece(capture, null)
        }

        const landingRow = canonicalMove.to[0]
        const becomeKing =
            !piece!.isKing &&
            (piece!.moveDirection === 'forward' ? landingRow === 0 : landingRow === this.boardSize - 1)
        if (becomeKing) {
            const piece = this.getPiece(canonicalMove.to)
            this.setPiece(canonicalMove.to, { ...piece!, isKing: true })
        }

        this.swapTurn()

        const winner = this.checkWinner()

        return { winner }
    }

    /* ------- Game Over ------- */
    checkWinner(): TCheckersPieceColor | 'draw' | null {
        const redPieces = this.countPieces('red')
        const blackPieces = this.countPieces('black')

        if (redPieces === 0 && blackPieces === 0) return 'draw'
        if (redPieces === 0) return 'black'
        if (blackPieces === 0) return 'red'

        const redCanMove = this.getAllPossibleMovesFor('red').length > 0
        const blackCanMove = this.getAllPossibleMovesFor('black').length > 0
        if (!redCanMove && !blackCanMove) return 'draw'
        if (!redCanMove) return 'black'
        if (!blackCanMove) return 'red'

        return null
    }

    private countPieces(color: TCheckersPieceColor): number {
        let count = 0
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.getPiece([row, col])?.color === color) count++
            }
        }
        return count
    }

    /* ------- Serialization ------- */
    getState(): {
        board: TCheckersCell[][]
        currentColor: TCheckersPieceColor
    } {
        return {
            board: this.serializeBoardForClient(),
            currentColor: this.turn,
        }
    }

    serializeBoardForClient(): TCheckersCell[][] {
        return this.board.map((row) => row.map((cell) => ({ ...cell })))
    }

    /* ------- Debugging ------- */
    printBoard() {
        let output = ''
        for (const row of this.board) {
            for (const cell of row) {
                output += cell.piece ? cell.piece.color[0] : ' '
            }
            output += '\n'
        }
        console.log(output)
    }
}
