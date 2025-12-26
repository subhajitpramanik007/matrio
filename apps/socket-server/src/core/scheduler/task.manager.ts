import { Logger } from '@/core/utils'
import { TaskScheduler } from '@/core/scheduler'

export class TaskManager {
    private logger = new Logger('TaskManager')
    protected schedulers = new Map<string, TaskScheduler>()

    getScheduler(name: string): TaskScheduler {
        const scheduler = this.schedulers.get(name)
        if (scheduler) return scheduler

        const newScheduler = new TaskScheduler(name)
        this.schedulers.set(name, newScheduler)
        return newScheduler
    }

    cancelNamespace(name: string): void {
        const scheduler = this.schedulers.get(name)
        if (scheduler) {
            scheduler.cancelAll()
            this.schedulers.delete(name)
        }
    }

    listNamespaces() {
        return Array.from(this.schedulers.keys())
    }

    cancelAll() {
        for (const scheduler of this.schedulers.values()) {
            scheduler.cancelAll()
        }
        this.schedulers.clear()
    }
}
