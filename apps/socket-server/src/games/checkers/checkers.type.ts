import { Player, PlayerID } from '../../core/player'
import { BaseRoom, RoomId, RoomOptions } from '../../core/room'

import { CheckersPlayer } from './checkers.player'

export type TCheckersPieceColor = 'black' | 'red'

export type TCheckersPieceMoveDirection = 'forward' | 'backward' | 'both'

export type TCheckersPosition = [number, number]

export type TCheckersPiece = {
    id: string
    color: TCheckersPieceColor
    moveDirection: TCheckersPieceMoveDirection
    isKing?: boolean
    ownerId?: PlayerID
}

export type TCheckersCell = {
    row: number
    col: number
    piece: TCheckersPiece | null
    isDark: boolean
}

export type TCheckersMove = {
    from: TCheckersPosition
    to: TCheckersPosition
    captures: TCheckersPosition[]
    isCapture: boolean
}

export type TCheckersBoard = TCheckersCell[][]

export type TCheckersPlayer = Player & {
    pieceColor: TCheckersPieceColor
    noOfCaptures: number
    noOfMissedTurns: number
}

export type TCheckersGameResult =
    | {
          winner: TCheckersPlayer['id']
          isDraw: false
      }
    | {
          isDraw: true
      }

export type TCheckersRoomMetadata = {
    readonly boardSize: number
    board: TCheckersCell[][]
    turn: PlayerID | null

    result: TCheckersGameResult | null
}

export type TCheckersRoomOptions = RoomOptions

export type TCheckersRoomID = RoomId<'checkers'>

export type TCheckersRoom<
    TPlayer extends CheckersPlayer = CheckersPlayer,
    TMetadata extends TCheckersRoomMetadata = TCheckersRoomMetadata,
> = BaseRoom<TPlayer, TMetadata> & {
    get boardSize(): number
    get board(): TCheckersBoard
    get turn(): PlayerID | null
    get result(): TCheckersGameResult | null
    updateBoard(board: TCheckersBoard): void
    updateTurn(turn: PlayerID): void
    updateResult(result: TCheckersGameResult | null): void
    startGame(): void
}

/**
 * Init CheckersRoom Options
 */
export type TInitCheckersRoomOptions = Required<TCheckersRoomOptions> & {
    boardSize: number
}
