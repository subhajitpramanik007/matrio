import { z } from 'zod/v3'
import { GameEvents } from '../utils/gameRouter'
import { BasePayloadSchema } from './schema'

export const GameEventRequest = z.enum(GameEvents)
export const PayloadSchema = BasePayloadSchema.optional()
export const CallbackSchema = z.function().optional()

/**
 * GameSocketRequest
 *  - event: string,
 *  - payload: { data: any, gameNamespace: string },
 *  - callback: (data: any) => void
 */
export const GameSocketRequestSchema = z.tuple([GameEventRequest, PayloadSchema, CallbackSchema])

export type GameSocketRequest = z.infer<typeof GameSocketRequestSchema>
export type PayloadSchema = z.infer<typeof PayloadSchema>
export type CallbackSchema = z.infer<typeof CallbackSchema>
