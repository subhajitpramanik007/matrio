import React from 'react'

import type { CommonRoom } from '../types/room.type'
import { createReactContext } from '@/lib/create-react-context'

export const RoomDataContext = createReactContext(
  () => {
    const [room, setRoom] = React.useState<CommonRoom<any, any, any> | null>(null)

    return { room, setRoom }
  },
  { name: 'RoomData' },
)

export const RoomDataContextProvider = RoomDataContext.Provider
export const useRoomData = RoomDataContext.useReactContext
