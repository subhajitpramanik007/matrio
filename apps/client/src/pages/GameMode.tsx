import * as React from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'

import type { RoomSearchType } from '@/games/common/types/room-search.type'

import {
  CreatePrivateRoomSearch,
  JoinPrivateRoomSearch,
  RandomRoomSearch,
} from '@/games/common/components/RoomSearch'
import { Button } from '@/components/ui/button'
import { getRoomSearchType } from '@/games/common/hooks/useRoomSearch'
import { WatchRoomState } from '@/games/common/components/RoomSearch/WatchRoomState'
import { Container } from '@/components/common/container'
import { useCleanupGameMode } from '@/games/common/hooks/useCleanupGameMode'

/**
 * Not found game mode
 * - Display message when game mode is not found
 */
function NotFoundGameModeSelection() {
  const navigate = useNavigate()
  const { game } = useParams({ from: '/games/$game' })

  function handleGoBack() {
    navigate({ to: `/games/$game`, params: { game } })
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4 text-center">
      <p className="text-xl">Game setting should not done properly</p>

      <Button color="orange" onClick={handleGoBack} className="w-fit">
        Go back to game settings
      </Button>
    </div>
  )
}

/**
 * Game mode manager
 */
interface GameModeManagerProps extends Record<RoomSearchType, React.ReactNode> {}

const GameModeManager: React.FC<GameModeManagerProps> = ({
  randomRoomSearch,
  createPrivateRoomSearch,
  joinPrivateRoomSearch,
}) => {
  const roomSearch = getRoomSearchType()

  if (!roomSearch) return <NotFoundGameModeSelection />

  const render: Record<RoomSearchType, React.ReactNode> = {
    createPrivateRoomSearch,
    joinPrivateRoomSearch,
    randomRoomSearch,
  }

  return render[roomSearch]
}

/**
 * Game mode page
 */
const GameMode: React.FC = () => {
  useCleanupGameMode()

  return (
    <Container className="flex items-center justify-center pt-8">
      <WatchRoomState>
        <GameModeManager
          randomRoomSearch={<RandomRoomSearch />}
          createPrivateRoomSearch={<CreatePrivateRoomSearch />}
          joinPrivateRoomSearch={<JoinPrivateRoomSearch />}
        />
      </WatchRoomState>
    </Container>
  )
}

export default GameMode
