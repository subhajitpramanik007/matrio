import type { ObjectValueShouldBe, ToChangeHandlers } from '@/types/utils.type'
import type {
  GameSettings,
  GameSettingsReducerAction,
  GameSettingsState,
} from './game-settings.type'

export type GameSettingsContext = {
  gameSettingsState: GameSettingsState
  gameSettingsDispatch: React.Dispatch<GameSettingsReducerAction>
}

export interface GameSettingsProps extends ObjectValueShouldBe<GameSettings, null> {}

export interface GameSettingsActionsProps extends ToChangeHandlers<GameSettings> {}

export interface GameModeSelectionProps
  extends Pick<GameSettingsProps, 'gameMode'>,
    Pick<GameSettingsActionsProps, 'onChangeGameMode'> {}

export interface GameBettingCoinsSelectionProps
  extends Pick<GameSettingsProps, 'onlineRoomType' | 'privateRoomType' | 'bettingCoins'>,
    Pick<GameSettingsActionsProps, 'onChangeBettingCoins'> {}

export interface GameOnlineRoomSelectionProps
  extends Pick<GameSettingsProps, 'gameMode' | 'onlineRoomType'>,
    Pick<GameSettingsActionsProps, 'onChangeOnlineRoomType'> {}

export interface GamePrivateRoomSelectionProps
  extends Pick<GameSettingsProps, 'gameMode' | 'onlineRoomType' | 'privateRoomType'>,
    Pick<GameSettingsActionsProps, 'onChangePrivateRoomType'> {}

export interface GameSettingContinueButtonProps extends GameSettingsProps {}
