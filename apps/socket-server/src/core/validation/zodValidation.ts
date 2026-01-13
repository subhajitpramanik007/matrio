import z from 'zod'
import { ValidationException } from '../utils'

export const ZodValidation = <T extends z.ZodTypeAny>(schema: T, data: any): z.infer<T> => {
    const parsed = schema.safeParse(data)

    if (!parsed.success) {
        const errors = parsed.error.issues.map((e) => ({ path: e.path, message: e.message }))
        throw new ValidationException(parsed.error.issues[0].message, errors)
    }

    return parsed.data
}
