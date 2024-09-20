import { IUser } from "@vr/common";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const isTokenValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth_header = req.headers["authorization"];
    console.log(auth_header);

    if (!auth_header) {
      return res.status(400).json({
        error: "Unauthorized",
      });
    }
    const token = auth_header.split("Bearer ")[1];
    const user_data = jwt.verify(token, JWT_SECRET) as IUser;
    console.log(user_data);

    if (!user_data.email) {
      throw new Error();
    }
    req.user = user_data;
    next();
  } catch (err: any) {
    return res.status(404).json({
      error: "Some error occoured, please try again later",
    });
  }
};

export default isTokenValid;
