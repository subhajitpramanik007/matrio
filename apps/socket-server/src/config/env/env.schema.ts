import z from 'zod'

const allowAll = (value: string) => value === '*'
const corsOriginAsUrl = (value: string) => z.url().safeParse(value).success
const corsOriginAsArray = (value: string) => z.array(z.url()).safeParse(value).success

const corsOrigins = z
    .string()
    .refine((value) => allowAll(value) || corsOriginAsUrl(value) || corsOriginAsArray(value), {
        message: 'Invalid CORS origin',
    })

export const envSchema = z.object({
    PORT: z.string().default('8002'),
    CORS_ORIGIN: corsOrigins.default('*'),
    JWT_SECRET: z.string().default('secret'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export type Env = z.infer<typeof envSchema>
