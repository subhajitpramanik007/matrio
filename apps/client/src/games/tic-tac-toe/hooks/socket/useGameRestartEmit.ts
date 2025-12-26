import { useSocketEmit } from '@/hooks/socket'

export const useGameRestartEmit = () =>
  useSocketEmit({
    gameNamespace: 'tic_tac_toe',
    event: 'restart_game',
    errorMsg: 'Error restarting game',
    onSuccess: (data) => {
      console.log('game restarted', data)
    },
  })
