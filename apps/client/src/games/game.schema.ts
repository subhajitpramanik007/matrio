import z from 'zod'
import { GAME_MODE, GAME_SLUG } from '@/games/game.constant'

export const gameParamSchema = z.object({
  game: z.enum(GAME_SLUG, { message: 'Invalid game slug' }),
})

export const gameModeParamSchema = z.object({
  game: z.enum(GAME_SLUG, { message: 'Invalid game slug' }),
  mode: z.enum(GAME_MODE, { message: 'Invalid mode slug' }),
})

export type TGameParamsSchema = z.infer<typeof gameParamSchema>
export type TGameModeParamsSchema = z.infer<typeof gameModeParamSchema>
