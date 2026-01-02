import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

import type {
  GameSettingsReducerAction,
  GameSettingsState,
} from '@/games/common/types/game-settings.type'
import { GameSettingsStateContext } from '@/games/common/contexts/GameSettingsContext'
import { GameSettingLayoutContext } from '@/games/common/contexts/GameSettingLayoutContext'
import { useGame } from '@/hooks/useGame'

export const useGameSettings = (): GameSettingsState => {
  const { gameSettingsState } = GameSettingsStateContext.useReactContext()

  return { ...gameSettingsState }
}

export const useGameSettingsActions = (): React.Dispatch<GameSettingsReducerAction> => {
  const { gameSettingsDispatch } = GameSettingsStateContext.useReactContext()

  return gameSettingsDispatch
}

export const useResetGameSettings = () => {
  const dispatch = useGameSettingsActions()

  useEffect(() => {
    dispatch({ type: 'RESET' })
  }, [])
}

export const useIsGameSettingsDone = (): boolean => {
  const { isSettingDone } = GameSettingLayoutContext.useReactContext()

  return isSettingDone
}

export const useCheckGameSettingsDone = () => {
  const navigate = useNavigate()
  const { gameSlug } = useGame()
  const isDone = useIsGameSettingsDone()

  useEffect(() => {
    if (!isDone) navigate({ to: `/games/${gameSlug}` })
  }, [])
}
