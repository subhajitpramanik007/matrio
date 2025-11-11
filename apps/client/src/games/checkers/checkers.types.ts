import type { RoomState } from '../types'

export type TCheckersPieceColor = 'red' | 'black'
export type TCheckersCellPosition = [row: number, col: number]
export type TCheckersRoomId = string

export type TCheckersPiece = {
  id: string
  color: TCheckersPieceColor
  moveDirection: 'forward' | 'backward'
  isKing: boolean
}

export type TCheckersCell = {
  row: number
  col: number
  isDark: boolean
  piece: TCheckersPiece | null
}

export type TCheckersBoard = TCheckersCell[][]

export type TCheckersOnlinePlayer = {
  id: string
  pieceColor: TCheckersPieceColor
  username: string
  isReady: boolean
  isHost: boolean
  noOfGamesPlayed: number
  noOfWins: number
  noOfLosses: number
  noOfDraws: number
  score: number
}

export type TCheckersOnlineRoomSettings = {
  timer: number
  maxNoOfMissedTurns: number
  multipleCapture: boolean
  boardSize: number
  gameType: 'multiplayer' | 'you-vs-ai'
  bettingCoins: number
}

export type TCheckersRoom = {
  id: TCheckersRoomId
  roomCode: string
  board: TCheckersBoard
  turn: string | null
  state: RoomState
  players: TCheckersOnlinePlayer[]
  settings: TCheckersOnlineRoomSettings
}

export type TCheckersOnlineGameResult = {
  winnerId: string
}
