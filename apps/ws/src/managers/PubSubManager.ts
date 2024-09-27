import { createClient, RedisClientType } from "redis";
import { User } from "../classes/User";

export class PubSubManager {
  private static instance: PubSubManager;
  private redisClient: RedisClientType;
  private subscriptions: Map<string, User[]>; // game to users mapping

  private constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();
  }

  public static getInstance(): PubSubManager {
    if (!PubSubManager.instance) {
      PubSubManager.instance = new PubSubManager();
    }
    return PubSubManager.instance;
  }

  public async subscribe(user: User, gameId: string) {
    if (!this.subscriptions.has(gameId)) {
      this.subscriptions.set(gameId, []);
    }
    if (this.subscriptions.has(gameId)) {
      const subscriptions = this.subscriptions.get(gameId);
      if (!subscriptions) return;
      const userInSubscriptions = subscriptions.find((u) => u.id === user.id);
      if (userInSubscriptions) return;
      for (let i = 0; i < subscriptions.length; i++) {
        subscriptions[i].socket.send(`${user.name} joined the game`);
      }
      subscriptions.push(user);
      if (subscriptions.length === 1) {
        try {
          await this.redisClient.subscribe(`${gameId}`, (message: any) => {
            this.handleMessage(gameId, message);
          });
        } catch (error) {
          console.error("Error subscribing to Redis channel:", error);
        }
      }
    }
  }

  public async unsubscribe(user: User, gameId: string) {
    const subscribers = this.subscriptions.get(gameId);
    if (subscribers) {
      const userInSubscribers = subscribers.find((s) => s.id === user.id);
      if (!userInSubscribers) return;
      this.subscriptions.set(
        gameId,
        subscribers.filter((sub) => sub.id !== user.id)
      );
      for (let i = 0; i < subscribers.length; i++) {
        if (subscribers[i].id === user.id) continue;
        subscribers[i].socket.send(`${user.name} left the game`);
      }
      if (this.subscriptions.get(gameId)?.length === 0) {
        try {
          await this.redisClient.unsubscribe(`${gameId}`);
        } catch (error) {
          console.error("Error unsubscribing from Redis channel:", error);
        }
      }
    }
  }

  private handleMessage(gameId: string, message: string) {
    this.subscriptions.get(gameId)?.forEach((user) => {
      user.socket.send(message.toString());
    });
  }

  public async disconnect() {
    try {
      await this.redisClient.quit();
    } catch (error) {
      console.error("Error disconnecting from Redis:", error);
    }
  }
}

export const pubSubManager = PubSubManager.getInstance();
