import { Server as SocketServer } from 'socket.io'
import { TaskManager, IServerTaskSchedulerPayload } from '@/core/scheduler'

export class ServerTaskManger extends TaskManager {
    constructor(private io: SocketServer) {
        super()
    }

    private emitData({ to, event, payload }: Omit<IServerTaskSchedulerPayload, 'name'>) {
        this.io.to(to).emit(event, payload)
    }

    emitEventWithDelay({ name, ...rest }: IServerTaskSchedulerPayload, delay: number) {
        const sc = this.getScheduler(name)
        sc.createTimeout(() => this.emitData(rest), delay)
    }

    emitEventAfterLogic({ name, ...rest }: IServerTaskSchedulerPayload) {
        const sc = this.getScheduler(name)
        sc.createMicrotask(() => this.emitData(rest))
    }

    emitEventImmediate({ name, ...rest }: IServerTaskSchedulerPayload) {
        const sc = this.getScheduler(name)
        sc.createImmediate(() => this.emitData(rest))
    }

    emitEventInterval({ name, ...rest }: IServerTaskSchedulerPayload, interval: number) {
        const sc = this.getScheduler(name)
        sc.createInterval(() => this.emitData(rest), interval)
    }
}
