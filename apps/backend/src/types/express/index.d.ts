import { IGuest, IUser } from "@cvd/common";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
      guest?: IGuest;
    }
  }
}
