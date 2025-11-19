import { z } from 'zod/v3'
import { GameNamespaces } from '../utils/constants'

export const BasePayloadSchema = z
    .object({
        data: z.any().optional(),
        gameNamespace: z.enum(GameNamespaces),
        roomId: z.string().optional(),
        roomCode: z.string().optional(),
    })
    .passthrough()
