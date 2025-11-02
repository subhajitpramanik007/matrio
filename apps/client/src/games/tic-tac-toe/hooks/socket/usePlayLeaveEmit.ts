import { useSocketEmit } from '@/hooks/socket'

export const usePlayLeaveEmit = (callback?: () => void) =>
  useSocketEmit({
    gameNameSpace: 'tic_tac_toe',
    event: 'leave_room',
    errorMsg: 'Error while leaving game',
    onSuccess: () => callback?.(),
  })
