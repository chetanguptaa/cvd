import { cookies } from "next/headers";
import prisma from "@cvd/db";
import jwt from "jsonwebtoken";

export default async function getUser(): Promise<
  { success: boolean } & {
    error?: string;
    user?: {
      id: string;
      name: string;
      createdAt: Date;
    };
  }
> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("user-token")?.value;
    const decodedToken = jwt.verify(
      token || "",
      process.env.JWT_SECRET!
    ) as unknown as {
      id: string;
      name: string;
    };
    if (!decodedToken) {
      return {
        success: false,
        error: "User does not exist",
      };
    }
    const user = await prisma.user.findFirst({
      where: {
        id: decodedToken.id,
      },
    });
    if (!user) {
      return {
        success: false,
        error: "user does not exist",
      };
    }
    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      error: "Some error occured, please try again later",
    };
  }
}
