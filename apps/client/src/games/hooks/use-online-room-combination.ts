import { useNavigate } from '@tanstack/react-router'
import { useGameSettings } from './use-game-settings'
import type { TGameSlug, TOnlineRoomCombination } from '../types'

export const useOnlineRoomCombination = (
  gameSlug: TGameSlug,
): {
  onlineRoomCombination: TOnlineRoomCombination | null
  handleCombinationError: () => void
} => {
  const navigate = useNavigate()
  const {
    onlineGameOptions: { mode, roomType },
  } = useGameSettings()

  function handleCombinationError() {
    navigate({ to: '/games/$game', params: { game: gameSlug } })
  }

  const onlineRoomCombination: TOnlineRoomCombination | null =
    mode === 'private' && roomType
      ? `private:${roomType}`
      : mode === 'public'
        ? 'public'
        : null

  return {
    onlineRoomCombination,
    handleCombinationError,
  }
}
