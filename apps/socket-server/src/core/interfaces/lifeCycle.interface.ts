export interface ILifeCycle {
    /**
     * Initialize the life cycle
     */
    onInit(): void | Promise<void>
    /**
     * Destroy the life cycle
     */
    onDestroy(): void | Promise<void>
}

export interface ILifeCycleManager {
    /**
     * Register a life cycle
     */
    register(lifeCycle: ILifeCycle): void | Promise<void>

    /**
     * Initialize all life cycles
     */
    initAll(): void | Promise<void>

    /**
     * Destroy all life cycles
     */
    destroyAll(): void | Promise<void>
}
