import prisma from "@vr/db";
import { Request, Response, Router } from "express";

const gameRouter: Router = Router();

gameRouter.post("", async (req: Request, res: Response) => {
  try {
    let isGuest = false;
    const guest = req.guest;
    const user = req.user;
    if (guest) isGuest = true;
    const gameId = await prisma.$transaction(async (tx) => {
      if (guest) {
        const game = await tx.game.create({
          data: {
            createdByGuestId: guest.id,
          },
        });
        const guestId = guest.id;
        await tx.userGame.create({
          data: {
            guestId: guestId,
            gameId: game.id,
          },
        });
        return game.id;
      } else if (user && !isGuest) {
        const game = await tx.game.create({
          data: {
            createdByUserId: user.id,
          },
        });
        const userId = user.id;
        await tx.userGame.create({
          data: {
            userId: userId,
            gameId: game.id,
          },
        });
        return game.id;
      }
    });
    return res.status(201).json({
      message: "Game room created successfully",
      gameId,
    });
  } catch (error) {
    return res.status(500).json({
      error: "some error occoured, please try again later",
    });
  }
});

gameRouter.post("/join/:gameId", async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const guest = req.guest;
    const user = req.user;
    const isGuest = Boolean(guest);
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });
    if (!game) {
      return res.status(404).json({
        error: "Game not found.",
      });
    }
    if (game.status === "ENDED" || game.status === "STARTED") {
      return res.status(400).json({
        error:
          game.status === "ENDED" ?
            "Cannot join the game. The game has already ended."
          : "Cannot join the game. The game has already started",
      });
    }
    const existingUserGame = await prisma.userGame.findFirst({
      where: {
        gameId: gameId,
        OR: [
          { userId: user ? user.id : undefined },
          { guestId: guest ? guest.id : undefined },
        ],
      },
    });
    if (existingUserGame) {
      return res.status(400).json({
        error: "You have already joined this game.",
      });
    }
    if (isGuest && guest) {
      await prisma.userGame.create({
        data: {
          guestId: guest.id,
          gameId: gameId,
        },
      });
    } else if (user) {
      await prisma.userGame.create({
        data: {
          userId: user.id,
          gameId: gameId,
        },
      });
    } else {
      return res.status(400).json({
        error: "User or guest information is required to join the game.",
      });
    }
    return res.status(200).json({
      message: "You have successfully joined the game.",
      gameId: gameId,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred, please try again later.",
    });
  }
});

export default gameRouter;
