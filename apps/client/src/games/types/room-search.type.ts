import type { TGameNamespaceToSocket, TRoomData } from '@/games/types'
import type { TOnlineTicTacToeRoom } from '../tic-tac-toe/types'

export type TRoomDataResponse<T extends TGameNamespaceToSocket> = T extends 'tic_tac_toe'
  ? TOnlineTicTacToeRoom
  : any

export type RoomSearchProps<TGameNamespace extends TGameNamespaceToSocket> = {
  gameNamespace: TGameNamespace
  emitValues?: object
  callback: (room: TRoomData<TRoomDataResponse<TGameNamespace>>['room']) => void
}
