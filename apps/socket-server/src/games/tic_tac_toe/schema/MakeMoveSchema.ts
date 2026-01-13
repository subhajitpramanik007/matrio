import z from 'zod'

export const TicTacToeMakeMoveSchema = z.object({
    cell: z
        .number({ error: 'Cell is required' })
        .min(0, 'Cell must be between 0 and 8')
        .max(8, 'Cell must be between 0 and 8'),
})

export type TicTacToeMakeMoveDTO = z.infer<typeof TicTacToeMakeMoveSchema>
