import { IRoomData } from '@/core/interfaces/room.interface'
import { ITicTacToePlayer, ITicTacToeRoomOptions } from '@/games/tic_tac_toe/TicTacToe.interface'

// Private room
type RequiredPrivateOptions = 'bettingCoins'

type OptionalPrivateOptions = Exclude<
    keyof ITicTacToeRoomOptions,
    RequiredPrivateOptions | 'roomType' | 'gameMode' | 'maxPlayers'
>

type TicTacToeRoomDTO = IRoomData<ITicTacToePlayer>

export type CreateRoomResponseDTO = TicTacToeRoomDTO
export type JoinRoomResponseDTO = TicTacToeRoomDTO
export type RandomRoomResponseDTO = TicTacToeRoomDTO
export type MakeMoveResponseDTO = Pick<TicTacToeRoomDTO, 'metadata' | 'state' | 'timestamp'>
