import { IPlayer } from '@/core/interfaces/player.interface'
import { IGameRoom, IRoomCreationData, IRoomOptions, ISingleRoomManager } from '@/core/interfaces/room.interface'

export const TicTacToeBoardSize = 3

export type TicTacToeSymbol = 'X' | 'O'

export type TicTacToeCell = 'X' | 'O' | null

export type TicTacToeBoard = TicTacToeCell[]

export interface ITicTacToePlayer extends IPlayer {
    symbol: TicTacToeSymbol
}

export type TicTacToeGameResult =
    | { isDraw: true }
    | { isDraw: false; winnerPlayerId: string; winningCombination: number[] }

export interface ITicTacToeRoomMetadata {
    playerTurn: string | null
    board: TicTacToeBoard
    result: TicTacToeGameResult | null
}

export interface ITicTacToeRoomOptions extends IRoomOptions {}

export type ITicTacToeRoomCreationData = Pick<IRoomCreationData<ITicTacToePlayer, ITicTacToeRoomMetadata>, 'options'>

export interface ITicTacToeRoom extends IGameRoom<ITicTacToePlayer, ITicTacToeRoomMetadata> {
    makeMove(playerId: string, cell: number): TicTacToeGameResult | null
}

export interface ITicTacToeRoomManager extends ISingleRoomManager<ITicTacToeRoom> {}
