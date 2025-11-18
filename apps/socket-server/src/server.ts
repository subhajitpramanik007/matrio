import { ENV } from './config/env'
import { httpServer } from './app'

async function bootstrap() {
    httpServer.listen(ENV.PORT, () => {
        console.log(`Server started on port ${ENV.PORT}`)
    })

    httpServer.on('error', (error) => {
        console.error('Server error:', error)
    })

    httpServer.on('close', () => {
        console.log('Server closed')
    })
}

bootstrap()
