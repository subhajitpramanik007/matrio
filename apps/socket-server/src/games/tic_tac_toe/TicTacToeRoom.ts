import { GameRoom } from '@/core/room/GameRoom'
import {
    ITicTacToePlayer,
    ITicTacToeRoom,
    ITicTacToeRoomCreationData,
    ITicTacToeRoomMetadata,
    TicTacToeGameResult,
} from './TicTacToe.interface'
import { BadRequestException, EGameNamespace } from '@/core/utils'

export class TicTacToeRoom extends GameRoom<ITicTacToePlayer, ITicTacToeRoomMetadata> implements ITicTacToeRoom {
    constructor(data: ITicTacToeRoomCreationData) {
        super({
            namespace: EGameNamespace.TIC_TAC_TOE,
            options: data.options,
            metadata: { playerTurn: null, board: [], result: null },
            players: [],
        })
    }

    makeMove(playerId: string, cell: number): TicTacToeGameResult | null {
        // check player
        const thePlayer = this.players.get(playerId)
        if (!thePlayer) throw new BadRequestException('Player not found')

        // check player turn
        const isCurrentPlayerTurn = thePlayer.id === this.meta.playerTurn
        if (!isCurrentPlayerTurn) throw new BadRequestException('Not your turn')

        // check cell is occupied
        const isCellOccupied = this.meta.board[cell] !== null
        if (isCellOccupied) throw new BadRequestException('Cell already occupied')

        // update board
        this.meta.board[cell] = thePlayer.symbol

        // check draw
        const draw = this.checkDraw()
        if (draw) return { isDraw: true }

        // check win
        const result = this.checkWin()
        if (result) return result

        this.switchToNextPlayerTurn()

        return null
    }

    private checkWin(): TicTacToeGameResult | null {
        const winningCombinations = TicTacToeRoom.WinningCombinations()

        for (const combination of winningCombinations) {
            const isWin = combination.every((cell) => this.meta.board[cell] === this.meta.playerTurn)
            if (isWin) {
                return {
                    isDraw: false,
                    winnerPlayerId: this.meta.playerTurn!,
                    winningCombination: combination,
                }
            }
        }

        return null
    }

    private checkDraw(): boolean {
        return this.meta.board.every((cell) => cell !== null)
    }

    private switchToNextPlayerTurn(): void {
        const allPlayers = this.players.all
        const currentPlayerIndex = allPlayers.findIndex((player) => player.id === this.meta.playerTurn)
        const nextPlayerIndex = (currentPlayerIndex + 1) % allPlayers.length
        this.meta.playerTurn = allPlayers[nextPlayerIndex].id
    }

    static WinningCombinations(): number[][] {
        return [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
    }
}
