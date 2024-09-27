import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";
import { IUser } from "@vr/common";
import prisma from "@vr/db";
import { WebSocket } from "ws";
import { User } from "../classes/User";

const JWT_SECRET = process.env.JWT_SECRET!;

export type TUserJwtClaims = Omit<IUser, "email"> & {
  email?: string;
  isGuest?: boolean;
  name?: string;
};

export const extractAuthUser = async (token: string, ws: WebSocket) => {
  const decoded = jwt.verify(token, JWT_SECRET) as TUserJwtClaims;
  if (decoded.email) {
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
    });
    if (!user) return null;
    decoded.name = user.name;
    decoded.isGuest = false;
  } else {
    const guest = await prisma.guest.findFirst({
      where: {
        id: decoded.id,
      },
    });
    if (!guest) return null;
    decoded.name = guest.username;
    decoded.isGuest = true;
  }
  return new User(ws, decoded);
};
