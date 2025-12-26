import { useEffect } from 'react'
import type { RoomSearchProps, TGameNamespaceToSocket } from '@/games/types'

import { useSocketEmit } from '@/hooks/socket'
import { showGameErrorNotification } from '@/games/components/show-game-notification'

export const useRandomRoomSearch = ({
  callback,
  gameNamespace,
  emitValues = {},
}: RoomSearchProps<TGameNamespaceToSocket>) => {
  const randomRoomRes = useSocketEmit({
    event: 'random_room',
    gameNamespace,
    onSuccess: (data) => callback(data.room),
    onError: showGameErrorNotification,
    errorMsg: 'Error getting random room',
  })

  const { emit: emitRandomRoom, ...rest } = randomRoomRes

  useEffect(() => {
    emitRandomRoom(emitValues)
  }, [])

  return { ...rest }
}
