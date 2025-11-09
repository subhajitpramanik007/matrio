import * as React from 'react'
import {
  useCurrPlayerListener,
  useGameRestartedListener,
  useGameResultListener,
  useGameStartedListener,
  usePlayerJoinedListener,
  usePlayerLeftListener,
  usePlayerMoved,
  useRoomDeleted,
} from '@/games/hooks/socket/listener'

type GameSocketListenerProps<
  TOnlineRoom = any,
  TOnlinePlayer = any,
  TOnlineGameResult = any,
> = {
  children: React.ReactNode
  onGetPlayerData: (player: TOnlinePlayer) => void
  onGameResult: (data: TOnlineGameResult) => void
  onGameStarted: (room: TOnlineRoom) => void
  onPlayerJoined: () => void
  onPlayerLeft: () => void
  onPlayerMoved: <T = any>(data: T) => void
  onRoomDeleted: () => void
}

export const GameSocketListener: React.FC<GameSocketListenerProps> = ({
  children,
  onGetPlayerData,
  onGameResult,
  onGameStarted,
  onPlayerJoined,
  onPlayerLeft,
  onPlayerMoved,
  onRoomDeleted,
}) => {
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
