import z from 'zod';
import {
  EmailVerificationSchema,
  ResendVerificationEmailSchema,
  UserSigninSchema,
  UserSignupSchema,
} from './schema';

export type TUserSignup = z.infer<typeof UserSignupSchema>;
export type TUserSignin = z.infer<typeof UserSigninSchema>;
export type TEmailVerification = z.infer<typeof EmailVerificationSchema>;
export type TResendVerificationEmail = z.infer<typeof ResendVerificationEmailSchema>;
