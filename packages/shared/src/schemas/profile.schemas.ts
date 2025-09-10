import * as z from "zod";

export const UpdateProfileSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(32, { message: "Username must be at most 32 characters" })
    .optional(),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(32, { message: "Name must be at most 32 characters" })
    .optional(),
  bio: z
    .string()
    .max(255, { message: "Bio must be at most 255 characters" })
    .optional(),
});

export type TUpdateProfile = z.infer<typeof UpdateProfileSchema>;

// User settings schema
export const UpdateSettingsSchema = z.object({
  theme: z.enum(["system", "light", "dark"]).default("system").optional(),
  locale: z.string().default("en").optional(),
  autoSave: z.boolean().optional(),
  showOnlineStats: z.boolean().optional(),
  sound: z.boolean().optional(),
  notification: z.boolean().optional(),
});

export type TUpdateSettings = z.infer<typeof UpdateSettingsSchema>;
