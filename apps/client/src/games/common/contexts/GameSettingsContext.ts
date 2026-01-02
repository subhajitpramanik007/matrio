import { useReducer } from 'react'
import type {
  GameSettingsContext,
  GameSettingsReducerAction,
  GameSettingsState,
} from '@/games/common/types'
import { createReactContext } from '@/lib/create-react-context'

// type GameSettings
const INITIAL_GAME_SETTINGS_STATE: GameSettingsState = {
  selectedGameMode: null,
  selectedOnlineRoomType: null,
  selectedPrivateRoomType: null,
  selectedBettingCoins: null,
}

function gameSettingsReducer(
  state: GameSettingsState,
  { type, payload }: GameSettingsReducerAction,
): GameSettingsState {
  switch (type) {
    case 'SET_GAME_MODE':
      return {
        ...INITIAL_GAME_SETTINGS_STATE,
        selectedGameMode: payload,
      }
    case 'SET_ONLINE_ROOM_TYPE':
      return {
        ...state,
        selectedOnlineRoomType: payload,
        selectedPrivateRoomType: null,
        selectedBettingCoins: null,
      }
    case 'SET_PRIVATE_ROOM_TYPE':
      return {
        ...state,
        selectedPrivateRoomType: payload,
        selectedBettingCoins: null,
      }
    case 'SET_BETTING_COINS':
      return {
        ...state,
        selectedBettingCoins: payload,
      }
    case 'RESET':
      return {
        ...INITIAL_GAME_SETTINGS_STATE,
      }
    default:
      return state
  }
}

export const GameSettingsStateContext = createReactContext<GameSettingsContext>(
  () => {
    const [gameSettingsState, dispatch] = useReducer(
      gameSettingsReducer,
      INITIAL_GAME_SETTINGS_STATE,
    )

    return {
      gameSettingsState,
      gameSettingsDispatch: dispatch,
    }
  },
  { name: 'GameSettings' },
)

export const GameSettingsStateProvider = GameSettingsStateContext.Provider
