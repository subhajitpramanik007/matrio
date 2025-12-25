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
    gameNamespace: 'checkers',
    callback: () => {},
    emitValues: { cost: onlineGameOptions.cost },
  }

  if (!combination) {
    return (
      <ErrorPage
        error={new Error('Room Type not found. Please try again')}
        reset={onCombinationError}
      />
    )
  }

  return RoomSearchComponent(props)[combination]
}

const RoomSearchComponent = (
  props: RoomSearchProps<'checkers'>,
): Record<TOnlineRoomCombination, React.JSX.Element> => ({
  public: <RandomRoomSearch {...props} />,
  'private:join': <JoinPrivateRoom {...props} />,
  'private:create': <CreatePrivateRoom {...props} />,
})
