import { logger } from '@/core/utils'
import { ILifeCycle } from '@/core/interfaces/lifeCycle.interface'

export class LifecycleManager {
    private static instances: ILifeCycle[] = []
    private static initializedInstances: ILifeCycle[] = []
    private static initialized = false

    static getLifeCycles() {
        return LifecycleManager.instances
    }

    static async register(instance: ILifeCycle) {
        // If already initialized, do not register
        if (LifecycleManager.initializedInstances.includes(instance)) return

        LifecycleManager.instances.push(instance)
        logger.log(`${instance.constructor.name} registered`)

        // If init already happened, run immediately
        if (LifecycleManager.initialized) {
            await instance.onInit()
            LifecycleManager.initializedInstances.push(instance)
        }
    }

    static async initAll() {
        if (LifecycleManager.initialized) return

        try {
            for (const instance of LifecycleManager.instances) {
                await instance.onInit()
                LifecycleManager.initializedInstances.push(instance)
            }
            logger.log('All lifeCycles initialized')
            LifecycleManager.initialized = true
        } catch (error) {
            logger.error('Failed to initialize all lifeCycles, rolling back', error)
            await LifecycleManager.rollback()
            throw error
        }
    }

    static async rollback() {
        const reversed = [...LifecycleManager.initializedInstances].reverse()
        for (const instance of reversed) {
            try {
                await instance.onDestroy()
            } catch (error) {
                logger.error(`${instance.constructor.name} failed to destroy`, error)
            }
        }
        LifecycleManager.initializedInstances = []
        LifecycleManager.initialized = false
        logger.log('Rollback completed')
    }

    static async destroyAll() {
        const reversed = [...LifecycleManager.instances].reverse()
        const errors: Error[] = []

        for (const instance of reversed) {
            try {
                await instance.onDestroy()
            } catch (error) {
                errors.push(error instanceof Error ? error : new Error(String(error)))
            }
        }

        LifecycleManager.initializedInstances = []
        LifecycleManager.initialized = false

        if (errors.length > 0) {
            throw errors
        }

        logger.log('All lifeCycles destroyed')
    }

    static _reset() {
        logger.log('Resetting lifeCycles')
        LifecycleManager.instances = []
        LifecycleManager.initializedInstances = []
        LifecycleManager.initialized = false
    }
}
