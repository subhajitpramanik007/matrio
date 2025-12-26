import { logger } from '../utils'
import { LifecycleManager } from './LifeCycleManager'

export abstract class BaseClass {
    constructor() {
        LifecycleManager.register(this)
    }

    async onInit(): Promise<void> {
        logger.log(`${this.constructor.name} initialized`)
    }

    async onDestroy(): Promise<void> {
        logger.log(`${this.constructor.name} destroyed`)
    }
}
