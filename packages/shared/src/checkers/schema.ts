import z from "zod";

const CheckersRoomCodeSchema = z.object({
  roomCode: z.string(),
});

const CheckersRoomOptionsSchema = z.object({
  roomType: z.enum(["private", "public"]).default("private"),
  gameType: z.enum(["multiplayer", "you-vs-ai"]).default("multiplayer"),
  bettingCoins: z.number().min(100).max(1000).default(100),
});

const CheckersRoomCreateSchema = CheckersRoomOptionsSchema.extend({
  boardSize: z.number().min(8).max(10).default(8),
  gameDuration: z
    .number()
    .min(5)
    .max(30)
    .default(15)
    .transform((value) => value * 60),
});

const CheckersRoomJoinSchema = CheckersRoomOptionsSchema.extend({
  roomCode: z.string(),
});

const CheckersRoomLeaveSchema = z.object({
  roomCode: z.string().optional(),
});

const CheckersGameStartSchema = CheckersRoomCodeSchema;

const CheckersMovePosition = z.tuple([z.number(), z.number()]);

const CheckersMoveSchema = CheckersRoomCodeSchema.extend({
  from: CheckersMovePosition,
  to: CheckersMovePosition,
  captures: z.array(CheckersMovePosition),
  isCapture: z.boolean(),
});

export {
  CheckersRoomCodeSchema,
  CheckersRoomOptionsSchema,
  CheckersRoomCreateSchema,
  CheckersRoomJoinSchema,
  CheckersRoomLeaveSchema,
  CheckersGameStartSchema,
  CheckersMoveSchema,
  CheckersMovePosition,
};
