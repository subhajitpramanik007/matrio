import type {
  TCheckersCell as CheckersCell,
  TCheckersBoard,
  TCheckersGameResult,
  TCheckersPlayer,
} from '@matrio/shared/checkers'
import type { RoomState } from '../types'

export type TCheckersCell = CheckersCell & {}

export type TCheckersOnlinePlayer = TCheckersPlayer
export type TCheckersOnlineRoomSettings = {
  timer: number
  maxNoOfMissedTurns: number
  multipleCapture: boolean
  boardSize: number
  gameType: 'multiplayer' | 'you-vs-ai'
  bettingCoins: number
}

export type TCheckersRoom = {
  id: string
  roomCode: string
  board: TCheckersBoard
  turn: string | null
  state: RoomState
  players: TCheckersOnlinePlayer[]
  settings: TCheckersOnlineRoomSettings
}

export type TCheckersOnlineGameResult = TCheckersGameResult
