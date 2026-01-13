import { IRoomPlayerManager } from '@/core/interfaces/room.interface'
import { IPlayer, PlayerDTO } from '../interfaces/player.interface'

export class RoomPlayerManager<TPlayer extends IPlayer> implements IRoomPlayerManager<TPlayer> {
    private _players = new Map<string, TPlayer>()

    constructor(private readonly maxPlayers: number) {}

    add(player: TPlayer): void {
        if (this._players.size >= this.maxPlayers) throw new Error('Room is full')
        this._players.set(player.id, player)
    }

    get(playerId: string): TPlayer | null {
        return this._players.get(playerId) || null
    }

    remove(playerId: string) {
        this._players.delete(playerId)
    }

    get all(): PlayerDTO[] {
        return Array.from(this._players.values()).map((player) => player.toJSON())
    }

    get count(): number {
        return this._players.size
    }

    has(playerId: string): boolean {
        return this._players.has(playerId)
    }

    clear(): void {
        this._players.clear()
    }
}
