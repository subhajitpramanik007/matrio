import { PlayerStats, Player, InitPlayerData } from '@matrio/shared/types/player.type'
import { DEFAULT_PLAYER_STATS } from './player.constant'
import { PlayerMethods } from './player.type'

export class BasePlayer implements Player, PlayerMethods {
    readonly id: string
    socketId: string
    avatar?: string
    username: string
    stats: PlayerStats
    isReady = false
    isHost = false

    constructor(player: InitPlayerData) {
        this.id = player.id
        this.socketId = player.socketId
        this.username = player.username
        this.avatar = player.avatar

        this.stats = { ...DEFAULT_PLAYER_STATS }
    }

    setSocketId(socketId: string) {
        this.socketId = socketId
    }

    onReady() {
        this.isReady = true
    }

    onNotReady() {
        this.isReady = false
    }

    onGameCompleted(result: 'win' | 'draw' | 'lose') {
        this.stats.noOfGamesPlayed += 1
        this[result]()
    }

    get serialize() {
        return {
            id: this.id,
            username: this.username,
            avatar: this.avatar,
            stats: this.stats,
            isHost: this.isHost,
            isReady: this.isReady,
        }
    }

    resetStats() {
        this.stats = { ...DEFAULT_PLAYER_STATS }
    }

    reset() {
        this.resetStats()
        this.isReady = false
    }

    private win() {
        this.stats.noOfWins += 1
    }

    private lose() {
        this.stats.noOfLosses += 1
    }

    private draw() {
        this.stats.noOfDraws += 1
    }
}
