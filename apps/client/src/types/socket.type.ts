import type { TGameEventRequest, TGameEventResponse } from '@/games/types'

export type TSocketSuccessResponse<T> = {
  success: true
  data: T
}

export type TSocketErrorResponse = {
  success: false
  error: string
}

export type TSocketResponse<T> =
  | TSocketSuccessResponse<T>
  | TSocketErrorResponse

type EventType = 'strict' | 'loose'
export type TSocketEventOptions<T, TEventType extends EventType = 'strict'> = {
  type?: TEventType
  event: TEventType extends 'strict'
    ? TGameEventRequest | TGameEventResponse
    : string
  onSuccess?: (data: TSocketSuccessResponse<T>['data']) => void
  onError?: (error: TSocketErrorResponse['error']) => void
}

export type TSocketResponseData<T> = TSocketSuccessResponse<T>['data']
