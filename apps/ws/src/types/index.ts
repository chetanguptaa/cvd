export const INIT_GAME = "init_game";
export const GAME_ALERT = "game_alert";
export const GAME_ADDED = "game_added";

export type GAME_STATUS =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ABANDONED"
  | "TIME_UP"
  | "PLAYER_EXIT";

export type GAME_RESULT =
  | "PLAYER_1_WINS"
  | "PLAYER_2_WINS"
  | "PLAYER_3_WINS"
  | "PLAYER_4_WINS";

export interface IUserJwtClaims {
  userId: string;
  name: string;
  isGuest?: boolean;
}
