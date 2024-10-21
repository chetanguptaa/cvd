import { Game } from "../classes/Game";
import { User } from "../classes/User";
import { pubSubManager } from "./PubSubManager";
import {
  JOIN_GAME,
  joinGameSchema,
  LEAVE_GAME,
  leaveGameSchema,
  USER_GAME_DETAILS,
  userGameDetailsSchema,
} from "../types";
import prisma from "@cvd/db";

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
    for (let i = 0; i < this.users.length; i++) {
      if (user.id === this.users[i].id) {
        this.users[i] = {
          ...user,
        };
        this.addHandler(user);
        return;
      }
    }
    this.users.push(user);
    this.addHandler(user);
  }
  removeUser(u: User) {
    this.users = this.users.filter((user) => user.socket !== u.socket);
  }
  private async addHandler(user: User) {
    user.socket.on("message", async (data) => {
      try {
        const message = JSON.parse(data.toString());
        if (message.type === JOIN_GAME) {
          const res = joinGameSchema.safeParse(message);
          if (res.error) {
            return;
          }
          const gameId = res.data.payload.gameId;
          let game = this.games.find((g) => g.gameId === gameId);
          const gameInDB = await prisma.game.findFirst({
            where: {
              id: gameId,
            },
          });
          if (!gameInDB) {
            user.socket.send(
              JSON.stringify({
                t: "JOIN_GAME",
                e: "game does not exist",
              })
            );
            return;
          }
          if (!game) {
            game = new Game(gameId, user);
            this.games.push(game);
          } else {
            game.addUser(user);
          }
          await pubSubManager.subscribe(user, gameId);
        }
        if (message.type === LEAVE_GAME) {
          const res = leaveGameSchema.safeParse(message);
          if (res.error) {
            return;
          }
          const gameId = res.data.payload.gameId;
          let game = this.games.find((g) => g.gameId === gameId);
          if (!game) {
            user.socket.send(
              JSON.stringify({
                t: "LEAVE_GAME",
                e: "game does not exist",
              })
            );
            return;
          } else {
            game.removeUser(user);
          }
          await pubSubManager.unsubscribe(user, gameId);
        }
        if (message.type === USER_GAME_DETAILS) {
          const res = userGameDetailsSchema.safeParse(message);
          if (res.error) {
            return;
          }
          const gameId = res.data.payload.gameId;
          let game = this.games.find((g) => g.gameId === gameId);
          if (!game) {
            user.socket.send(
              JSON.stringify({
                t: "GAME",
                e: "game does not exist",
              })
            );
            return;
          } else {
            game.handleUserGameDetails(user, res.data);
          }
        }
      } catch (error) {
        user.socket.send(
          JSON.stringify({
            t: "GAME",
            e: "some error occured, please try again later",
          })
        );
        return;
      }
    });
  }
}

export const gameManager = GameManager.getInstance();

// here if the user clicks on `Start Racing on the UI we'll add him to any pending game else if the users click on create game or join room they go to that game only
