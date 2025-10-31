import { useEffect } from 'react'
import type { RoomSearchProps, TGameNameSpaceToSocket } from '@/games/types'

import { useSocketEmit } from '@/hooks/socket'
import { showGameErrorNotification } from '@/games/components/show-game-notification'

export const useCreatePrivateRoom = ({
  gameNameSpace,
  emitValues = {},
  callback,
}: RoomSearchProps<TGameNameSpaceToSocket>) => {
  const createRoomRes = useSocketEmit({
    event: 'create_room',
    gameNameSpace,
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
