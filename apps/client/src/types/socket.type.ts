export type TSocketSuccessResponse<T> = {
  success: true
  data: T
}

export type TSocketErrorResponse = {
  success: false
  message: string
}

export type TSocketResponse<T> =
  | TSocketSuccessResponse<T>
  | TSocketErrorResponse

export type TSocketEventOptions<T> = {
  event: string
  onSuccess?: (data: TSocketSuccessResponse<T>['data']) => void
  onError?: (error: TSocketErrorResponse['message']) => void
}
