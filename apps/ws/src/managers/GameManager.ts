import { WebSocket } from "ws";
import { userManager } from "./UserManager";
import { GAME_ADDED, GAME_ALERT, INIT_GAME } from "../types";
import { Game } from "../classes/Game";
import { User } from "../classes/User";

class GameManager {
  private games: Game[];
  private users: User[];
  private pendingGameId: string | null;
  private static instance: GameManager;
  private constructor() {
    this.games = [];
    this.users = [];
    this.pendingGameId = null;
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
    if (!user) {
      console.error("User not found?");
      return;
    }
    this.users = this.users.filter((user) => user.socket !== ws);
    userManager.removeUser(user);
  }
  private addHandler(user: User) {
    user.socket.on("message", async (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === INIT_GAME) {
        if (this.pendingGameId) {
          const game = this.games.find((x) => x.gameId === this.pendingGameId);
          if (!game) {
            console.error("Pending game not found?");
            return;
          }
          if (
            user === game.player1User ||
            user === game.player2User ||
            user === game.player3User ||
            user === game.player4User
          ) {
            userManager.broadcast(
              game.gameId,
              JSON.stringify({
                type: GAME_ALERT,
                payload: {
                  message: "Trying to Connect with yourself?",
                },
              })
            );
            return;
          }
          userManager.addUser(user, game.gameId);
          await game?.updatePlayer(user);
          this.pendingGameId = null;
        } else {
          const game = new Game(user, null, null, null);
          this.games.push(game);
          this.pendingGameId = game.gameId;
          userManager.addUser(user, game.gameId);
          userManager.broadcast(
            game.gameId,
            JSON.stringify({
              type: GAME_ADDED,
              gameId: game.gameId,
            })
          );
        }
      }
    });
  }
}

export const gameManager = GameManager.getInstance();
