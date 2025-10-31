import { useEffect } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'

import { useGameSettings } from '@/games/hooks/use-game-settings'

export const useCheckSettingDone = (callback?: () => void) => {
  const { game } = useParams({ from: '/games/$game/$mode' })
  const navigate = useNavigate()

  const { isVisited } = useGameSettings()

  useEffect(() => {
    callback?.()
    if (isVisited) return

    navigate({ to: '/games/$game', params: { game } })
  }, [])
}
