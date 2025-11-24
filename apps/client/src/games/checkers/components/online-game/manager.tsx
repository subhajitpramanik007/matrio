import * as React from 'react'
import { CheckersOnlinePlayground } from './playground'
import { CheckersOnlineGameDataContext, useCheckersOnlineGameStore } from './online-game'
import type { RoomSearchProps, TOnlineRoomCombination } from '@/games/types'

import {
  CreatePrivateRoom,
  JoinPrivateRoom,
  RandomRoomSearch,
} from '@/games/components/room-search'
import { ErrorPage } from '@/components/error'
import { useGameSettings, useOnlineRoomCombination } from '@/games/hooks'

export const CheckersOnlineGameManager: React.FC = () => {
  const {
    state: { gameStarted },
  } = useCheckersOnlineGameStore()

  const { onlineRoomCombination, handleCombinationError } = useOnlineRoomCombination('checkers')

  if (!gameStarted) {
    return (
      <CheckersOnlineRoomSearch
        combination={onlineRoomCombination}
        onCombinationError={handleCombinationError}
      />
    )
  }

  return (
    <CheckersOnlineGameDataContext.Provider>
      <CheckersOnlinePlayground />
    </CheckersOnlineGameDataContext.Provider>
  )
}

function CheckersOnlineRoomSearch({
  combination,
  onCombinationError,
}: {
  combination: TOnlineRoomCombination | null
  onCombinationError: () => void
}) {
  const { onlineGameOptions } = useGameSettings()

  const props: RoomSearchProps<'checkers'> = {
    gameNameSpace: 'checkers',
    callback: (room) => {
      console.log(room)
    },
    emitValues: { cost: onlineGameOptions.cost },
  }

  switch (combination) {
    case 'public':
      return <RandomRoomSearch {...props} />
    case 'private:join':
      return <JoinPrivateRoom {...props} />
    case 'private:create':
      return <CreatePrivateRoom {...props} />
    default:
      return (
        <ErrorPage
          error={new Error('Room Type not found. Please try again')}
          reset={onCombinationError}
        />
      )
  }
}
