import { useCallback, useState } from 'react'
import { useSocket } from './use-socket'
import type { TSocketEventOptions, TSocketResponse } from '@/types'

type UseSocketEmitOptions<TData> = TSocketEventOptions<TData> & {
  timeout?: number
}
type TEventState<TData> = {
  loading: boolean
  error: string | null
  data: TData | null
}

export const useSocketEmit = <TData, TEmitValues = any>({
  event,
  onError,
  onSuccess,
}: UseSocketEmitOptions<TData>) => {
  const [state, setState] = useState<TEventState<TData>>({
    loading: false,
    error: null,
    data: null,
  })

  const { socket } = useSocket()

  const emit = useCallback(
    (data: TEmitValues) => {
      if (!socket) return

      function onFulfill(resData: TData) {
        setState((prev) => ({ ...prev, loading: false, data: resData }))
        onSuccess?.(resData)
      }

      function onFailure(message: string) {
        setState((prev) => ({ ...prev, loading: false, error: message }))
        onError?.(message)
      }

      setState((prev) => ({ ...prev, loading: true, error: null }))

      const callback = (res: TSocketResponse<TData>) => {
        if (res.success) onFulfill(res.data)
        else onFailure(res.message)
      }

      socket.emit(event, data, callback)
    },
    [socket, event, onSuccess, onError],
  )

  return {
    ...state,
    emit,
  }
}
