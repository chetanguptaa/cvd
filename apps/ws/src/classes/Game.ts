import { randomUUID } from "crypto";
import { GAME_RESULT } from "../types";
import { WebSocket } from "ws";
import prisma from "@repo/db";
import { User } from "./User";

export class Game {
  public gameId: string;
  public player1User: User;
  public player2User: User | null;
  public player3User: User | null;
  public player4User: User | null;
  public result: GAME_RESULT | null = null;
  private startTime = new Date(Date.now());

  constructor(
    player1User: User,
    player2User: User | null,
    player3User: User | null,
    player4User: User | null,
    gameId?: string,
    startTime?: Date
  ) {
    this.player1User = player1User;
    this.player2User = player2User;
    this.player3User = player3User;
    this.player4User = player4User;
    this.gameId = gameId ?? randomUUID();
    if (startTime) {
      this.startTime = startTime;
    }
  }
  async updatePlayer(player: User) {
    if (!this.player2User) {
      this.player2User = player;
    } else if (!this.player3User) {
      this.player3User = player;
    } else if (!this.player4User) {
      this.player4User = player;
    }
  }
}
