import { Logger } from '@/core/utils'
import { generateTaskId, ETaskType, ITaskScheduler, Task, TaskId } from '@/core/scheduler'

export class TaskScheduler implements ITaskScheduler {
    private tasks = new Map<TaskId, Task>()
    private logger = new Logger('TaskSchedular')

    constructor(protected readonly namespace: string) {}

    private addTask(task: Task) {
        this.tasks.set(task.id, task)
        this.logger.debug(`Added task :: ${task.id}`)
    }

    private removeTask(taskId: TaskId) {
        this.tasks.delete(taskId)
        this.logger.debug(`Removed task :: ${taskId}`)
    }

    createTimeout(callback: () => void, delay: number): TaskId {
        const id = generateTaskId(this.namespace)

        const handle = setTimeout(() => {
            if (!this.tasks.has(id)) return

            try {
                callback()
            } finally {
                this.removeTask(id)
            }
        }, delay)

        const task: Task = {
            id,
            type: ETaskType.TIMEOUT,
            cancel: () => {
                clearTimeout(handle)
                this.removeTask(id)
            },
        }

        this.addTask(task)
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
                this.removeTask(id)
            },
        }

        this.addTask(task)
        return id
    }

    createImmediate(callback: () => void): TaskId {
        const id = generateTaskId(this.namespace)
        const handle = setImmediate(() => {
            callback()
            this.removeTask(id)
        })

        const task: Task = {
            id,
            type: ETaskType.IMMEDIATE,
            cancel: () => {
                clearImmediate(handle)
                this.removeTask(id)
            },
        }

        this.addTask(task)
        return id
    }

    createMicrotask(callback: () => void): TaskId {
        const id = generateTaskId(this.namespace)

        const task: Task = {
            id,
            type: ETaskType.MICROTASK,
            cancel: () => this.removeTask(id),
        }

        queueMicrotask(() => {
            try {
                callback()
            } finally {
                this.removeTask(id)
            }
        })

        this.addTask(task)
        return id
    }

    cancelTask(taskId: TaskId): void {
        const task = this.tasks.get(taskId)
        if (!task) return

        task.cancel()
        this.removeTask(task.id)
    }

    cancelAll(): void {
        for (const task of this.tasks.values()) task.cancel()
        this.tasks.clear()
    }

    listTasks(): Task[] {
        return Array.from(this.tasks.values())
    }
}
