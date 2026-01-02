import type { Player } from '../common/types/player.type'
import type { CommonRoom, CommonRoomOptions } from '../common/types/room.type'

export interface CheckersRoom
  extends CommonRoom<CheckersPlayer, CheckersRoomMetaData, CheckersRoomOptions> {}

export type CheckersGameResult =
  | { winner: string; isDraw: false } // if winner
  | { isDraw: true } // if draw

export interface CheckersRoomMetaData {
  board: Array<CheckersCell[]>
  turn: string | null
  boardSize: number
  result: CheckersGameResult | null
}

export interface CheckersCell {
  row: number
  col: number
  piece: CheckersPiece | null
  isDark: boolean
}

export interface CheckersPiece {
  id: string
  color: CheckersPieceColor
  moveDirection: CheckersPieceMoveDirection
  isKing: boolean
}

export enum CheckersPieceColor {
  Black = 'black',
  Red = 'red',
}

export enum CheckersPieceMoveDirection {
  Backward = 'backward',
  Forward = 'forward',
}

export interface CheckersRoomOptions extends CommonRoomOptions {
  boardSize: number
}

export interface CheckersPlayer extends Player {
  pieceColor: CheckersPieceColor
  noOfCaptures: number
  noOfMissedTurns: number
}
