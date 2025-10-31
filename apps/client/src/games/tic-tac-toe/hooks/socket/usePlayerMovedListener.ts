import type { TicTacToeCell } from '@/games/tic-tac-toe/types'
import { useSocketListener } from '@/hooks/socket'

type PlayerMoveData = {
  board: TicTacToeCell[]
  nextTurn: string
}

export const usePlayerMoved = (callback: (data: PlayerMoveData) => void) =>
  useSocketListener({
    event: 'player_moved',
    onSuccess: (data) => callback(data),
    onError: (error) => console.error('player_moved error', error),
  })
