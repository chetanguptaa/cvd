import { queueManager } from "../managers/QueueManager";
import { TUserGameDetails } from "../types";
import { User } from "./User";
import prisma from "@vr/db";

export class Game {
  public players: User[];
  public gameId: string;

  constructor(gameId: string, player: User) {
    this.players = [];
    this.players.push(player);
    queueManager.publishMessage(player, gameId, "JOIN_GAME");
    player.socket.send(
      JSON.stringify({
        t: "JOIN_GAME",
        m: "You have successfully, joined the game",
      })
    );
    this.gameId = gameId;
  }
  public addUser(user: User): void {
    try {
      const isPlayerPartOfTheGame = this.isPlayerPartOfTheGame(user);
      if (isPlayerPartOfTheGame) {
        user.socket.send(
          JSON.stringify({
            t: "JOIN_GAME",
            m: "You are already part of the game",
          })
        );
        return;
      }
      if (this.players.length === 8) {
        user.socket.send(
          JSON.stringify({
            t: "JOIN_GAME",
            e: "Sorry, game is already full",
          })
        );
        return;
      }
      this.players.push(user);
      queueManager.publishMessage(user, this.gameId, "JOIN_GAME");
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i].id === user.id) continue;
        this.players[i].socket.send(
          JSON.stringify({
            t: "JOIN_GAME",
            u: {
              i: user.id,
              ig: user.isGuest,
              n: user.name,
            },
            m: user.name + " have successfully, joined the game",
          })
        );
      }
      user.socket.send(
        JSON.stringify({
          t: "JOIN_GAME",
          u: {
            i: user.id,
            ig: user.isGuest,
            n: user.name,
          },
          m: "You have successfully, joined the game",
        })
      );
      return;
    } catch (error) {
      user.socket.send(
        JSON.stringify({
          t: "ERROR",
          e: "Some error occured, please try again later",
        })
      );
      return;
    }
  }

  public removeUser(user: User): void {
    try {
      const isPlayerPartOfTheGame = this.isPlayerPartOfTheGame(user);
      if (!isPlayerPartOfTheGame) {
        user.socket.send(
          JSON.stringify({
            t: "LEAVE_GAME",
            m: `You are not part of the game.`,
          })
        );
        return;
      }
      this.players = this.players.filter((p) => p.id !== user.id);
      queueManager.publishMessage(user, this.gameId, "LEAVE_GAME");
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i].id === user.id) continue;
        this.players[i].socket.send(
          JSON.stringify({
            t: "LEAVE_GAME",
            u: {
              i: user.id,
              ig: user.isGuest,
              n: user.name,
            },
            m: user.name + " have left the game",
          })
        );
      }
      user.socket.send(
        JSON.stringify({
          t: "LEAVE_GAME",
          m: `You left the game.`,
        })
      );
      return;
    } catch (error) {
      user.socket.send(
        JSON.stringify({
          t: "ERROR",
          e: `An error occurred while removing the user from the game.`,
        })
      );
      return;
    }
  }

  public async handleUserGameDetails(
    user: User,
    userGameDetails: TUserGameDetails
  ) {
    try {
      const isPlayerPartOfTheGame = this.isPlayerPartOfTheGame(user);
      if (!isPlayerPartOfTheGame) {
        user.socket.send(`You are not part of the game.`);
        return;
      }
    } catch (error) {
      user.socket.send(
        `An error occurred while removing the user from the game.`
      );
    }
  }

  private isPlayerPartOfTheGame(user: User) {
    const userInGame = this.players.find((p) => p.id === user.id);
    if (userInGame) return true;
    return false;
  }
}
