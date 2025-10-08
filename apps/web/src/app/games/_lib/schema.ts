import z from "zod";
import { GameMode, GameSlug } from "@/types";

export const gameParamSchema = z.object({
  game: z.enum(GameSlug, { message: "Invalid game slug" }),
});

export const gameModeParamSchema = z.object({
  game: z.enum(GameSlug, { message: "Invalid game slug" }),
  mode: z.enum(GameMode, { message: "Invalid mode slug" }),
});

export type TGameParamsSchema = z.infer<typeof gameParamSchema>;
export type TGameModeParamsSchema = z.infer<typeof gameModeParamSchema>;
