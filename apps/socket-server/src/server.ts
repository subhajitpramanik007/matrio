import 'dotenv/config'

import { httpServer } from './app'

const PORT = process.env.PORT ?? 8002

async function bootstrap() {
    httpServer.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })

    httpServer.on('error', (error) => {
        console.error('Server error:', error)
    })

    httpServer.on('close', () => {
        console.log('Server closed')
    })
}

bootstrap()
