import { GameMode, IRoomOptions, IRoomSettingsManager, RoomType } from '@/core/interfaces/room.interface'

export class RoomSettingsManager implements IRoomSettingsManager {
    bettingCoins: number
    gameDuration: number
    maxPlayers: number
    maxTimePerTurn: number
    maxNoOfMissedTurns: number
    gameMode: GameMode
    roomType: RoomType

    constructor(private _options: IRoomOptions) {
        this.bettingCoins = _options.bettingCoins
        this.maxPlayers = _options.maxPlayers
        this.gameMode = _options.gameMode
        this.roomType = _options.roomType
        this.maxTimePerTurn = _options.maxTimePerTurn ?? 0
        this.maxNoOfMissedTurns = _options.maxNoOfMissedTurns ?? 0
        this.gameDuration = _options.gameDuration ?? 0
    }

    get options(): IRoomOptions {
        return this._options
    }

    updateOptions(patch: Partial<IRoomOptions>): void {
        this._options = { ...this._options, ...patch }
    }

    toJSON(): IRoomOptions {
        return this._options
    }

    reset(): void {
        this._options = {} as IRoomOptions
    }
}
