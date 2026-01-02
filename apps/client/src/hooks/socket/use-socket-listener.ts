import { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from './use-socket'
import type { TSocketEventOptions, TSocketResponse } from '@/types'

export type SocketListenerOptions<TData> = TSocketEventOptions<TData> & {
  timeout?: number | false
}

export const useSocketListener = <TData = any>(options: SocketListenerOptions<TData>) => {
  const { event, onSuccess, onError, timeout = false } = options

  const socket = useSocket()

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

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)
  const abortCtrlRef = useRef<AbortController | null>(null)
  const onSuccessRef = useRef(onSuccess)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    onSuccessRef.current = onSuccess
    onErrorRef.current = onError
  }, [onError, onSuccess])

  useEffect(() => {
    abortCtrlRef.current = new AbortController()

    function onFulfill(resData: TData) {
      setState((prev) => ({ ...prev, loading: false, data: resData }))
      onSuccessRef.current?.(resData)
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
      timeoutIdRef.current = null
    }

    function onFailure(message: string | null = null) {
      setState((prev) => ({ ...prev, loading: false, error: message }))
      onErrorRef.current?.(message ?? 'Request failed')
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
      timeoutIdRef.current = null
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

    timeoutIdRef.current = timeout ? setTimeout(onTimeOut, timeout * 1000) : null

    const handler = (res: TSocketResponse<TData>) => {
      if (abortCtrlRef.current?.signal.aborted) {
        setState((prev) => ({ ...prev, loading: false }))
        return
      }

      if (res.success) onFulfill(res.data)
      else onFailure(res.error)
    }

    socket.on(event, handler)

    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
      socket.off(event, handler)
      abortCtrlRef.current?.abort()
      setAborted(true)
    }
  }, [event, socket, timeout])

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
