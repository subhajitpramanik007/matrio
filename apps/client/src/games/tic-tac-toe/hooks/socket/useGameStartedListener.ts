import type { TOnlineTicTacToeRoom } from '@/games/tic-tac-toe/types'
import { useSocketListener } from '@/hooks/socket'

export const useGameStartedListener = (
  callback: (room: TOnlineTicTacToeRoom) => void,
) =>
  useSocketListener({
    event: 'game_started',
    onSuccess: (data) => callback(data.room),
    onError: (error) => console.error('game_started error', error),
  })
