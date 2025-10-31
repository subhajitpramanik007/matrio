import type { RoomSearchProps, TGameNameSpaceToSocket } from '@/games/types'
import type { TJoinRoomSchema } from '@/games/game.schema'

import { useSocketEmit } from '@/hooks/socket'
import { showGameErrorNotification } from '@/games/components/show-game-notification'

export const useJoinPrivateRoom = ({
  gameNameSpace,
  emitValues = {},
  callback,
}: RoomSearchProps<TGameNameSpaceToSocket>) => {
  const joinRoomRes = useSocketEmit({
    event: 'join_room',
    gameNameSpace,
    onSuccess: callback,
    onError: showGameErrorNotification,
    errorMsg: 'Error while joining room',
  })

  const { emit: emitJoinRoom, ...rest } = joinRoomRes

  function onJoinRoom({ roomCode }: TJoinRoomSchema) {
    emitJoinRoom({ ...emitValues, roomCode })
  }

  return { ...rest, onJoinRoom }
}
