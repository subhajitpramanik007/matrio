export class SocketResponse {
    success: boolean
    message?: string

    constructor(
        public data: any = undefined,
        message?: string,
    ) {
        this.success = true
        if (message) this.message = message
    }
}
