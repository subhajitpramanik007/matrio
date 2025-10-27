import toast from 'react-hot-toast'

import { useCallback, useEffect, useRef } from 'react'

import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { createReactContext } from '@/lib/create-react-context'
import { getAccessToken } from '@/lib/utils'

export const SocketContext = createReactContext(
  () => {
    const socket = useRef<Socket | null>(null)

    const connectToSocket = useCallback(() => {
      if (!socket.current || socket.current.connected) return
      socket.current.connect()
    }, [])

    const disconnectFromSocket = useCallback(() => {
      if (!socket.current || socket.current.disconnected) return
      socket.current.disconnect()
    }, [])

    useEffect(() => {
      if (socket.current) {
        console.log('Socket already exists')
        return
      }

      const accessToken = getAccessToken()
      if (!accessToken) {
        console.log('No access token')
        return
      }

      socket.current = io(import.meta.env.VITE_SOCKET_URL, {
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnection: true,
        reconnectionAttempts: 5,
        retries: 5,
        auth: { token: accessToken },
        transports: ['websocket'],
      })

      socket.current.on('connect', () => {
        console.log('Socket connected')
        toast.success('Welcome to the Matrio')
      })

      socket.current.on('disconnect', () => {
        console.log('Socket disconnected')
        toast.error('You have been disconnected from the Matrio')

        connectToSocket()
      })

      socket.current.on('unauthorized', (data) => {
        console.log('Socket unauthorized', data)
        toast.error('You are not authorized')
      })
    }, [connectToSocket])

    useEffect(() => {
      return () => {
        if (socket.current) {
          socket.current.off('connect')
          socket.current.off('disconnect')
          socket.current.off('unauthorized')
          socket.current.disconnect()
        }
      }
    }, [])

    return {
      socket: socket.current,
      connect: connectToSocket,
      disconnect: disconnectFromSocket,
    }
  },
  { name: 'Socket' },
)

export const SocketProvider = SocketContext.Provider
