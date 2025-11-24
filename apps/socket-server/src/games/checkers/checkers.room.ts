import { BaseRoom } from '../../core/room'
import { PlayerID } from '../../core/player'
import { SocketErrorCode, SocketException } from '../../core/utils'

import type {
    TCheckersBoard,
    TCheckersGameResult,
    TCheckersMove,
    TCheckersPieceColor,
    TCheckersRoom,
    TCheckersRoomMetadata,
    TInitCheckersRoomOptions,
} from './checkers.type'
import { CheckersPlayer } from './checkers.player'
import { DEFAULT_CHECKERS_ROOM_OPTIONS } from './checkers.constant'
import { CheckersEngine } from './checkers.engine'

export class CheckersRoom<
        TPlayer extends CheckersPlayer = CheckersPlayer,
        TMetadata extends TCheckersRoomMetadata = TCheckersRoomMetadata,
    >
    extends BaseRoom<TPlayer, TMetadata>
    implements TCheckersRoom<TPlayer, TMetadata>
{
    private engine: CheckersEngine

    constructor(settings: Partial<TInitCheckersRoomOptions>) {
        const options = { ...settings, ...DEFAULT_CHECKERS_ROOM_OPTIONS }
        const board = [] as TCheckersBoard
        const initialMetadata = {
            board,
            turn: null,
            boardSize: options.boardSize,
            result: null,
        } as TMetadata

        super({
            namespace: 'checkers',
            options,
            meta: initialMetadata,
        })

        this.engine = new CheckersEngine(options.boardSize, 'red')
        this.syncStateFromEngine()
    }

    private syncStateFromEngine() {
        const { board, currentColor } = this.engine.getState()

        this.updateBoard(board)
        const player = this.getPlayerByColor(currentColor)
        if (player) this.updateTurn(player.id)
    }

    getPlayerByColor(color: TCheckersPieceColor): TPlayer | null {
        return this.players.find((player) => player.pieceColor === color) ?? null
    }

    /** ------------- Actions ------------- */
    startGame() {
        if (!this.isFull) throw new SocketException('Room is not full', SocketErrorCode.BAD_REQUEST)

        this.meta.turn = this.players[0].id
        this.meta.result = null
        this.touch()
    }

    applyMove(playerId: PlayerID, move: TCheckersMove) {
        const player = this.players.find((p) => p.id === playerId)
        if (!player) throw new SocketException('Player not found', SocketErrorCode.BAD_REQUEST)

        const piece = this.engine.getPiece(move.from)
        if (!piece) throw new SocketException('Piece not found', SocketErrorCode.BAD_REQUEST)
        if (piece.color !== player.pieceColor) throw new SocketException('Not your turn', SocketErrorCode.BAD_REQUEST)

        const result = this.engine.applyMove(move, player.id)
        this.syncStateFromEngine()

        if (result.winner) {
            if (result.winner === 'draw') this.updateResult({ isDraw: true })
            else this.updateResult({ isDraw: false, winner: this.getPlayerByColor(result.winner)!.id })
        }

        return this.meta.result
    }

    /** ------------- Setters ------------- */
    updateBoard(board: TCheckersBoard) {
        this.meta.board = board
        this.touch()
    }

    updateTurn(turn: PlayerID) {
        this.meta.turn = turn
        this.touch()
    }

    updateResult(result: TCheckersGameResult) {
        this.meta.result = result
        this.touch()
    }

    /** ------------- Getters ------------- */
    get boardSize() {
        return this.meta.boardSize
    }

    get board() {
        return this.meta.board
    }

    get turn() {
        return this.meta.turn
    }

    get result() {
        return this.meta.result
    }

    get serialize() {
        this.touch()

        return {
            id: this.id,
            roomCode: this.roomCode,
            state: this.state,
            players: this.players.map((p) => p.serialize),
            meta: this.meta,
            options: this.options,
        }
    }
}
