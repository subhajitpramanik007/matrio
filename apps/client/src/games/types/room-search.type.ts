import type { TGameNameSpaceToSocket, TRoomData } from '@/games/types'
import type { TOnlineTicTacToeRoom } from '../tic-tac-toe/types'

export type TRoomDataResponse<T extends TGameNameSpaceToSocket> =
  T extends 'tic_tac_toe' ? TOnlineTicTacToeRoom : any

export type RoomSearchProps<TGameNameSpace extends TGameNameSpaceToSocket> = {
  gameNameSpace: TGameNameSpace
  emitValues?: object
  callback: (room: TRoomData<TRoomDataResponse<TGameNameSpace>>['room']) => void
}
