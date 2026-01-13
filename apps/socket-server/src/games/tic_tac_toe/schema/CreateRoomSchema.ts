import z from 'zod'

export const CreateTicTacToeRoomSchema = z.object({
    bettingCoins: z
        .number({ error: 'Betting coins is required' })
        .positive({ message: 'Betting coins must be a positive number' })
        .min(100, 'Minimum betting coins is 100'),
    gameDuration: z
        .number({ error: 'Game duration is required' })
        .positive({ message: 'Game duration must be a positive number' })
        .default(180)
        .optional(), // in seconds (3 minutes)
    maxTimePerTurn: z
        .number({ error: 'Max time per turn is required' })
        .positive({ message: 'Max time per turn must be a positive number' })
        .default(30)
        .optional(), // in seconds (30 seconds)
    maxNoOfMissedTurns: z
        .number({ error: 'Max no of missed turns is required' })
        .positive({ message: 'Max no of missed turns must be a positive number' })
        .default(3)
        .optional(), // max no of missed turns before game ends
})

export const CreatePrivateTicTacToeRoomSchema = CreateTicTacToeRoomSchema
export const CreatePublicTicTacToeRoomSchema = CreateTicTacToeRoomSchema

export type CreatePrivateRoomDTO = z.infer<typeof CreatePrivateTicTacToeRoomSchema>
export type CreatePublicRoomDTO = z.infer<typeof CreatePublicTicTacToeRoomSchema>
