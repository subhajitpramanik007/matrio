import { BaseClass } from './BaseClass'

export class LifecycleManager {
    private static instances: BaseClass[] = []
    private static initialized = false

    static async register(instance: BaseClass) {
        this.instances.push(instance)

        // If init already happened, run immediately
        if (this.initialized) {
            await instance.onInit()
        }
    }

    static async initAll() {
        this.initialized = true

        const initializedInstances: BaseClass[] = []
        try {
            for (const instance of this.instances) {
                await instance.onInit()
                initializedInstances.push(instance)
            }
            this.initialized = true
        } catch (error) {
            // Cleanup partially initialized instances
            for (const instance of initializedInstances.reverse()) {
                try {
                    await instance.onDestroy()
                } catch (cleanupError) {
                    // Log but don't throw during cleanup
                }
            }
            throw error
        }
    }

    static async destroyAll() {
        const reversed = [...this.instances].reverse()

        const errors: Error[] = []
        for (const instance of reversed) {
            try {
                await instance.onDestroy()
            } catch (error) {
                errors.push(error instanceof Error ? error : new Error(String(error)))
            }
        }

        if (errors.length > 0) {
            throw errors
        }
    }
}
