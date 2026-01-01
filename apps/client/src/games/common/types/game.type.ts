import type {
  GAME_MODE,
  GAME_NAME,
  GAME_ONLINE_ROOM_TYPE,
  GAME_PRIVATE_ROOM_ACTION,
  ONLINE_GAME_BETTING_COST,
} from '@/games/common/constants/game.constant'
import type { Slugify } from '@/lib/utils'

export enum EGame {
  CHECKERS = 'Checkers',
  TIC_TAC_TOE = 'Tic Tac Toe',
  CHESS = 'Chess',
}

export type Game = EGame
export type GameSlug = Slugify<Game, '-'>
export type GameNamespaceToSocket = Slugify<Game, '_'>

export type GameMode = (typeof GAME_MODE)[number]

export type GameOnlineBettingCoins = (typeof ONLINE_GAME_BETTING_COST)[number]
export type GameOnlineRoomType = (typeof GAME_ONLINE_ROOM_TYPE)[number]
export type GamePrivateRoomAction = (typeof GAME_PRIVATE_ROOM_ACTION)[number]
