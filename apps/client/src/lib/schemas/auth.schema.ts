import z from 'zod'
import {
  isEmail,
  isEmailOrUsername,
  isPassword,
  isString,
} from './common.schema'

const SigninFormSchema = z.object({
  emailOrUsername: isEmailOrUsername,
  password: isString('Password'),
  rememberMe: z.boolean({ message: 'Remember me is required' }),
})

const SignupFormSchema = z.object({
  email: isEmail(),
  password: isPassword(),
  username: z
    .string({ message: 'Username is required' })
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(32, { message: 'Username must be at most 32 characters' })
    .optional(),
  termsAndConditions: z
    .boolean({
      message: 'Terms and conditions should be accepted',
    })
    .refine((value) => value, {
      message: 'Terms and conditions should be accepted',
    }),
})

const EmailVerificationSchema = z.object({
  email: z.email({ message: 'Email is required' }).min(1, 'Email is required'),
  token: z.string({ message: 'Token is required' }).min(1, 'Token is required'),
})

const ResendVerificationEmailSchema = z.object({
  email: z.email({ message: 'Email is required' }).min(1, 'Email is required'),
})

export {
  SigninFormSchema,
  SignupFormSchema,
  EmailVerificationSchema,
  ResendVerificationEmailSchema,
}

export type TSigninForm = z.infer<typeof SigninFormSchema>
export type TSignupForm = z.infer<typeof SignupFormSchema>
export type TEmailVerification = z.infer<typeof EmailVerificationSchema>
export type TResendVerificationEmail = z.infer<
  typeof ResendVerificationEmailSchema
>
