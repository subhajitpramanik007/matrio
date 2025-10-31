import { SocketContext } from '@/lib/contexts/socket-context'

export const useSocket = () => {
  // console.log('[useSocket] :: useSocket')
  const context = SocketContext.useReactContext()
  // console.log('[useSocket] :: context', context)
  if (!context.socket) throw new Error('Socket not found')

  return context.socket
}
