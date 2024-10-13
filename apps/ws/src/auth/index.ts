import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";
import { IUser } from "@cvd/common";
import prisma from "@cvd/db";
import { WebSocket } from "ws";
import { User } from "../classes/User";

const JWT_SECRET = process.env.JWT_SECRET!;

export type TUserJwtClaims = IUser;

export const extractAuthUser = async (token: string, ws: WebSocket) => {
  const decoded = jwt.verify(token, JWT_SECRET) as TUserJwtClaims;
  if (decoded.id) {
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
    });
    if (!user) return null;
    decoded.name = user.name;
  }
  return new User(ws, decoded);
};
