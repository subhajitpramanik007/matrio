import { ENV } from './config/env'
import { httpServer } from './app'
import { LifecycleManager } from './core/lifecycle/LifeCycleManager'
import { logger } from './core/utils'

let isShuttingDown = false

async function gracefulShutdown() {
    if (isShuttingDown) return
    isShuttingDown = true

    logger.log('Shutting down gracefully...')

    // Stop accepting new connections
    httpServer.close(() => {
        logger.log('HTTP server closed')
    })

    // Clean up resources
    await LifecycleManager.destroyAll()
    logger.log('Graceful shutdown completed')
    process.exit(0)
}

async function bootstrap() {
    await LifecycleManager.initAll()

    httpServer.listen(ENV.PORT, () => {
        logger.log(`Server started on port ${ENV.PORT}`)
    })

    httpServer.on('error', (error) => {
        logger.error('Server error:', error)
    })

    httpServer.on('close', () => {
        logger.log('Server closed')
    })

    process.on('SIGINT', async () => {
        await gracefulShutdown()
    })

    process.on('SIGTERM', async () => {
        await gracefulShutdown()
    })
}

bootstrap()
