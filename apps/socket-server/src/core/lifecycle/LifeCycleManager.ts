import { BaseClass } from './BaseClass'

export class LifecycleManager {
    private static instances: BaseClass[] = []
    private static initialized = false

    static register(instance: BaseClass) {
        this.instances.push(instance)

        // If init already happened, run immediately
        if (this.initialized) {
            instance.onInit()
        }
    }

    static async initAll() {
        this.initialized = true

        for (const instance of this.instances) {
            await instance.onInit()
        }
    }

    static async destroyAll() {
        const reversed = [...this.instances].reverse()

        for (const instance of reversed) {
            await instance.onDestroy()
        }
    }
}
