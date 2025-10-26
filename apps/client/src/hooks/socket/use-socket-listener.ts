import { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from './use-socket'
import type { TSocketEventOptions, TSocketResponse } from '@/types'

type ListenerOptions<TData> = TSocketEventOptions<TData> & {
  timeout?: number | false
}

export const useSocketListener = <TData>(options: ListenerOptions<TData>) => {
  const { event, onSuccess, onError, timeout = false } = options

  const { socket } = useSocket()

  const [state, setState] = useState<{
    loading: boolean
    error: string | null
    data: TData | null
  }>({
    loading: false,
    error: null,
    data: null,
  })
  const [aborted, setAborted] = useState(false)

  const abortCtrlRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!socket) return

    abortCtrlRef.current = new AbortController()

    function onFulfill(resData: TData) {
      setState((prev) => ({ ...prev, loading: false, data: resData }))
      onSuccess?.(resData)
    }

    function onFailure(message: string | null = null) {
      setState((prev) => ({ ...prev, loading: false, error: message }))
      onError?.(message ?? 'Request failed')
    }

    setState((prev) => ({ ...prev, loading: true, error: null }))
    setAborted(false)

    function onTimeOut() {
      if (!abortCtrlRef.current?.signal.aborted) {
        abortCtrlRef.current?.abort()
        onFailure('Request timed out')
        setAborted(true)
      }
    }
    const timeoutId = timeout ? setTimeout(onTimeOut, timeout) : undefined

    const handler = (res: TSocketResponse<TData>) => {
      if (abortCtrlRef.current?.signal.aborted) {
        setState((prev) => ({ ...prev, loading: false }))
        return
      }

      if (res.success) onFulfill(res.data)
      else onFailure(res.message)
    }

    socket.on(event, handler)

    return () => {
      clearTimeout(timeoutId)
      socket.off(event, handler)
      abortCtrlRef.current?.abort()
      setAborted(true)
    }
  }, [event, socket, onSuccess, onError])

  const abort = useCallback(() => {
    abortCtrlRef.current?.abort()
    setAborted(true)
    setState((prev) => ({ ...prev, loading: false, error: 'Request aborted' }))
  }, [])

  return {
    ...state,
    abort,
    aborted,
  }
}
