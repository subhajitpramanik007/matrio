import * as React from 'react'
import { useLeaveRoom } from './socket/emit/useLeaveRoom'
import { useGameSettingsActions } from './useGameSettings'

export const useCleanupGameMode = () => {
  const { emit: leaveRoom } = useLeaveRoom()
  const dispatch = useGameSettingsActions()

  React.useEffect(() => {
    return () => {
      leaveRoom()
      dispatch({ type: 'RESET' })
    }
  }, [])
}
