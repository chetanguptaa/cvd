import { User } from "./User";
import prisma from "@vr/db";

export class Game {
  public player1User?: User | null;
  public player2User?: User | null;
  public player3User?: User | null;
  public player4User?: User | null;
  public gameId: string;

  constructor(gameId: string, player1User?: User) {
    if (player1User) {
      this.player1User = player1User;
      this.player1User.socket.send("You have successfully, joined the game");
    }
    this.gameId = gameId;
  }
  public async addUser(user: User): Promise<void> {
    try {
      if (
        (this.player1User && this.player1User.id === user.id) ||
        (this.player2User && this.player2User.id === user.id) ||
        (this.player3User && this.player3User.id === user.id) ||
        (this.player4User && this.player4User.id === user.id)
      ) {
        user.socket.send("You are already in the game");
        return;
      }
      const playersInGame = await prisma.userGame.count({
        where: {
          id: this.gameId,
        },
      });
      if (playersInGame >= 4) {
        user.socket.send("Sorry, game is already full");
        return;
      }
      if (!this.player1User) {
        this.player1User = user;
        user.socket.send("You have successfully, joined the game");
      } else if (!this.player2User) {
        this.player2User = user;
        user.socket.send("You have successfully, joined the game");
      } else if (!this.player3User) {
        this.player3User = user;
        user.socket.send("You have successfully, joined the game");
      } else if (!this.player4User) {
        this.player4User = user;
        user.socket.send("You have successfully, joined the game");
      } else {
        user.socket.send("Sorry, game is already full");
        return;
      }
      if (user.isGuest) {
        await prisma.userGame.create({
          data: {
            guestId: user.id,
            gameId: this.gameId,
          },
        });
      } else {
        await prisma.userGame.create({
          data: {
            userId: user.id,
            gameId: this.gameId,
          },
        });
      }
    } catch (error) {
      user.socket.send("Some error occured, please try again later");
    }
  }

  public async removeUser(user: User): Promise<void> {
    try {
      let userSlot: null | string = null;
      if (this.player1User && this.player1User.id === user.id) {
        userSlot = "player1User";
      } else if (this.player2User && this.player2User.id === user.id) {
        userSlot = "player2User";
      } else if (this.player3User && this.player3User.id === user.id) {
        userSlot = "player3User";
      } else if (this.player4User && this.player4User.id === user.id) {
        userSlot = "player4User";
      }
      if (!userSlot) {
        user.socket.send(`You is not part of the game.`);
        return;
      }
      if (userSlot === "player1User") {
        this.player1User = null;
      } else if (userSlot === "player2User") {
        this.player2User = null;
      } else if (userSlot === "player3User") {
        this.player3User = null;
      } else if (userSlot === "player4User") {
        this.player4User = null;
      }
      await prisma.userGame.deleteMany({
        where: {
          gameId: this.gameId,
          ...(user.isGuest ? { guestId: user.id } : { userId: user.id }),
        },
      });
      user.socket.send(`left the game.`);
    } catch (error) {
      user.socket.send(
        `An error occurred while removing the user from the game.`
      );
    }
  }
}
