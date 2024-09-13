import jwt from "jsonwebtoken";
import { WebSocket } from "ws";
import { User } from "../classes/User";
import { IUserJwtClaims } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const extractAuthUser = (token: string, ws: WebSocket): User => {
  const decoded = jwt.verify(token, JWT_SECRET) as IUserJwtClaims;
  return new User(ws, decoded);
};
