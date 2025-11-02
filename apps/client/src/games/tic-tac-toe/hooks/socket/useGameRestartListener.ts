import type { TOnlineTicTacToeRoom } from '@/games/tic-tac-toe/types'
import { useSocketListener } from '@/hooks/socket'

export const useGameRestartedListener = (
  callback: (room: TOnlineTicTacToeRoom) => void,
) =>
  useSocketListener({
    event: 'restart_game',
    onSuccess: (data) => callback(data.room),
    onError: (error) => console.error('Game restarted error', error),
  })
