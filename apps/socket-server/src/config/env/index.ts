import 'dotenv/config'
import { logger } from '../../core/utils'
import { envSchema } from './env.schema'

function validateEnv() {
    const processEnvParsed = envSchema.safeParse(process.env)

    if (!processEnvParsed.success) {
        const errors = processEnvParsed.error.message
        logger.error(errors)
        process.exit(1)
    }

    logger.log('Environment variables validated successfully')
    return processEnvParsed.data
}

export const ENV = validateEnv()
