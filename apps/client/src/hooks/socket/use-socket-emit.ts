import { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from './use-socket'
import type {
  TSocketErrorResponse,
  TSocketResponse,
  TSocketSuccessResponse,
} from '@/types'
import type {
  TGameEventRequest,
  TGameNameSpaceToSocket,
} from '@/games/types/game.types'
import { delay } from '@/lib/utils'

type UseSocketEmitOptions<
  TData,
  TGameNameSpace extends TGameNameSpaceToSocket | undefined = undefined,
> = {
  event: TGameNameSpace extends undefined ? string : TGameEventRequest
  onSuccess?: (data: TSocketSuccessResponse<TData>['data']) => void
  onError?: (error: TSocketErrorResponse['error']) => void
  gameNameSpace?: TGameNameSpace
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
  TGameNameSpace extends TGameNameSpaceToSocket | undefined = undefined,
>({
  event,
  gameNameSpace,
  onError,
  onSuccess,
  errorMsg,
}: UseSocketEmitOptions<TData, TGameNameSpace>) => {
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
        console.warn(
          `[useSocketEmit] Already emitting!, ${event} => ${gameNameSpace}`,
        )
        return
      }
      isEmittingRef.current = true
      console.log(`[useSocketEmit] Emitting... ${event} => ${gameNameSpace}`)

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
      await delay(3000)

      try {
        const callback = (res: TSocketResponse<TData>) => {
          isEmittingRef.current = false
          if (res.success) onFulfill(res.data)
          else onFailure(res.error)
        }

        if (gameNameSpace) socket.emit(event, gameNameSpace, data, callback)
        else socket.emit(event, data, callback)
      } catch (err) {
        if (isMountedRef.current) {
          const msg =
            err instanceof Error ? err.message : 'Failed to emit event'
          onFailure(msg)
        }
      }
    },
    [socket, event, gameNameSpace, onSuccess, onError],
  )

  return {
    ...state,
    emit,
  }
}
