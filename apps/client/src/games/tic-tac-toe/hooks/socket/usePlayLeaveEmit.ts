import { useSocketEmit } from '@/hooks/socket'

export const usePlayLeaveEmit = (callback?: () => void) =>
  useSocketEmit({
    gameNamespace: 'tic_tac_toe',
    event: 'leave_room',
    errorMsg: 'Error while leaving game',
    onSuccess: () => callback?.(),
  })
