import { z } from 'zod/v3'
import { EGameNamespace } from '../utils'

export const BasePayloadSchema = z
    .object({
        data: z.any().optional(),
        gameNamespace: z.nativeEnum(EGameNamespace),
        roomId: z.string().optional(),
        roomCode: z.string().optional(),
    })
    .passthrough()
