import * as React from 'react'
import { useOnlineTicTacToeFactory } from '@/games/tic-tac-toe/context/online-game'
import {
  useCurrPlayerListener,
  useGameRestartedListener,
  useGameResultListener,
  useGameStartedListener,
  usePlayerJoinedListener,
  usePlayerLeftListener,
  usePlayerMoved,
  useRoomDeleted,
} from '@/games/tic-tac-toe/hooks/socket'

interface SocketListenerLayerProps {
  children: React.ReactNode
}

export const TicTacToeSocketListenerLayer: React.FC<
  SocketListenerLayerProps
> = ({ children }) => {
  const {
    socketEventDispatch: {
      onGameResult,
      onGameStarted,
      onGetPlayerData,
      onPlayerJoined,
      onPlayerLeft,
      onPlayerMoved,
      onRoomDeleted,
    },
  } = useOnlineTicTacToeFactory()

  useCurrPlayerListener(onGetPlayerData)
  useGameResultListener(onGameResult)
  useGameStartedListener(onGameStarted)
  usePlayerJoinedListener(onPlayerJoined)
  usePlayerLeftListener(onPlayerLeft)
  usePlayerMoved(onPlayerMoved)
  useRoomDeleted(onRoomDeleted)

  useGameRestartedListener(onGameStarted)

  return <React.Fragment>{children}</React.Fragment>
}
