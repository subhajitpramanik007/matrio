import { z } from 'zod'
import { GameEvent } from '../../core/utils/gameRouter'
import {
    CheckersGameStartSchema,
    CheckersMoveSchema,
    CheckersRoomCreateSchema,
    CheckersRoomJoinSchema,
    CheckersRoomLeaveSchema,
} from '@matrio/shared/checkers'

export const CheckersSchemaRegistry = {
    create_room: CheckersRoomCreateSchema,
    join_room: CheckersRoomJoinSchema,
    random_room: CheckersRoomCreateSchema,
    leave_room: CheckersRoomLeaveSchema,
    start_game: CheckersGameStartSchema,
    ready: z.object({}),
    make_move: CheckersMoveSchema,
    end_game: z.object({}),
    restart_game: z.object({}),
    result: z.object({}),
} satisfies Record<GameEvent, z.ZodSchema>

export type TCheckersSchemaRegistry = typeof CheckersSchemaRegistry

export type CheckersEventData<T extends GameEvent> = z.infer<(typeof CheckersSchemaRegistry)[T]>
