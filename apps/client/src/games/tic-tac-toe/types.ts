const TIC_TAC_TOE_SYMBOLS = ['X', 'O'] as const

export type TicTacToeSymbol = (typeof TIC_TAC_TOE_SYMBOLS)[number]
export type TicTacToeCell = TicTacToeSymbol | null

export type TicTacToeBoard = TicTacToeCell[][]

export type TOnlineTicTacToePlayer = {
  id: string
  symbol: TicTacToeSymbol
  username: string
  isReady: boolean
  isHost: boolean
  noOfGamesPlayed: number
  noOfWins: number
  noOfLosses: number
  noOfDraws: number
  score: number
}

export interface TOnlineRoomSettings {
  timer: number
  maxPlayers: number
}

export type TOnlineTicTacToeRoom<TRoomCode extends string = string> = {
  id: `tic-tac-toe_${TRoomCode}`
  roomCode: TRoomCode
  game: string
  players: TOnlineTicTacToePlayer[]
  state: string
  turn: string | null
  settings: TOnlineRoomSettings
  board: TicTacToeCell[]
}

export type TOnlineTicTacToeRoomData = {
  room: TOnlineTicTacToeRoom
}

export type TOnlineGameResult = {
  winnerId: string | null
  isDraw: boolean
  winningLine: number[]
}
