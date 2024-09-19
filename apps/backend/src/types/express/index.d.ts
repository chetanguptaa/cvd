import { IGuest, IUser } from "@vr/common";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
      guest?: IGuest;
    }
  }
}
