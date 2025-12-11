import { Logger } from '@/core/utils'
import { generateTaskId, ETaskType, ITaskScheduler, Task, TaskId } from '@/core/scheduler'

export class TaskScheduler implements ITaskScheduler {
    private tasks = new Map<TaskId, Task>()
    private logger = new Logger('TaskSchedular')

    constructor(protected readonly namespace: string) {}

    createTimeout(callback: () => void, delay: number): TaskId {
        const id = generateTaskId(this.namespace)

        const handle = setTimeout(() => {
            if (!this.tasks.has(id)) return

            try {
                callback()
            } finally {
                this.tasks.delete(id)
            }
        }, delay)

        const task: Task = {
            id,
            type: ETaskType.TIMEOUT,
            cancel: () => {
                clearTimeout(handle)
                this.tasks.delete(id)
            },
        }

        this.tasks.set(id, task)
        return id
    }

    createInterval(callback: () => void, interval: number): TaskId {
        const id = generateTaskId(this.namespace)
        const handle = setInterval(() => {
            if (!this.tasks.has(id)) {
                clearInterval(handle)
                return
            }

            try {
                callback()
            } catch (error) {
                clearInterval(handle)
            }
        }, interval)

        const task: Task = {
            id,
            type: ETaskType.INTERVAL,
            cancel: () => {
                clearInterval(handle)
                this.tasks.delete(id)
            },
        }

        this.tasks.set(id, task)
        return id
    }

    createImmediate(callback: () => void): TaskId {
        const id = generateTaskId(this.namespace)
        const handle = setImmediate(() => {
            callback()
            this.tasks.delete(id)
        })

        const task: Task = {
            id,
            type: ETaskType.IMMEDIATE,
            cancel: () => {
                clearImmediate(handle)
                this.tasks.delete(id)
            },
        }

        this.tasks.set(id, task)
        return id
    }

    createMicrotask(callback: () => void): TaskId {
        const id = generateTaskId(this.namespace)

        const task: Task = {
            id,
            type: ETaskType.MICROTASK,
            cancel: () => this.tasks.delete(id),
        }

        queueMicrotask(() => {
            try {
                callback()
            } finally {
                this.tasks.delete(id)
            }
        })

        this.tasks.set(id, task)
        return id
    }

    cancelTask(taskId: TaskId): void {
        const task = this.tasks.get(taskId)
        if (!task) return

        task.cancel()
        this.tasks.delete(task.id)
    }

    cancelAll(): void {
        for (const task of this.tasks.values()) task.cancel()
        this.tasks.clear()
    }

    listTasks(): Task[] {
        return Array.from(this.tasks.values())
    }
}
