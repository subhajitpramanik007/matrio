import { ISocketResponse, ISocketStringResponse } from '../interfaces/response.interface'

export class SocketResponse<T extends object> implements ISocketResponse<T>, ISocketStringResponse {
    success: boolean
    message?: string
    data?: T

    constructor(message: string)
    constructor(data: T, message?: string)

    constructor(data: T | string, message?: string) {
        this.success = true
        if (typeof data === 'string') {
            this.message = data
        } else {
            this.data = data
            if (message) this.message = message
        }
    }
}
