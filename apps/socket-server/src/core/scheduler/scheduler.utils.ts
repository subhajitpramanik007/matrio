import { TaskId, TaskNamespace } from '@/core/scheduler'

export const createNamespace = <T extends string>(ns: T): TaskNamespace<T> => ns as unknown as TaskNamespace<T>

export const generateTaskId = <T extends string>(name?: T): TaskId => {
    return (name || 'global')
        .concat(':task_')
        .concat(Math.random().toString(36).slice(2))
        .concat('_')
        .concat(Date.now().toString(36)) as TaskId
}
