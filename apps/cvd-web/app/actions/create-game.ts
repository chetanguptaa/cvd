"use server";

import prisma from "@cvd/db";
import getUser from "./get-user";

export default async function createGame(): Promise<{ success: boolean } & { error?: string; gameId?: string }> {
  try {
    const res = await getUser();
    if (res.error) {
      return {
        success: false,
        error: res.error,
      };
    } else {
      const user = res.user;
      const gameId = await prisma.$transaction(async (tx) => {
        const game = await tx.game.create({
          data: {
            createdById: user?.id,
            code: '/* package main \nimport "fmt"\nfunc main() {\n\tfmt.Println("world!")\n*',
          },
        });
        const userId = user?.id;
        await tx.userGame.create({
          data: {
            userId: userId || "",
            gameId: game.id,
          },
        });
        return game.id;
      });
      return {
        success: true,
        gameId,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: "Some error occured, please try again later",
    };
  }
}
