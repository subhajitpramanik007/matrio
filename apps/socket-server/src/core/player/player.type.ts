export type PlayerStats = {
    noOfGamesPlayed: number
    noOfWins: number
    noOfLosses: number
    noOfDraws: number
}

export type InitPlayerData = {
    id: string
    socketId: string
    username: string
    avatar?: string
}

export type Player = InitPlayerData & {
    stats: PlayerStats
    isReady?: boolean
    isHost?: boolean
}

export type PlayerID = Player['id']

export type PlayerWithoutStats = Omit<Player, 'stats'>

export type PlayerWithoutSocketId = Omit<Player, 'socketId'>

export interface PlayerMethods {
    setSocketId(socketId: string): void
    onReady(): void
    onNotReady(): void
    resetStats(): void
    onGameCompleted(result: 'win' | 'draw' | 'lose'): void
    get serialize(): PlayerWithoutSocketId
    reset(): void
}
