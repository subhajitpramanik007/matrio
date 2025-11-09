import type { TSocketResponseData } from '@/types'
import { showGameErrorNotification } from '@/games/components/show-game-notification'
import { useSocketListener } from '@/hooks/socket'

export const useCurrPlayerListener = <TOnlinePlayer = any>(
  setCurrPlayer: (player: TOnlinePlayer) => void,
) =>
  useSocketListener({
    event: 'player_data',
    onSuccess: (data: TSocketResponseData<{ player: TOnlinePlayer }>) => {
      setCurrPlayer(data.player)
    },
    onError: (error) => {
      console.error('player_data error', error)
      showGameErrorNotification(error || 'Error getting player data')
    },
    timeout: 60,
  })
