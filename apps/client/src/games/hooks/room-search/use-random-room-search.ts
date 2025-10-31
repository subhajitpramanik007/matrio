import { useEffect } from 'react'
import type { RoomSearchProps, TGameNameSpaceToSocket } from '@/games/types'

import { useSocketEmit } from '@/hooks/socket'
import { showGameErrorNotification } from '@/games/components/show-game-notification'

export const useRandomRoomSearch = ({
  callback,
  gameNameSpace,
  emitValues = {},
}: RoomSearchProps<TGameNameSpaceToSocket>) => {
  const randomRoomRes = useSocketEmit({
    event: 'random_room',
    gameNameSpace,
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
