import { logger } from '@/core/utils'
import { ILifeCycle } from '@/core/interfaces/lifeCycle.interface'
import { LifecycleManager } from '@/core/lifecycle/LifeCycleManager'

export abstract class BaseClass implements ILifeCycle {
    constructor() {
        LifecycleManager.register(this)
    }

    onInit(): void | Promise<void> {
        logger.log(`${this.constructor.name} initialized`)
    }

    onDestroy(): void | Promise<void> {
        logger.log(`${this.constructor.name} destroyed`)
    }
}

export class LifecycleBaseClass extends BaseClass implements ILifeCycle {
    constructor() {
        super()
    }

    onInit(): void | Promise<void> {
        super.onInit()
    }

    onDestroy(): void | Promise<void> {
        super.onDestroy()
    }
}
