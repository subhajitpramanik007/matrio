import { toast } from 'sonner'

import { useEffect, useRef, useState } from 'react'

import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { createReactContext } from '@/lib/create-react-context'
import { getAccessToken } from '@/lib/utils'

export const SocketContext = createReactContext(
  () => {
    // console.log('[SocketContext] :: initialized')
    const [socket, setSocket] = useState<Socket | null>(null)
    const isAlreadyDoneRef = useRef(false)

    useEffect(() => {
      // console.log('[SocketContext] :: useEffect running')
      if (isAlreadyDoneRef.current) {
        // console.warn('[SocketContext] :: useEffect already done')
        return
      }

      if (socket) {
        // console.warn('[SocketContext] :: Socket already exists')
        return
      }

      const accessToken = getAccessToken()
      if (!accessToken) {
        // console.warn('[SocketContext] :: No access token')
        return
      }

      const currentSocket = io(import.meta.env.VITE_SOCKET_URL, {
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnection: true,
        reconnectionAttempts: 5,
        auth: { token: accessToken },
        transports: ['websocket'],
      })

      isAlreadyDoneRef.current = true

      currentSocket.on('connect', () => {
        // console.log('Socket connected')
        toast.success('Welcome to the Matrio')
        setSocket(currentSocket)
      })

      currentSocket.on('disconnect', () => {
        // console.log('Socket disconnected')
        toast.error('You have been disconnected from the Matrio')
        setSocket(null)
      })

      currentSocket.on('unauthorized', (data) => {
        // console.log('Socket unauthorized', data)
        toast.error('You are not authorized')
      })

      currentSocket.on('error', (data) => {
        // console.log('Socket error', data)
        toast.error('Something went wrong')
      })

      setSocket(currentSocket)

      return () => {
        // console.log(
        // '[SocketProvider] useEffect returning and disconnecting socket',
        // )
        currentSocket.disconnect()
        currentSocket.removeAllListeners()
        setSocket(null)
      }
    }, [])

    return {
      socket,
    }
  },
  { name: 'Socket' },
)

export const SocketProvider = SocketContext.Provider
