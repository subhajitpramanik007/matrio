import { IPlayer, IPlayerRegistry } from '@/core/interfaces/player.interface'

export class PlayerRegistry implements IPlayerRegistry {
    private readonly _players: Map<string, IPlayer> = new Map()

    addPlayer(player: IPlayer): void {
        this._players.set(player.id, player)
    }

    getPlayer(playerId: string): IPlayer | undefined {
        return this._players.get(playerId)
    }

    hasPlayer(playerId: string): boolean {
        return this._players.has(playerId)
    }

    removePlayer(playerId: string): void {
        this._players.delete(playerId)
    }

    onPlayerReconnect(playerId: string, socketId: string): void {
        const player = this.getPlayer(playerId)
        if (!player) return
        player.onReconnect(socketId)
    }

    getAllPlayers(): IPlayer[] {
        return Array.from(this._players.values())
    }

    getReadyPlayers(): IPlayer[] {
        return Array.from(this._players.values()).filter((player) => player.isReady)
    }

    get playerCount(): number {
        return this._players.size
    }

    clear(): void {
        this._players.clear()
    }
}
