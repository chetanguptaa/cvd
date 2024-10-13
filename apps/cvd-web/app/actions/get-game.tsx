"use server";

import prisma from "@cvd/db";

export default async function getGame(id: string): Promise<
  { success: boolean } & {
    error?: string;
  }
> {
  const game = await prisma.game.findFirst({
    where: {
      id,
    },
  });
  if (!game) {
    return {
      success: false,
      error: "Game does not exist",
    };
  }
  if (game.status === "ENDED") {
    return {
      success: false,
      error: "Game has already ended",
    };
  }
  return {
    success: true,
  };
}
