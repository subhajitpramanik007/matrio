import type {
  GAME_COST,
  GAME_MODE,
  GAME_NAME,
  GAME_ONLINE_MODE,
  GAME_PRIVATE_ROOM_ACTION,
  GAME_SLUG,
} from '@/games/game.constant'

export type TGameMode = (typeof GAME_MODE)[number]
export type TGameName = (typeof GAME_NAME)[number]
export type TGameSlug = (typeof GAME_SLUG)[number]
export type TGameOnlineMode = (typeof GAME_ONLINE_MODE)[number]
export type TGamePrivateRoomAction = (typeof GAME_PRIVATE_ROOM_ACTION)[number]
export type TGameCost = (typeof GAME_COST)[number]
