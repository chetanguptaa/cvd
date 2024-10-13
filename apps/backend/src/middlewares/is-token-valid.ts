import { IUser } from "@cvd/common";
import prisma from "@cvd/db";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const isTokenValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractJwtFromRequest(req);
    if (!token) {
      return res.status(400).json({
        error: "Unauthorized",
      });
    }
    const user_data = jwt.verify(token, JWT_SECRET) as Omit<IUser, "email"> & {
      email: string;
    };
    if (user_data.email) {
      const user = await prisma.user.findFirst({
        where: {
          id: user_data.id,
        },
      });
      if (!user) return;
      req.user = {
        ...user_data,
        name: user.name,
      };
    } else {
      const guest = await prisma.guest.findFirst({
        where: {
          id: user_data.id,
        },
      });
      if (!guest) return;
      req.guest = {
        ...user_data,
        name: guest.username,
      };
    }
    next();
  } catch (err: any) {
    return res.status(404).json({
      error: "Some error occoured, please try again later",
    });
  }
};

const extractJwtFromRequest = (req: Request): string | null => {
  const authToken = req.cookies["auth-token"];
  const guestAuthToken = req.cookies["guest-auth-token"];
  let token = "";
  if (authToken && authToken.length > 0) token = authToken;
  else if (guestAuthToken && guestAuthToken.length > 0) token = guestAuthToken;
  if (token.length === 0) return null;
  return token;
};

export default isTokenValid;
