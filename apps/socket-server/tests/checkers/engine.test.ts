import { GameRulesException } from '../../src/core/utils'
import { TCheckersPosition } from '../../src/games/checkers'
import { createCheckersEngine, createCheckersPiece } from './utils'

describe('CheckersEngine', () => {
    /* -------------------------------------------------------------
     *  BOARD SIZE VALIDATION
     * ------------------------------------------------------------- */

    describe('board size validation', () => {
        test('should throw if board size < 6', () => {
            expect(() => createCheckersEngine(5)).toThrow(GameRulesException)
        })

        test('should throw if board size > 12', () => {
            expect(() => createCheckersEngine(14)).toThrow(GameRulesException)
        })

        test('should throw if board size is odd', () => {
            expect(() => createCheckersEngine(7)).toThrow(GameRulesException)
        })
    })

    /* -------------------------------------------------------------
     *  INITIALIZATION
     * ------------------------------------------------------------- */
    describe('initialization', () => {
        test('initializes pieces correctly for 8x8', () => {
            const engine = createCheckersEngine(8)

            let red = 0
            let black = 0

            const board = engine.getState().board
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    const piece = board[r][c].piece
                    if (!piece) continue
                    if (piece.color === 'red') red++
                    if (piece.color === 'black') black++
                }
            }

            expect(red).toBeGreaterThan(0)
            expect(black).toBeGreaterThan(0)
        })
    })

    /* -------------------------------------------------------------
     *  MOVES: SIMPLE
     * ------------------------------------------------------------- */

    describe('MOVES: simple', () => {
        test('should allow a simple forward move', () => {
            const engine = createCheckersEngine(8)

            // pick the first red move
            const moves = engine.getAllPossibleMovesFor('red')
            expect(moves.length).toBeGreaterThan(0)

            const simpleMove = moves.find((m) => !m.isCapture)
            expect(simpleMove).toBeDefined()

            engine.applyMove(simpleMove!)

            expect(engine.getState().currentColor).toBe('black')
        })
    })

    /* -------------------------------------------------------------
     *  INVALID MOVE
     * ------------------------------------------------------------- */

    describe('INVALID MOVE', () => {
        test('should reject move when not player turn', () => {
            const engine = createCheckersEngine(8)

            const movesForBlack = engine.getAllPossibleMovesFor('black')
            const illegalMove = movesForBlack[0]

            expect(() => engine.applyMove(illegalMove)).toThrow(GameRulesException)
        })
    })

    /* -------------------------------------------------------------
     *  CAPTURE LOGIC
     * ------------------------------------------------------------- */

    describe('CAPTURE LOGIC', () => {
        test('should detect and perform a capture', () => {
            const engine = createCheckersEngine(8)

            // custom manual board:
            // red at (5,2)
            // black at (4,3) → red can capture to (3,4)

            engine.resetBoardAsEmptyCells()

            const redPiecePos: TCheckersPosition = [5, 2]
            const blackPiecePos: TCheckersPosition = [4, 3]
            const expectRedPiecePos: TCheckersPosition = [3, 4]

            const redPiece = createCheckersPiece(redPiecePos, 'red')

            const blackPiece = createCheckersPiece(blackPiecePos, 'black')

            engine.setPiece(redPiecePos, redPiece)
            engine.setPiece(blackPiecePos, blackPiece)

            // pick the first red move
            const moves = engine.getAllPossibleMovesFor('red')
            expect(moves.length).toBe(1)
            const m = moves[0]

            expect(m.isCapture).toBe(true)
            expect(m.captures.length).toBe(1)
            expect(m.captures[0]).toEqual(blackPiecePos)

            engine.applyMove(m)

            // ensure capture happened
            expect(engine.getPiece(redPiecePos)).toBe(null)
            expect(engine.getPiece(expectRedPiecePos)?.color).toBe('red')
        })
    })

    /* -------------------------------------------------------------
     *  MULTI-CAPTURE (CHAIN)
     * ------------------------------------------------------------- */

    describe('MULTI-CAPTURE (CHAIN)', () => {
        test('should detect chained capture sequence', () => {
            const engine = createCheckersEngine(8)

            engine.resetBoardAsEmptyCells()

            // red at 5,0
            const redPiecePos: TCheckersPosition = [5, 0]
            const redPiece = createCheckersPiece(redPiecePos, 'red')
            engine.setPiece(redPiecePos, redPiece)

            // black at 4,1 AND 2,3
            const blackPiecePoss: TCheckersPosition[] = [
                [4, 1],
                [2, 3],
            ]
            // [5, 0] -> [4, 1](capture) -> [3, 2](jump) -> [2, 3](capture) -> [1, 4](landing)
            const expectRedPiecePos: TCheckersPosition = [1, 4]

            const blackPieces = blackPiecePoss.map((pos) => {
                return { pos, piece: createCheckersPiece(pos, 'black') }
            })
            blackPieces.forEach((data) => engine.setPiece(data.pos, data.piece))

            const moves = engine.getAllPossibleMovesFor('red')

            expect(moves.length).toBe(1)
            const m = moves[0]

            // should be a capture and check the captured pieces
            expect(m.isCapture).toBe(true)
            expect(m.captures.length).toBe(blackPiecePoss.length)
            expect(m.captures[0]).toEqual(blackPiecePoss[0])
            expect(m.captures[1]).toEqual(blackPiecePoss[1])

            // apply move
            engine.applyMove(m)

            // ensure capture happened
            expect(engine.getPiece(redPiecePos)).toBe(null)
            expect(engine.getPiece(expectRedPiecePos)?.color).toBe('red')

            // ensure captures were removed
            expect(engine.getPiece(blackPiecePoss[0])).toBe(null)
            expect(engine.getPiece(blackPiecePoss[1])).toBe(null)
        })
    })

    /* -------------------------------------------------------------
     *  KING PROMOTION
     * ------------------------------------------------------------- */

    describe('King promotion', () => {
        test('should promote red piece as king', () => {
            const engine = createCheckersEngine(8)

            engine.resetBoardAsEmptyCells()

            // red piece
            const from: TCheckersPosition = [1, 5]
            const to: TCheckersPosition = [0, 4]
            engine.setPiece(from, createCheckersPiece(from, 'red'))

            engine.applyMove({ from, to, captures: [], isCapture: false })

            expect(engine.getPiece(to)?.isKing).toBe(true)
        })

        test('should promote black piece as king', () => {
            const engine = createCheckersEngine(8, 'black')

            engine.resetBoardAsEmptyCells()

            // black piece
            const from: TCheckersPosition = [6, 5]
            const to: TCheckersPosition = [7, 4]
            engine.setPiece(from, createCheckersPiece(from, 'black'))

            engine.applyMove({ from, to, isCapture: false, captures: [] })

            expect(engine.getPiece(to)?.isKing).toBe(true)
        })
    })
    /* -------------------------------------------------------------
     *  TURN SWAP
     * ------------------------------------------------------------- */

    describe('TURN SWAP', () => {
        test('turn should swap after valid move', () => {
            const engine = createCheckersEngine(8)
            const move = engine.getAllPossibleMovesFor('red')[0]

            engine.applyMove(move)

            expect(engine.getState().currentColor).toBe('black')
        })
    })

    /* -------------------------------------------------------------
     *  WINNER CHECKING
     * ------------------------------------------------------------- */

    describe('WINNER CHECKING', () => {
        test('should detect winner when one color has no pieces', () => {
            const engine = createCheckersEngine(8)
            engine.resetBoardAsEmptyCells()
            // only red remains
            engine.setPiece([3, 3], createCheckersPiece([3, 3], 'red'))
            const winner = engine.checkWinner()
            expect(winner).toBe('red')
        })

        test('should detect draw when no pieces remain', () => {
            const engine = createCheckersEngine(8)
            engine.resetBoardAsEmptyCells()
            const winner = engine.checkWinner()
            expect(winner).toBe('draw')
        })
    })

    /* -------------------------------------------------------------
     *  CLONE BEHAVIOR
     * ------------------------------------------------------------- */

    describe('CLONE BEHAVIOR', () => {
        test('clone should produce deep copy', () => {
            const engine = createCheckersEngine(8)
            const clone = engine.clone()

            const move = engine.getAllPossibleMovesFor('red')[0]
            engine.applyMove(move)

            expect(engine.getState()).not.toEqual(clone.getState())
        })
    })

    /* -------------------------------------------------------------
     *  SERIALIZATION
     * ------------------------------------------------------------- */

    describe('SERIALIZATION', () => {
        test('serialize should return correct board structure', () => {
            const engine = createCheckersEngine(8)
            const state = engine.getState()

            expect(state.board.length).toBe(8)
            expect(state.board[0].length).toBe(8)
            expect(typeof state.currentColor).toBe('string')
        })
    })
})
