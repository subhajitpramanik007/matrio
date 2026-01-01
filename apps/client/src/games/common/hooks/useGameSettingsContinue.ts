import { useEffect } from 'react'
import { useRouter } from '@tanstack/react-router'
import type { GameSettingsProps } from '../types/game-settings-context.type'

export const useGameSettingCanProcess = ({
  gameMode,
  onlineRoomType,
  privateRoomType,
  bettingCoins,
}: GameSettingsProps): boolean => {
  if (gameMode !== 'online') return true // gameMode === 'ai' || gameMode === 'local'
  if (onlineRoomType == 'random') return !!bettingCoins //

  //   for private room
  if (privateRoomType == 'join') return true
  if (privateRoomType == 'create') return !!bettingCoins

  return false
}

export const useGameSettingContinue = (settings: GameSettingsProps) => {
  const router = useRouter()

  function onContinue() {
    const isCanContinue = useGameSettingCanProcess(settings)
    if (!isCanContinue) return

    localStorage.setItem('gameSettings', JSON.stringify(settings))

    const { gameMode } = settings
    const isOnlineGame = gameMode && gameMode === 'online'
    const pathname = router.latestLocation.pathname

    if (isOnlineGame) router.navigate({ to: `${pathname}/online` })
    else router.navigate({ to: `${pathname}/${gameMode}/play` })
  }

  useEffect(() => {
    localStorage.removeItem('gameSettings')
  }, [])

  return { onContinue }
}
