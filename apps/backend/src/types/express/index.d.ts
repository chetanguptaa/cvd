import { IUser } from "@repo/common";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
