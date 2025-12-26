import { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from './use-socket'
import type { TSocketErrorResponse, TSocketResponse, TSocketSuccessResponse } from '@/types'
import type { TGameEventRequest, TGameNamespaceToSocket } from '@/games/types/game.types'
import { randomDelay } from '@/lib/utils'

type UseSocketEmitOptions<
  TData,
  TGameNamespace extends TGameNamespaceToSocket | undefined = undefined,
> = {
  event: TGameNamespace extends undefined ? string : TGameEventRequest
  onSuccess?: (data: TSocketSuccessResponse<TData>['data']) => void
  onError?: (error: TSocketErrorResponse['error']) => void
  gameNamespace?: TGameNamespace
  errorMsg: string
}

type TEventState<TData> = {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: string | null
  data: TData | null
}

export const useSocketEmit = <
  TData = any,
  TEmitValues = any,
  TGameNamespace extends TGameNamespaceToSocket | undefined = undefined,
>({
  event,
  gameNamespace,
  onError,
  onSuccess,
  errorMsg,
}: UseSocketEmitOptions<TData, TGameNamespace>) => {
  const [state, setState] = useState<TEventState<TData>>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    data: null,
  })

  const isMountedRef = useRef(true)
  const isEmittingRef = useRef(false)
  const socket = useSocket()

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const emit = useCallback(
    async (data?: TEmitValues) => {
      if (isEmittingRef.current) {
        console.warn(`[useSocketEmit] Already emitting!, ${event} => ${gameNamespace}`)
        return
      }
      isEmittingRef.current = true
      console.log(`[useSocketEmit] Emitting... ${event} => ${gameNamespace}`)

      function onInit() {
        if (!isMountedRef.current) return
        setState(() => ({
          isLoading: true,
          isSuccess: false,
          data: null,
          isError: false,
          error: null,
        }))
      }

      function onFulfill(resData: TData) {
        if (!isMountedRef.current) return
        setState(() => ({
          isLoading: false,
          isSuccess: true,
          data: resData,
          isError: false,
          error: null,
        }))
        onSuccess?.(resData)
      }

      function onFailure(error: string | null) {
        if (!isMountedRef.current) return
        setState(() => ({
          isLoading: false,
          isSuccess: false,
          isError: true,
          error,
          data: null,
        }))
        onError?.(error || errorMsg)
      }

      onInit()
      await randomDelay(0, 500)

      try {
        const callback = (res: TSocketResponse<TData>) => {
          isEmittingRef.current = false
          if (res.success) onFulfill(res.data)
          else onFailure(res.error)
        }

        if (gameNamespace) socket.emit(event, { data, gameNamespace }, callback)
        else socket.emit(event, data, callback)
      } catch (err) {
        if (isMountedRef.current) {
          const msg = err instanceof Error ? err.message : 'Failed to emit event'
          onFailure(msg)
        }
      }
    },
    [socket, event, gameNamespace, onSuccess, onError],
  )

  return {
    ...state,
    emit,
  }
}
