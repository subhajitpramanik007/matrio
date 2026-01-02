import type { SocketListenerOptions, UseSocketEmitOptions } from '@/hooks/socket'
import type { GameNamespaceToSocket } from '../types'
import { useSocketEmit, useSocketListener } from '@/hooks/socket'

interface UseSocketEmitOptionsForGame<TData, TGameNamespace extends GameNamespaceToSocket>
  extends UseSocketEmitOptions<TData, TGameNamespace> {
  gameNamespace: TGameNamespace
}

export function useSocketEmitForGame<TData = any>(
  options: UseSocketEmitOptionsForGame<TData, GameNamespaceToSocket>,
) {
  return useSocketEmit(options)
}

interface SocketListenerOptionsForGame<TData> extends SocketListenerOptions<TData> {}

export function useSocketListenerForGame<TData = any>(
  options: SocketListenerOptionsForGame<TData>,
) {
  return useSocketListener(options)
}
