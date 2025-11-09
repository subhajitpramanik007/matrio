import { showGameNotification } from '@/games/components/show-game-notification'
import { useSocketListener } from '@/hooks/socket'

export const usePlayerLeftListener = (callback: () => void) =>
  useSocketListener({
    event: 'player_lefted',
    onSuccess: () => {
      callback()
      showGameNotification('Opponent left')
    },
    onError: (error) => console.error('player_left error', error),
  })
