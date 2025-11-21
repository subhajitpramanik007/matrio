import z from 'zod'
import { ValidationException } from '../utils'

export const ZodValidation = <T extends z.ZodTypeAny>(schema: T, data: any): z.infer<T> => {
    const parsed = schema.safeParse(data)

    if (!parsed.success) {
        throw new ValidationException(parsed.error.message)
    }

    return parsed.data
}
