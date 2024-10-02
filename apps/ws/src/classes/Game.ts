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
    player.socket.send("You have successfully, joined the game");
    this.gameId = gameId;
  }
  public addUser(user: User): void {
    try {
      const isPlayerPartOfTheGame = this.isPlayerPartOfTheGame(user);
      if (isPlayerPartOfTheGame) {
        user.socket.send("You are already part of the game");
        return;
      }
      if (this.players.length === 8) {
        user.socket.send("Sorry, game is already full");
        return;
      }
      this.players.push(user);
      queueManager.publishMessage(user, this.gameId, "JOIN_GAME");
      user.socket.send("You have successfully, joined the game");
      return;
    } catch (error) {
      user.socket.send("Some error occured, please try again later");
      return;
    }
  }

  public removeUser(user: User): void {
    try {
      const isPlayerPartOfTheGame = this.isPlayerPartOfTheGame(user);
      if (!isPlayerPartOfTheGame) {
        user.socket.send(`You are not part of the game.`);
        return;
      }
      this.players = this.players.filter((p) => p.id !== user.id);
      queueManager.publishMessage(user, this.gameId, "LEAVE_GAME");
      user.socket.send(`You left the game.`);
      return;
    } catch (error) {
      user.socket.send(
        `An error occurred while removing the user from the game.`
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
