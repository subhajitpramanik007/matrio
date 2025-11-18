import z from 'zod'

export const envSchema = z.object({
    PORT: z.string().default('8002'),
    CORS_ORIGIN: z.httpUrl().default('http://localhost:3333'),
    JWT_SECRET: z.jwt().default('secret'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export type Env = z.infer<typeof envSchema>
