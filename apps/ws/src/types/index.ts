import z from "zod";

export const UNSUBSCRIBE = "UNSUBSCRIBE";
export const JOIN_GAME = "JOIN_GAME";
export const LEAVE_GAME = "LEAVE_GAME";
export const USER_GAME_DETAILS = "USER_GAME_DETAILS";
export const SUBSCRIBE = "SUBSCRIBE";

export const joinGameSchema = z.object({
  type: z.literal(JOIN_GAME),
  payload: z.object({
    gameId: z.string(),
  }),
});

export const leaveGameSchema = z.object({
  type: z.literal(LEAVE_GAME),
  payload: z.object({
    gameId: z.string(),
  }),
});

export const subscribeGameSchema = z.object({
  type: z.literal(SUBSCRIBE),
  payload: z.object({
    gameId: z.string(),
  }),
});

export const userGameDetailsSchema = z.object({
  type: z.literal(USER_GAME_DETAILS),
  payload: z.object({
    gameId: z.string(),
    currentCode: z.string(),
    cursorPosition: z.number(),
    timestamp: z.number(),
    completed: z.boolean(),
  }),
});

export type TUserGameDetails = z.infer<typeof userGameDetailsSchema>;
export type TJoinGame = z.infer<typeof joinGameSchema>;
export type TLeaveGame = z.infer<typeof leaveGameSchema>;
export type TSubscribeGame = z.infer<typeof subscribeGameSchema>;
