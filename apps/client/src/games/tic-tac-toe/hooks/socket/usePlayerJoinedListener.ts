import type { TOnlineTicTacToePlayer } from '@/games/tic-tac-toe/types'
import { showGameNotification } from '@/games/components/show-game-notification'
import { useSocketListener } from '@/hooks/socket'

export const usePlayerJoinedListener = (
  callback: (player: TOnlineTicTacToePlayer) => void,
) =>
  useSocketListener({
    event: 'player_joined',
    onSuccess: (data: any) => {
      callback(data?.player)
      showGameNotification('Opponent joined')
    },
    onError: (error) => console.error('player_joined error', error),
  })
