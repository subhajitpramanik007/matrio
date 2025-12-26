import { CheckersOnlineGameManager } from './manager'
import type {
  TCheckersOnlineGameResult,
  TCheckersOnlinePlayer,
  TCheckersRoom,
} from '../../checkers.types'
import { GameSocketListener } from '@/games/components/game-socket-listener'
import { OnlineGameStoreContext } from '@/games/contexts/online-game-store.context'
import { createReactContext } from '@/lib/create-react-context'

// ---------------------------- CONTEXT ----------------------------
const CheckersOnlineGameStoreContext = OnlineGameStoreContext<
  TCheckersRoom,
  TCheckersOnlinePlayer,
  TCheckersOnlineGameResult
>('checkers')

export const useCheckersOnlineGameStore =
  CheckersOnlineGameStoreContext.useReactContext

// Data state of the game
export const CheckersOnlineGameDataContext = createReactContext(
  () => {
    const {
      state: { room, player, ...rest },
    } = useCheckersOnlineGameStore()

    if (!room) throw new Error('Checkers room not found')

    if (!player) throw new Error('Checkers player not found')

    return { room, player, ...rest }
  },
  { name: 'Checkers Online Data' },
)

export const useCheckersOnlineGameData =
  CheckersOnlineGameDataContext.useReactContext

export const CheckersOnlineGame = () => {
  return (
    <CheckersOnlineGameStoreContext.Provider>
      <SocketListenerLayer />
    </CheckersOnlineGameStoreContext.Provider>
  )
}

const SocketListenerLayer = () => {
  const {
    socketEventDispatch: {
      onGameResult,
      onGameStarted,
      onGetPlayerData,
      onPlayerJoined,
      onPlayerLeft,
      onRoomDeleted,
    },
  } = useCheckersOnlineGameStore()

  return (
    <GameSocketListener
      onGameResult={onGameResult}
      onGameStarted={onGameStarted}
      onGetPlayerData={onGetPlayerData}
      onPlayerJoined={onPlayerJoined}
      onPlayerLeft={onPlayerLeft}
      onRoomDeleted={onRoomDeleted}
      onPlayerMoved={() => {}}
    >
      <CheckersOnlineGameManager />
    </GameSocketListener>
  )
}
