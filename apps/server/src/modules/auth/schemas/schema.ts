import z from 'zod';

export const UserSignupSchema = z.object({
  email: z.email({ message: 'Invalid email' }),
  password: z.string({ message: 'Password is required' }).min(6).max(32),
  username: z.string({ message: 'Username is required' }).min(3).max(32).optional(),
});

export const UserSigninSchema = z.object({
  emailOrUsername: z.string({ message: 'Email or username is required' }),
  password: z.string({ message: 'Password is required' }).min(6).max(32),
});

export const EmailVerificationSchema = z.object({
  email: z.string({ message: 'Email is required' }),
  token: z.string({ message: 'Token is required' }),
});

export const ResendVerificationEmailSchema = z.object({
  email: z.string({ message: 'Email is required' }),
});
