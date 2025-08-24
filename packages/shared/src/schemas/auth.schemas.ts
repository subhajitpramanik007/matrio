import z from "zod";

const UserSignupSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must be at most 32 characters" }),
  username: z
    .string({ message: "Username is required" })
    .min(3)
    .max(32)
    .optional(),
  termsAndConditions: z
    .boolean({
      message: "Terms and conditions should be accepted",
    })
    .refine((value) => value, {
      message: "Terms and conditions should be accepted",
    }),
});

const UserSigninSchema = z.object({
  emailOrUsername: z.union([
    z.email({ message: "Invalid email" }),
    z
      .string({ message: "Username is required" })
      .min(1, { message: "Username or email is required" }),
  ]),
  password: z
    .string({ message: "Password is required" })
    .min(1, { message: "Password is required" }),
  rememberMe: z.boolean({ message: "Remember me is required" }).optional(),
});

const EmailVerificationSchema = z.object({
  email: z.string({ message: "Email is required" }),
  token: z.string({ message: "Token is required" }),
});

const ResendVerificationEmailSchema = z.object({
  email: z.string({ message: "Email is required" }),
});

type TUserSignup = z.infer<typeof UserSignupSchema>;
type TUserSignin = z.infer<typeof UserSigninSchema>;
type TEmailVerification = z.infer<typeof EmailVerificationSchema>;
type TResendVerificationEmail = z.infer<typeof ResendVerificationEmailSchema>;

export {
  UserSignupSchema,
  UserSigninSchema,
  EmailVerificationSchema,
  ResendVerificationEmailSchema,
};

export type {
  TUserSignup,
  TUserSignin,
  TEmailVerification,
  TResendVerificationEmail,
};
