import type { ObjectKeysWithPrefix, ObjectValueShouldBe, ReducerAction } from '@/types/utils.type'
import type {
  GameMode,
  GameOnlineBettingCoins,
  GameOnlineRoomType,
  GamePrivateRoomAction,
} from './game.type'

// Game settings state
export type GameInitialSettings = {
  gameMode: GameMode
}

export type OnlineGameSettings = {
  onlineRoomType: GameOnlineRoomType
  privateRoomType: GamePrivateRoomAction
  bettingCoins: GameOnlineBettingCoins
}

export type GameSettings = GameInitialSettings & OnlineGameSettings

export type GameSettingsState = ObjectValueShouldBe<
  ObjectKeysWithPrefix<GameSettings, 'selected'>,
  null
>

export type GameSettingsReducerAction = ReducerAction<GameSettingsState, 'SET', 'selected'>
