import { LifecycleBaseClass } from '@/core/lifecycle/BaseClass'
import { LifecycleManager } from '@/core/lifecycle/LifeCycleManager'

describe('LifeCycleManager', () => {
    it('should register lifeCycle', () => {
        new LifecycleBaseClass()
        LifecycleManager.initAll()
        expect(LifecycleManager.getLifeCycles()).toHaveLength(1)
    })

    it('should register lifeCycle', () => {
        new LifecycleBaseClass()
        LifecycleManager.initAll()
        expect(LifecycleManager.getLifeCycles()).toHaveLength(2)
        LifecycleManager._reset()
    })
})
