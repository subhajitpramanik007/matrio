import z from 'zod'

export const isString = (message: string = 'String') =>
  z
    .string({ message: `${message} is required` })
    .min(1, { message: `${message} is required` })

export const isNumber = (message: string = 'Number') =>
  z
    .number({ message: `${message} is required` })
    .min(1, { message: `${message} is required` })

export const isBoolean = (message: string = 'Boolean') =>
  z.boolean({ message: `${message} is required` })

export const isEmail = (message: string = 'Invalid email') =>
  z.email({ message: `${message}` })

export const isEmailOrUsername = z.union([
  isEmail(),
  isString('Username or email'),
])

export const isPassword = (min: number = 6, max: number = 32) =>
  z
    .string({ message: 'Password is required' })
    .min(min, { message: `Password must be at least ${min} characters` })
    .max(max, { message: `Password must be at most ${max} characters` })
