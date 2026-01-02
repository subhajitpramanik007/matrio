export interface CommonRoomOptions {
  gameType: string
  maxPlayers: number
  roomType: string
  bettingCoins: number
  gameDuration: number
  maxTimePerTurn: number
  maxNoOfMissedTurns: number
}

export interface CommonRoom<TPlayer, TMetaData, TOptions = CommonRoomOptions> {
  id: string
  roomCode: string
  state: RoomState
  players: TPlayer[]
  meta: TMetaData
  options: TOptions
}

export enum RoomState {
  IDLE = 'idle',
  WAITING = 'waiting',
  READY = 'ready',
  PLAYING = 'playing',
  RESTARTING = 'restarting',
  FINISHED = 'finished',
}
