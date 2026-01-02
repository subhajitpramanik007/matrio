import { useSocketEmitForGame } from '../../useSocketForGame'
import { useGame } from '@/hooks/useGame'
import { GameEvent } from '@/games/common/gameEvent.enum'
import {
  showGameErrorNotification,
  showGameNotification,
} from '@/games/common/showGameNotification'

export function useLeaveRoom() {
  const { gameNamespaceToSocket } = useGame()

  return useSocketEmitForGame({
    event: GameEvent.LEAVE_ROOM,
    errorMsg: 'Something went wrong',
    gameNamespace: gameNamespaceToSocket,
    onSuccess() {
      showGameNotification({ text: 'You left the room' })
    },
    onError(error) {
      showGameErrorNotification({ text: error })
    },
  })
}
