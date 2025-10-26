import { SocketContext } from '@/lib/contexts/socket-context'

export const useSocket = () => SocketContext.useReactContext()
