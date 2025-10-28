import { useReducer, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { toast } from 'sonner'

import type {
  TGameCost,
  TGameMode,
  TGameOnlineMode,
  TGamePrivateRoomAction,
} from '../types/game.types'
import { createReactContext } from '@/lib/create-react-context'
import {
  INITIAL_GAME_MODE,
  INITIAL_ONLINE_GAME_COST,
} from '@/games/game.constant'
import { useSingleGameLoaderData } from '@/games/hooks'

// types
type TGameSettings = {
  selectedMode: TGameMode
  onlineGameOptions: {
    mode: TGameOnlineMode | null
    roomType: TGamePrivateRoomAction | null
    cost: TGameCost | null
  }
}

type TGameSettingsContextActions = {
  setGameMode: (mode: TGameMode) => void
  setOnlineGameMode: (mode: TGameOnlineMode) => void
  setPrivateRoomType: (type: TGamePrivateRoomAction) => void
  setGameCost: (cost: TGameCost) => void
  onContinueToGame: () => void
  onReset: () => void
}

type TGameSettingsContextState = TGameSettings

type TGameSettingsContext = TGameSettingsContextState &
  TGameSettingsContextActions & { isVisited: boolean }

// initial state
const INITIAL_GAME_SETTINGS_STATE: TGameSettingsContextState = {
  selectedMode: INITIAL_GAME_MODE,
  onlineGameOptions: {
    mode: null,
    roomType: null,
    cost: null,
  },
}

type TGameSettingDispatchActions =
  | { type: 'SET_GAME_MODE'; payload: TGameSettings['selectedMode'] }
  | { type: 'SET_ONLINE_GAME_MODE'; payload: TGameOnlineMode }
  | { type: 'SET_ONLINE_ROOM_TYPE'; payload: TGamePrivateRoomAction }
  | { type: 'SET_GAME_COST'; payload: TGameCost }
  | { type: 'RESET' }

function GameSettingsReducer(
  state: TGameSettingsContextState,
  action: TGameSettingDispatchActions,
): TGameSettingsContextState {
  switch (action.type) {
    case 'SET_GAME_MODE':
      return {
        ...INITIAL_GAME_SETTINGS_STATE,
        selectedMode: action.payload,
      }
    case 'SET_ONLINE_GAME_MODE':
      return {
        ...state,
        onlineGameOptions: {
          mode: action.payload,
          roomType: null,
          cost: action.payload === 'public' ? INITIAL_ONLINE_GAME_COST : null,
        },
      }
    case 'SET_ONLINE_ROOM_TYPE':
      return {
        ...state,
        onlineGameOptions: {
          ...state.onlineGameOptions,
          roomType: action.payload,
          cost: action.payload === 'create' ? INITIAL_ONLINE_GAME_COST : null,
        },
      }
    case 'SET_GAME_COST':
      return {
        ...state,
        onlineGameOptions: {
          ...state.onlineGameOptions,
          cost: action.payload,
        },
      }
    case 'RESET':
      return INITIAL_GAME_SETTINGS_STATE
    default:
      return state
  }
}

export const GameSettingsContext = createReactContext<TGameSettingsContext>(
  () => {
    const navigate = useNavigate()
    const { gameSlug } = useSingleGameLoaderData()

    const [isVisited, setIsVisited] = useState<boolean>(false)
    const [state, dispatch] = useReducer(
      GameSettingsReducer,
      INITIAL_GAME_SETTINGS_STATE,
    )

    const setGameMode = (mode: TGameMode) => {
      dispatch({ type: 'SET_GAME_MODE', payload: mode })
    }

    const setOnlineGameMode = (mode: TGameOnlineMode) => {
      dispatch({ type: 'SET_ONLINE_GAME_MODE', payload: mode })
    }

    const setPrivateRoomType = (type: TGamePrivateRoomAction) => {
      dispatch({ type: 'SET_ONLINE_ROOM_TYPE', payload: type })
    }

    const setGameCost = (cost: TGameCost) => {
      dispatch({ type: 'SET_GAME_COST', payload: cost })
    }

    const onReset = () => {
      dispatch({ type: 'RESET' })
    }

    const onContinueToGame = () => {
      const {
        selectedMode,
        onlineGameOptions: { mode: onlineGameMode, roomType: onlineRoomType },
      } = state
      const isCanContinue =
        selectedMode !== 'online' ||
        onlineGameMode === 'public' ||
        onlineRoomType

      if (!isCanContinue) {
        toast.error('Please select a game mode first.')
        return
      }

      setIsVisited(true)
      navigate({
        to: '/games/$game/$mode',
        params: { game: gameSlug, mode: state.selectedMode },
      })
    }

    return {
      isVisited,
      ...state,
      setGameMode,
      setOnlineGameMode,
      setPrivateRoomType,
      setGameCost,
      onReset,
      onContinueToGame,
    }
  },
  { name: 'Games ' },
)

export const GameSettingsProvider = GameSettingsContext.Provider
