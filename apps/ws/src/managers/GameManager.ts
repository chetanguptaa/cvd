import { WebSocket } from "ws";
import { Game } from "../classes/Game";
import { User } from "../classes/User";
import { pubSubManager } from "./PubSubManager";
import { JOIN_GAME } from "../types";

class GameManager {
  private games: Game[];
  private users: User[];
  private static instance: GameManager;
  private constructor() {
    this.games = [];
    this.users = [];
  }
  public static getInstance() {
    if (!this.instance) {
      this.instance = new GameManager();
    }
    return this.instance;
  }
  addUser(user: User) {
    this.users.push(user);
    this.addHandler(user);
  }
  removeUser(ws: WebSocket) {
    const user = this.users.find((user) => user.socket === ws);
    if (!user) return;
    this.users = this.users.filter((user) => user.socket !== ws);
  }
  private async addHandler(user: User) {
    user.socket.on("message", async (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === JOIN_GAME) {
        const gameId = message.payload.gameId as string;
        let game = this.games.find((g) => g.gameId === gameId);
        if (!game) {
          game = new Game(user, gameId);
          this.games.push(game);
        } else {
          game.addUser(user);
        }
        await pubSubManager.subscribe(user, gameId);
      }
    });
  }
}

export const gameManager = GameManager.getInstance();

// here if the user clicks on `Start Racing on the UI we'll add him to any pending game else if the users click on create game or join room they go to that game only
