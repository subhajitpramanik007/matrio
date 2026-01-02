import type { GameSettings } from './game-settings.type'
import type { GameOnlineBettingCoins, GameOnlineRoomType, GamePrivateRoomAction } from './game.type'

export type PrivateRoomSearchType =
  `${GamePrivateRoomAction}${Capitalize<Extract<GameOnlineRoomType, 'private'>>}`

export type RoomSearch = Extract<GameOnlineRoomType, 'random'> | PrivateRoomSearchType

export type RoomSearchType = `${RoomSearch}RoomSearch`

export interface UseRoomSearch {
  roomSearch: RoomSearchType
  bettingCoins: GameOnlineBettingCoins
}

interface BaseRoomSearchProps extends GameSettings {}

export interface RandomRoomSearchProps extends Pick<BaseRoomSearchProps, 'bettingCoins'> {}

export interface CreatePrivateRoomSearchProps extends Pick<BaseRoomSearchProps, 'bettingCoins'> {}

export interface JoinPrivateRoomSearchProps {
  roomCode: string
}

export type RoomSearchProps<T extends RoomSearchType> = T extends 'random'
  ? RandomRoomSearchProps
  : T extends PrivateRoomSearchType
    ? JoinPrivateRoomSearchProps | CreatePrivateRoomSearchProps
    : never
