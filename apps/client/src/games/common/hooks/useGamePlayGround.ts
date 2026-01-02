import React, { useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'

import { showGameErrorNotification, showGameNotification } from '../showGameNotification'
import { GameEventResponse } from '../gameEvent.enum'
import { useSocketListenerForGame } from './useSocketForGame'
import { useLeaveRoom } from './socket/emit/useLeaveRoom'
import { useGameSettingsActions } from '.'

export function useOpponentLeft() {
  const dispatch = useGameSettingsActions()
  const navigate = useNavigate()
  const { game } = useParams({ from: '/games/$game' })
  const { emit: leaveRoom } = useLeaveRoom()

  function cleanupRoomData() {
    leaveRoom()
    dispatch({ type: 'RESET' })
  }

  function onOpponentLeft() {
    cleanupRoomData()
    navigate({ to: '/games/$game', params: { game } })
  }

  return useSocketListenerForGame({
    event: GameEventResponse.PLAYER_LEFT,
    onSuccess: () => {
      showGameNotification({ text: 'Opponent left the room' })
      onOpponentLeft()
    },
    onError: (error) => {
      showGameErrorNotification({ text: error })
      onOpponentLeft()
    },
  })
}

export function useGetPlayerData() {
  const [playerData, setPlayerData] = useState<any>(null)

  useSocketListenerForGame({
    event: GameEventResponse.PLAYER_DATA,
    onSuccess: (data) => {
      console.log(data)
      setPlayerData(data?.player)
    },
    onError: (error) => {
      showGameErrorNotification({ text: error })
    },
  })

  return {
    playerData,
  }
}

export function useGamePlayGround() {
  const { emit: leaveRoom } = useLeaveRoom()
  const dispatch = useGameSettingsActions()

  React.useEffect(() => {
    return () => {
      leaveRoom()
      dispatch({ type: 'RESET' })
    }
  }, [])

  return {
    leaveRoom,
    dispatch,
  }
}
