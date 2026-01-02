import { useRoomData } from '../../contexts/RoomDataContext'
import { RoomState } from '../../types/room.type'

interface WatchRoomStateProps {
  children: React.ReactNode
}

export const WatchRoomState: React.FC<WatchRoomStateProps> = ({ children }) => {
  const { room } = useRoomData()

  const roomState = room?.state
  if (!roomState) return children

  if (roomState === RoomState.IDLE || roomState === RoomState.WAITING) {
    return (
      <div>
        <p>Waiting for opponents</p>
        <p>{room.id}</p>
      </div>
    )
  }

  return <p>{roomState}</p>
}
