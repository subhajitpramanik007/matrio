import React from 'react'
import { useRouter } from '@tanstack/react-router'
import { GameEvent } from '../gameEvent.enum'

import { showGameErrorNotification, showGameNotification } from '../showGameNotification'
import { useRoomData } from '../contexts/RoomDataContext'
import { useGameSettings } from './useGameSettings'
import { useSocketEmitForGame } from './useSocketForGame'
import type { RoomSearchType } from '../types/room-search.type'
import { useGame } from '@/hooks/useGame'

export const getRoomSearchType = (): RoomSearchType | null => {
  const { selectedOnlineRoomType, selectedPrivateRoomType } = useGameSettings()

  if (!selectedOnlineRoomType) return null

  if (selectedOnlineRoomType === 'random') return 'randomRoomSearch'

  if (selectedPrivateRoomType === 'join') return `joinPrivateRoomSearch`
  if (selectedPrivateRoomType === 'create') return `createPrivateRoomSearch`

  return null
}

function useNavigateRoomSearchToGamePlay() {
  const router = useRouter()

  return () => {
    const pathname = router.latestLocation.pathname
    router.history.replace(`${pathname}/play`)
  }
}

function useRoomSearchFacade() {
  const navigateToPlayground = useNavigateRoomSearchToGamePlay()

  const { gameNamespaceToSocket } = useGame()
  const { selectedBettingCoins } = useGameSettings()
  const { setRoom } = useRoomData()

  return {
    navigateToPlayground,
    gameNamespace: gameNamespaceToSocket,
    bettingCoins: selectedBettingCoins,
    setRoom,
  }
}

export function useRandomRoomSearch() {
  const { bettingCoins, gameNamespace, navigateToPlayground, setRoom } = useRoomSearchFacade()

  const randomRoomEmit = useSocketEmitForGame({
    event: GameEvent.RANDOM_ROOM,
    errorMsg: 'Failed to join random room',
    gameNamespace,
    onSuccess(data) {
      // navigateToPlayground()
      console.log('data', data)
      setRoom(data?.room)
    },
    onError(error) {
      showGameErrorNotification({ text: error })
    },
  })

  const isEmitted = React.useRef(false)

  const { emit: randomRoomSearch } = randomRoomEmit

  React.useEffect(() => {
    if (isEmitted.current) return
    isEmitted.current = true
    randomRoomSearch({ bettingCoins })
  }, [randomRoomSearch, bettingCoins])

  return { ...randomRoomEmit }
}

export function useCreatePrivateRoomSearch() {
  const { bettingCoins, gameNamespace, setRoom, navigateToPlayground } = useRoomSearchFacade()

  const isEmitted = React.useRef(false)

  const { emit, ...rest } = useSocketEmitForGame({
    event: GameEvent.CREATE_ROOM,
    errorMsg: 'Something went wrong',
    gameNamespace,
    onSuccess(data) {
      navigateToPlayground()
      setRoom(data?.room)
    },
  })

  React.useEffect(() => {
    if (isEmitted.current) return
    isEmitted.current = true
    emit({ bettingCoins })
  }, [emit, bettingCoins])

  return { emit, ...rest }
}

const useJoinPrivateRoomSearchViaSocket = () => {
  const { gameNamespaceToSocket: gameNamespace } = useGame()
  const navigateToPlayground = useNavigateRoomSearchToGamePlay()

  return useSocketEmitForGame({
    event: GameEvent.JOIN_ROOM,
    errorMsg: '',
    gameNamespace,
    onSuccess: (data) => {
      showGameNotification({ text: 'Room joined successfully' })
      navigateToPlayground()
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export const useJoinPrivateRoomSearch = () => {
  const [roomCode, setRoomCode] = React.useState('')

  const { emit: joinPrivateRoom, ...rest } = useJoinPrivateRoomSearchViaSocket()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    joinPrivateRoom({ roomCode })
  }

  return {
    roomCode,
    setRoomCode,
    handleSubmit,
    ...rest,
  }
}
