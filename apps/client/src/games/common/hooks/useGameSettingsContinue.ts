import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import type { GameSettingsProps } from '../types/game-settings-context.type'
import { useGame } from '@/hooks/useGame'

export const useGameSettingCanProcess = ({
  gameMode,
  onlineRoomType,
  privateRoomType,
  bettingCoins,
}: GameSettingsProps): boolean => {
  if (gameMode !== 'online') return true // gameMode === 'ai' || gameMode === 'local'
  if (onlineRoomType == 'public') return !!bettingCoins //

  //   for private room
  if (privateRoomType == 'join') return true
  if (privateRoomType == 'create') return !!bettingCoins

  return false
}

export const useGameSettingContinue = (settings: GameSettingsProps) => {
  const navigate = useNavigate()
  const { gameSlug } = useGame()

  function onContinue() {
    const isCanContinue = useGameSettingCanProcess(settings)
    if (isCanContinue) {
      localStorage.setItem('gameSettings', JSON.stringify(settings))

      navigate({ to: '/games/$game/$mode', params: { game: gameSlug, mode: settings.gameMode! } })
    }
  }

  useEffect(() => {
    localStorage.removeItem('gameSettings')
  }, [])

  return { onContinue }
}
