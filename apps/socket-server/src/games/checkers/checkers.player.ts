import { BasePlayer, InitPlayerData } from '../../core/player'
import { TCheckersPieceColor, TCheckersPlayer } from './checkers.type'

export class CheckersPlayer extends BasePlayer implements TCheckersPlayer {
    pieceColor: TCheckersPieceColor
    noOfCaptures: number = 0
    noOfMissedTurns: number = 0

    constructor(playerData: InitPlayerData & { pieceColor: TCheckersPieceColor }) {
        const { pieceColor, ...player } = playerData
        super(player)
        this.pieceColor = pieceColor
    }

    get serialize() {
        return {
            ...super.serialize,
            pieceColor: this.pieceColor,
        }
    }
}
