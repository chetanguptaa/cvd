"use server";

import prisma from "@cvd/db";
import { cookies } from "next/headers";
import decodeToken from "./utils/decode-token";

export default async function validateUserToken(): Promise<
  { success: boolean } & { error?: string }
> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("user-token")?.value;
    if (!token) {
      return {
        success: false,
        error: "unauthenticated",
      };
    }
    const userId = await decodeToken(token);
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "Some error occurred, please try again later",
    };
  }
}
