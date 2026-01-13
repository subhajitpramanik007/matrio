import { BasePlayer } from '@/core/player'
import { ITicTacToePlayer, TicTacToeSymbol } from './TicTacToe.interface'
import { IBasePlayerData } from '@/core/interfaces/player.interface'

export class TicTacToePlayer extends BasePlayer implements ITicTacToePlayer {
    symbol: TicTacToeSymbol

    constructor(payload: IBasePlayerData & { symbol: TicTacToeSymbol }) {
        super(payload)
        this.symbol = payload.symbol
    }

    toJSON() {
        return {
            ...super.toJSON(),
            symbol: this.symbol,
        }
    }
}
