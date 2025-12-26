import type {
  GAME_COST,
  GAME_MODE,
  GAME_NAME,
  GAME_ONLINE_MODE,
  GAME_PRIVATE_ROOM_ACTION,
  GAME_SLUG,
} from '@/games/game.constant'
import type { Slugify } from '@/lib/utils'
import type { TOnlineTicTacToePlayer, TOnlineTicTacToeRoom } from '../tic-tac-toe/types'

export type TGameMode = (typeof GAME_MODE)[number]
export type TGameName = (typeof GAME_NAME)[number]
export type TGameSlug = (typeof GAME_SLUG)[number]
export type TGameOnlineMode = (typeof GAME_ONLINE_MODE)[number]
export type TGamePrivateRoomAction = (typeof GAME_PRIVATE_ROOM_ACTION)[number]
export type TGameCost = (typeof GAME_COST)[number]

export type TGameModeCombination = `${TGameSlug}:${TGameMode}`

export type TOnlineRoomCombination =
  | Extract<TGameOnlineMode, 'public'> // 'public'
  | `${Extract<TGameOnlineMode, 'private'>}:${TGamePrivateRoomAction}`

// tic_tac_toe, checkers, chess
export type TGameNamespaceToSocket = Slugify<TGameName, '_'>

export type TRoomData<T> = { room: T }

// Game events
export const GameEventsRequest = {
  CREATE_ROOM: 'create_room', // create room
  JOIN_ROOM: 'join_room', // join room
  RANDOM_ROOM: 'random_room', // random room
  LEAVE_ROOM: 'leave_room', // leave room
  START_GAME: 'start_game', // start game
  READY: 'player_ready', // player ready
  MAKE_MOVE: 'make_move', // make move
  END_GAME: 'end_game', // end game
  RESTART_GAME: 'restart_game', // restart game
  RESULT: 'result', // result
} as const

export const GameEventsResponse = {
  PLAYER_LEFTED: 'player_lefted', // player left
  PLAYER_JOINED: 'player_joined', // player joined
  PLAYER_DATA: 'player_data', // player data
  PLAYER_READY: 'player_ready', // player ready
  GAME_STARTED: 'game_started', // game started
  GAME_RESULT: 'game_result', // game result
  ROOM_DELETED: 'room_deleted', // room deleted
  PLAYER_MOVED: 'player_moved', // player moved
} as const

export type TGameEventRequest = (typeof GameEventsRequest)[keyof typeof GameEventsRequest]
export type TGameEventResponse = (typeof GameEventsResponse)[keyof typeof GameEventsResponse]

export type TGameStatus = 'loading' | 'waiting' | 'playing' | 'finished' | 'deleted'

export type TOnlineRoom<T extends TGameSlug> = T extends 'tic-tac-toe' ? TOnlineTicTacToeRoom : any

export type TOnlinePlayer<T extends TGameSlug> = T extends 'tic-tac-toe'
  ? TOnlineTicTacToePlayer
  : any

export enum RoomState {
  IDLE = 'idle',
  WAITING = 'waiting',
  PLAYING = 'playing',
  ENDED = 'ended',
}
