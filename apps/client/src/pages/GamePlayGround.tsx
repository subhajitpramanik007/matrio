import { useRoomData } from '@/games/common/contexts/RoomDataContext'
import {
  useGamePlayGround,
  useGetPlayerData,
  useOpponentLeft,
} from '@/games/common/hooks/useGamePlayGround'

const GamePlayGround = () => {
  const { room } = useRoomData()

  const { playerData } = useGetPlayerData()

  useOpponentLeft()
  useGamePlayGround()

  return (
    <div>
      <h1>GamePlayGround</h1>

      <pre>{JSON.stringify(room, null, 2)}</pre>

      <h2>Player Data</h2>
      <pre>{JSON.stringify(playerData, null, 2)}</pre>
    </div>
  )
}

export default GamePlayGround
