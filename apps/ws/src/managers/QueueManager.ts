import { config } from "dotenv";
config();
import { createClient, RedisClientType } from "redis";
import { User } from "../classes/User";

const REDIS_URL = process.env.REDIS_URL!;

export class QueueManager {
  private static instance: QueueManager;
  private redisClient: RedisClientType;
  private constructor() {
    this.redisClient = createClient({
      url: REDIS_URL,
    });
    this.redisClient.connect();
  }

  public static getInstance(): QueueManager {
    if (!QueueManager.instance) {
      QueueManager.instance = new QueueManager();
    }
    return QueueManager.instance;
  }

  public publishMessage(user: User, gameId: string, type: string) {
    this.redisClient.lPush(
      "database",
      JSON.stringify({
        userId: user.id,
        gameId,
        type,
        isGuest: user.isGuest,
      })
    );
  }

  public async disconnect() {
    try {
      await this.redisClient.quit();
    } catch (error) {
      console.error("Error disconnecting from Redis:", error);
    }
  }
}

export const queueManager = QueueManager.getInstance();
