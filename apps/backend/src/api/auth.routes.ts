import { config } from "dotenv";
config();
import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import { IUser, SigninSchema, SignupSchema } from "@cvd/common";
import prisma from "@cvd/db";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import randomName from "../utils/random-name";
import expiryToken from "../constants/expiry-token";

const JWT_SECRET = process.env.JWT_SECRET!;

const authRouter: Router = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const parsed = SignupSchema.safeParse(req.body);
    if (parsed.error) {
      return res.status(404).json({
        error: parsed.error,
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
    res.cookie("auth-token", token, {
      expires: expiryToken.UserTokenExpiry(),
      sameSite: "lax",
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
    });
    res.clearCookie("guest-auth-token");
    return res.status(201).json({
      message: "Signed up successfully",
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
        error: parsed.error,
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
    res.cookie("auth-token", token, {
      expires: expiryToken.UserTokenExpiry(),
      sameSite: "lax",
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
    });
    res.clearCookie("guest-auth-token");
    return res.status(200).json({
      message: "Signed in successfully",
    });
  } catch (error) {
    return res.status(404).json({
      error: "some error occoured, please try again later",
    });
  }
});

authRouter.get("/guest/signup", async (req: Request, res: Response) => {
  try {
    const name = randomName();
    console.log("hi tehre betich ");

    const guest = await prisma.guest.create({
      data: {
        username: name,
      },
    });
    const token = jwt.sign(
      {
        id: guest.id,
      },
      JWT_SECRET
    );
    res.cookie("guest-auth-token", token, {
      expires: expiryToken.UserTokenExpiry(),
      sameSite: "lax",
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
    });
    return res.status(201).json({
      message: "You are continuing as a guest",
    });
  } catch (error) {
    console.log("error is this ", error);

    return res.status(404).json({
      error: "some error occoured, please try again later",
    });
  }
});

authRouter.get("/validate", (req: Request, res: Response) => {
  try {
    const authToken = req.cookies["auth-token"];
    if (!authToken) {
      return res.status(200).json({
        isLoggedIn: false,
      });
    }
    const decoded = jwt.verify(authToken, JWT_SECRET) as IUser;
    if (!decoded) {
      return res.status(200).json({
        isLoggedIn: false,
      });
    }
    return res.status(200).json({
      isLoggedIn: true,
    });
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(200).json({
        isLoggedIn: false,
      });
    } else {
      return res.status(200).json({
        error: "some error occured, please try again later",
      });
    }
  }
});

authRouter.post("/logout", async (req: Request, res: Response) => {
  try {
    res.clearCookie("auth-token");
    res.clearCookie("guest-auth-token");
    res.sendStatus(200);
  } catch (error) {
    return res.status(404).json({
      error: "some error occoured, please try again later",
    });
  }
});

export default authRouter;
