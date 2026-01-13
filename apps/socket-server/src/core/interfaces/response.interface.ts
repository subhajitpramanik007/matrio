export interface ISocketResponse<T> {
    success: boolean
    message?: string
    data?: T
}

export interface ISocketStringResponse {
    success: boolean
    message?: string
}
