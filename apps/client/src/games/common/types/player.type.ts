export interface Player {
  id: string
  username: string
  stats: PlayerStats
  isHost: boolean
  isReady: boolean
}

export interface PlayerStats {
  noOfGamesPlayed: number
  noOfDraws: number
  noOfLosses: number
  noOfWins: number
}
