import z from 'zod'
import { GAME_MODE, GAME_SLUG } from './constants/game.constant'

export const gameParamSchema = z.object({
  game: z.enum(GAME_SLUG, { error: 'Invalid game slug' }),
})

export const gameParamWithModeSchema = gameParamSchema.extend({
  mode: z.enum(GAME_MODE, { error: 'Invalid mode slug' }),
})
