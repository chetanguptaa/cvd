"use server";

import randomName from "@/lib/random-name";
import prisma from "@cvd/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function signup(): Promise<{
  success: boolean;
  data?: {
    token: string;
    name: string;
  };
  error?: string;
}> {
  try {
    const user = await prisma.user.create({
      data: {
        name: randomName(),
      },
    });
    const tokenData = {
      id: user.id,
      name: user.name,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!);
    cookies().set({
      name: "user-token",
      value: token,
      httpOnly: process.env.NODE_ENV !== "production",
      sameSite: "lax",
    });
    return {
      success: true,
      data: {
        token: user.id,
        name: user.name,
      },
    };
  } catch (error) {
    console.log("error is this ", error);

    return {
      success: false,
      error: "some error occured, please try again later",
    };
  }
}
