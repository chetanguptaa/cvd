import { randomUUID } from "crypto";
import { GAME_RESULT, INIT_GAME } from "../types";
import { User } from "./User";
import prisma from "@vr/db";
import { userManager } from "../managers/UserManager";

export class Game {
  public gameId: string;
  public player1User: User;
  public player2User: User | null;
  public player3User: User | null;
  public player4User: User | null;
  public result: GAME_RESULT | null = null;

  constructor(
    player1User: User,
    player2User: User | null,
    player3User: User | null,
    player4User: User | null,
    gameId?: string
  ) {
    this.player1User = player1User;
    this.player2User = player2User;
    this.player3User = player3User;
    this.player4User = player4User;
    this.gameId = gameId ?? randomUUID();
  }
  async updatePlayer(player: User) {
    if (!this.player2User) {
      this.player2User = player;
    } else if (!this.player3User) {
      this.player3User = player;
    } else if (!this.player4User) {
      this.player4User = player;
    }
    userManager.broadcast(
      this.gameId,
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          gameId: this.gameId,
          player1: {
            name: this.player1User.name,
            id: this.player1User.id,
          },
          player2: {
            name: this.player2User?.name,
            id: this.player2User?.id,
          },
          player3: {
            name: this.player3User?.name,
            id: this.player3User?.id,
          },
          player4: {
            name: this.player4User?.name,
            id: this.player4User?.id,
          },
        },
      })
    );
  }
}
