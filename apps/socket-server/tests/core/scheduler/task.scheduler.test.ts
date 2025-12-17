import { TaskManager } from '@/core/scheduler'

describe('Tasks schedular factory', () => {
    const tasksSchedular = new TaskManager()
    const userTaskSchedular = tasksSchedular.getScheduler('user')

    test('should be defined', (done) => {
        expect(tasksSchedular).toBeDefined()
        done()
    })

    test('should create task', (done) => {
        const taskId = userTaskSchedular.createImmediate(() => {
            done()
        })
        console.log('taskId', taskId)
        expect(taskId).toBeDefined()
    })

    test('should create timeout task', (done) => {
        const taskId = userTaskSchedular.createTimeout(() => {
            done()
        }, 1000)
        console.log('taskId', taskId)
        expect(taskId).toBeDefined()
    })

    test('should clear all', () => {
        tasksSchedular.cancelAll()
        expect(tasksSchedular.listNamespaces().length).toBe(0)
    })
})
