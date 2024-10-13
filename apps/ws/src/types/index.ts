export const UNSUBSCRIBE = "UNSUBSCRIBE";
export const JOIN_GAME = "JOIN_GAME";
export const LEAVE_GAME = "LEAVE_GAME";
export const USER_GAME_DETAILS = "USER_GAME_DETAILS";

export type TUserGameDetails = {
  gameId: string;
  currentCode: string;
  cursorPosition: number;
  timestamp: number;
  completed: boolean;
};
