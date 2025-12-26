import { Brand } from '@matrio/shared/types/brand.type'
import { Server } from 'socket.io'

export type TaskId = Brand<string, 'TaskId'>
export type TaskNamespace<T extends string> = Brand<string, T>

export enum ETaskType {
    TIMEOUT = 'timeout',
    INTERVAL = 'interval',
    IMMEDIATE = 'immediate',
    MICROTASK = 'microtask',
}

export type Task = {
    id: TaskId
    type: ETaskType
    cancel: () => void
}

// Task scheduler
export interface ITaskScheduler {
    createTimeout(callback: () => void, delay: number, ...rest: any): TaskId
    createInterval(callback: () => void, interval: number): TaskId
    createImmediate(callback: () => void): TaskId
    createMicrotask(callback: () => void): TaskId
    cancelTask(taskId: TaskId): void
    cancelAll(): void
    listTasks(): Task[]
}

// Server task scheduler
export interface IServerTaskSchedulerPayload {
    name: string
    event: string
    to: string | string[]
    payload: any
}

//  Config for TaskScheduler
type BaseConfigTaskScheduler<T extends string = string> = {
    namespace: TaskNamespace<T>
}

type ConfigWithoutServer = BaseConfigTaskScheduler & {
    isServerRequired: false
    io?: undefined
}

type ConfigWithServer = BaseConfigTaskScheduler & {
    isServerRequired: true
    io: Server
}

export type CreateBaseTasksScheduler = ConfigWithoutServer | ConfigWithServer
