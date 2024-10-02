import { createClient } from "redis";
import prisma from "@vr/db";

const client = createClient({
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
  },
});

client.on("error", (err) => console.error("Redis Client Error:", err));

async function processDBRequest(json: string) {
  try {
    const request = JSON.parse(json) as {
      userId: string;
      isGuest: boolean;
      gameId: string;
      type: "LEAVE_GAME" | "JOIN_GAME";
    };

    switch (request.type) {
      case "LEAVE_GAME":
        await prisma.userGame.deleteMany({
          where: {
            gameId: request.gameId,
            ...(request.isGuest ?
              { guestId: request.userId }
            : { userId: request.userId }),
          },
        });
        console.log(
          `Processed LEAVE_GAME for user ${request.userId}, game ${request.gameId}`
        );
        break;
      case "JOIN_GAME":
        await prisma.userGame.create({
          data:
            request.isGuest ?
              {
                guestId: request.userId,
                gameId: request.gameId,
              }
            : {
                userId: request.userId,
                gameId: request.gameId,
              },
        });
        console.log(
          `Processed JOIN_GAME for user ${request.userId}, game ${request.gameId}`
        );
        break;
      default:
        console.error("Invalid request type");
        break;
    }
  } catch (error) {
    console.error("Failed to process DB request:", error);
    throw error;
  }
}

async function processDBRequestWithRetry(
  json: string,
  retryCount: number = 0,
  maxRetries: number = 3
) {
  try {
    await processDBRequest(json);
  } catch (error) {
    if (retryCount < maxRetries) {
      console.warn(`Retrying request (attempt ${retryCount + 1}):`, error);
      await processDBRequestWithRetry(json, retryCount + 1, maxRetries);
    } else {
      console.error(
        "Max retries reached, moving request to dead queue:",
        error
      );
      await client.lPush("dead-queue", json);
    }
  }
}

async function startWorker() {
  try {
    await client.connect();
    console.log("Worker connected to Redis.");

    while (true) {
      try {
        const db_request = await client.brPop("database", 0);
        if (db_request !== null) {
          await processDBRequestWithRetry(db_request.element);
        }
      } catch (error) {
        console.error("Error processing request:", error);
      }
    }
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
}

process.on("SIGTERM", async () => {
  console.log("Worker shutting down...");
  await client.quit();
  process.exit(0);
});

startWorker();
