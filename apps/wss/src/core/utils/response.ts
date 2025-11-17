export class SocketResponse {
    success: boolean

    constructor(public data: any = undefined) {
        this.success = true
    }
}
