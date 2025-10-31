import { useSocketEmit } from '@/hooks/socket'

export const usePlayerMoveEmit = () =>
  useSocketEmit({
    gameNameSpace: 'tic_tac_toe',
    event: 'make_move',
    errorMsg: 'Error while making move',
  })
