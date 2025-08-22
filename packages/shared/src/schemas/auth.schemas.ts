import z from "zod";

const UserSignupSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string({ message: "Password is required" }).min(6).max(32),
  username: z
    .string({ message: "Username is required" })
    .min(3)
    .max(32)
    .optional(),
});

const UserSigninSchema = z.object({
  emailOrUsername: z.string({ message: "Email or username is required" }),
  password: z.string({ message: "Password is required" }).min(6).max(32),
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
