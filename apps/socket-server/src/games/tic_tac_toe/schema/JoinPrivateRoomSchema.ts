import z from 'zod'

export const JoinPrivateTicTacToeRoomSchema = z.object({
    roomCode: z.string({ error: 'Room code is required' }),
})

export type JoinPrivateTicTacToeRoomDTO = z.infer<typeof JoinPrivateTicTacToeRoomSchema>
