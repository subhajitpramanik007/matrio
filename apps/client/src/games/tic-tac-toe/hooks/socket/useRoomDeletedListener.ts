import { showGameNotification } from '@/games/components/show-game-notification'
import { useSocketListener } from '@/hooks/socket'

export const useRoomDeleted = (callback: () => void) =>
  useSocketListener({
    event: 'room_deleted',
    onSuccess: () => {
      callback()
      showGameNotification('Room deleted')
    },
    onError: (error) => console.error('room_deleted error', error),
  })
