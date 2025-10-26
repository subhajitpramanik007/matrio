import { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from './use-socket'
import type { TSocketEventOptions, TSocketResponse } from '@/types'

type UseSocketEmitOptions<TData> = TSocketEventOptions<TData> & {}
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

  const isMountedRef = useRef(true)

  const { socket } = useSocket()

  const emit = useCallback(
    (data: TEmitValues) => {
      if (!socket) return

      function onInit() {
        if (!isMountedRef.current) return
        setState(() => ({ loading: true, data: null, error: null }))
      }

      function onFulfill(resData: TData) {
        if (!isMountedRef.current) return
        setState(() => ({ loading: false, data: resData, error: null }))
        onSuccess?.(resData)
      }

      function onFailure(message: string) {
        if (!isMountedRef.current) return
        setState(() => ({ loading: false, error: message, data: null }))
        onError?.(message)
      }

      onInit()

      try {
        const callback = (res: TSocketResponse<TData>) => {
          if (res.success) onFulfill(res.data)
          else onFailure(res.message)
        }

        socket.emit(event, data, callback)
      } catch (err) {
        if (isMountedRef.current) {
          const msg =
            err instanceof Error ? err.message : 'Failed to emit event'
          onFailure(msg)
        }
      }
    },
    [socket, event, onSuccess, onError],
  )

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  return {
    ...state,
    emit,
  }
}
