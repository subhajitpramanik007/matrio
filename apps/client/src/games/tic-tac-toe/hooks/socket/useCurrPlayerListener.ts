import type { TSocketResponseData } from '@/types'
import type { TOnlineTicTacToePlayer } from '@/games/tic-tac-toe/types'
import { showGameErrorNotification } from '@/games/components/show-game-notification'
import { useSocketListener } from '@/hooks/socket'

type PlayerResponse = TSocketResponseData<{ player: TOnlineTicTacToePlayer }>

export const useCurrPlayerListener = (
  setCurrPlayer: (player: TOnlineTicTacToePlayer) => void,
) =>
  useSocketListener({
    event: 'player_data',
    onSuccess: (data: PlayerResponse) => setCurrPlayer(data.player),
    onError: (error) => {
      console.error('player_data error', error)
      showGameErrorNotification(error || 'Error getting player data')
    },
    timeout: 60,
  })
