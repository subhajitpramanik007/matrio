import { z } from 'zod'
import { GameEvent } from '../../core/utils/gameRouter'

const checkersRoomCodeSchema = z.object({
    roomCode: z.string().optional(),
})

const checkersRoomOptionsSchema = z.object({
    roomType: z.enum(['private', 'public']).default('private'),
    gameType: z.enum(['multiplayer', 'you-vs-ai']).default('multiplayer'),
    bettingCoins: z.number().min(100).max(1000).default(100),
})

const createCheckersRoomSchema = checkersRoomOptionsSchema.extend({
    boardSize: z.number().min(8).max(10).default(8),
    gameDuration: z
        .number()
        .min(5)
        .max(30)
        .default(15)
        .transform((value) => value * 60),
})

const joinCheckersRoomSchema = checkersRoomOptionsSchema.extend({
    roomCode: z.string(),
})

const leaveCheckersRoomSchema = checkersRoomCodeSchema

const startCheckersGameSchema = checkersRoomCodeSchema

const makeMoveSchema = checkersRoomCodeSchema.extend({
    from: z.tuple([z.number(), z.number()]),
    to: z.tuple([z.number(), z.number()]),
})

export const CheckersSchemaRegistry = {
    create_room: createCheckersRoomSchema,
    join_room: joinCheckersRoomSchema,
    random_room: createCheckersRoomSchema,
    leave_room: leaveCheckersRoomSchema,
    start_game: startCheckersGameSchema,
    ready: z.object({}),
    make_move: makeMoveSchema,
    end_game: z.object({}),
    restart_game: z.object({}),
    result: z.object({}),
} satisfies Record<GameEvent, z.ZodSchema>

export type TCheckersSchemaRegistry = typeof CheckersSchemaRegistry

export type CheckersEventData<T extends GameEvent> = z.infer<(typeof CheckersSchemaRegistry)[T]>
