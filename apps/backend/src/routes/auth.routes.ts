import { config } from "dotenv";
config();
import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import { SigninSchema, SignupSchema } from "@repo/common";
import prisma from "@repo/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const authRouter: Router = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const parsed = SignupSchema.safeParse(req.body);
    if (parsed.error) {
      return res.status(404).json({
        error: "Bad request",
      });
    }
    const hashedPassword = await bcrypt.hash(parsed.data.password, 12);
    const user = await prisma.user.create({
      data: {
        email: parsed.data.email,
        password: hashedPassword,
        name: parsed.data.name,
      },
    });
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET
    );
    return res.status(201).json({
      message: "Signed up successfully",
      token,
    });
  } catch (error) {
    return res.status(404).json({
      error: "some error occoured, please try again later",
    });
  }
});

authRouter.post("/signin", async (req: Request, res: Response) => {
  try {
    const parsed = SigninSchema.safeParse(req.body);
    if (parsed.error) {
      return res.status(404).json({
        error: "Bad request",
      });
    }
    const user = await prisma.user.findFirst({
      where: {
        email: parsed.data.email,
      },
    });
    if (!user) {
      return res.status(404).json({
        error: "User with this email does not exist",
      });
    }
    const isMatched = await bcrypt.compare(parsed.data.password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        error: "Password does not match",
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET
    );
    return res.status(200).json({
      message: "Signed in successfully",
      token,
    });
  } catch (error) {
    return res.status(404).json({
      error: "some error occoured, please try again later",
    });
  }
});

export default authRouter;
