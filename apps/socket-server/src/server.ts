import { ENV } from './config/env'
import { httpServer } from './app'
import { LifecycleManager } from './core/lifecycle/LifeCycleManager'
import { logger } from './core/utils'

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
        await LifecycleManager.destroyAll()
        logger.log('Graceful shutdown completed')
        process.exit(0)
    })

    process.on('SIGTERM', async () => {
        await LifecycleManager.destroyAll()
        logger.log('Graceful shutdown completed')
        process.exit(0)
    })
}

bootstrap()
