import toast from 'react-hot-toast'

import { useCallback, useEffect, useRef } from 'react'

import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { createReactContext } from '@/lib/create-react-context'

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

      const accessToken = JSON.parse(
        localStorage.getItem('__matrio.atk') || '',
      )?.accessToken

      if (!accessToken) {
        console.log('No access token')
        return
      }

      socket.current = io(import.meta.env.VITE_SOCKET_URL, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        retries: 5,
        auth: { token: accessToken },
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

    return {
      socket: socket.current,
      connect: connectToSocket,
      disconnect: disconnectFromSocket,
    }
  },
  {
    name: 'Socket',
  },
)
