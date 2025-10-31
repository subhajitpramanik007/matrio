import type { RoomSearchProps, TGameNameSpaceToSocket } from '@/games/types'

import { useRandomRoomSearch } from '@/games/hooks/room-search'
import { DisplayRoomSearch } from '@/games/components/room-search/display-room-search'

export const RandomRoomSearch: React.FC<
  RoomSearchProps<TGameNameSpaceToSocket>
> = (props) => {
  const { data: _, ...rest } = useRandomRoomSearch(props)

  return (
    <DisplayRoomSearch
      key="random-room-search"
      loadingText="Searching for random room..."
      successText="Waiting for opponent..."
      {...rest}
    />
  )
}
