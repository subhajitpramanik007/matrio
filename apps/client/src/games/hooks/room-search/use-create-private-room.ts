import { useEffect } from 'react'
import type { RoomSearchProps, TGameNamespaceToSocket } from '@/games/types'

import { useSocketEmit } from '@/hooks/socket'
import { showGameErrorNotification } from '@/games/components/show-game-notification'

export const useCreatePrivateRoom = <T extends TGameNamespaceToSocket>({
  gameNamespace,
  emitValues = {},
  callback,
}: RoomSearchProps<T>) => {
  const createRoomRes = useSocketEmit({
    event: 'create_room',
    gameNamespace,
    onSuccess: callback,
    onError: showGameErrorNotification,
    errorMsg: 'Error creating private room',
  })

  const { emit: emitCreatePrivateRoom, ...rest } = createRoomRes

  useEffect(() => {
    emitCreatePrivateRoom({ ...emitValues })
  }, [])

  return { ...rest, roomCode: rest.data?.room.roomCode || '' }
}
