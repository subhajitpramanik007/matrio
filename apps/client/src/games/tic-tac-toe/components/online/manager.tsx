import * as React from 'react'
import type { RoomSearchProps, TOnlineRoomCombination } from '@/games/types'

import type { ChildrenProps } from '@/types'
import {
  useOnlineGame,
  useOnlineGameManager,
} from '@/games/tic-tac-toe/hooks/use-online-game'
import {
  CreatePrivateRoom,
  JoinPrivateRoom,
  RandomRoomSearch,
} from '@/games/components/room-search'
import { ErrorPage } from '@/components/error'

import { useGameSettings, useOnlineRoomCombination } from '@/games/hooks'
import { TicTacToeOnlineGameDataProvider } from '@/games/tic-tac-toe/context/online-game'
import { OnlineTicTacToePlayground } from '@/games/tic-tac-toe/components/online/playground'

export const OnlineTicTacToeManager: React.FC = () => {
  const { isStarted } = useOnlineGameManager()
  const { handleCombinationError, onlineRoomCombination } =
    useOnlineRoomCombination('tic-tac-toe')

  if (!isStarted) {
    return (
      <TicTacToeOnlineRoomSearch
        combination={onlineRoomCombination}
        onCombinationError={handleCombinationError}
      />
    )
  }

  return (
    <TicTacToeOnlineGameDataProvider>
      <OnlineTicTacToePlayground />
    </TicTacToeOnlineGameDataProvider>
  )
}

function TicTacToeOnlineRoomSearch({
  combination,
  onCombinationError,
}: {
  combination: TOnlineRoomCombination | null
  onCombinationError: () => void
}) {
  const { onlineGameOptions } = useGameSettings()
  const { handleUpdateRoom } = useOnlineGameManager()

  const props: RoomSearchProps<'tic_tac_toe'> = {
    gameNameSpace: 'tic_tac_toe',
    callback: handleUpdateRoom,
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
