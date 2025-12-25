import { Player } from '@matrio/shared/types/player.type'

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
