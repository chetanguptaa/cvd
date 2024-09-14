import { User } from "../classes/User";

class UserManager {
  private interestedGames: Map<string, User[]>;
  private userGameMapping: Map<User, string>;
  private static instance: UserManager;
  private constructor() {
    this.interestedGames = new Map();
    this.userGameMapping = new Map();
  }
  public static getInstance() {
    if (!this.instance) {
      this.instance = new UserManager();
    }
    return this.instance;
  }
  addUser(user: User, gameId: string) {
    this.interestedGames.set(gameId, [
      ...(this.interestedGames.get(gameId) || []),
      user,
    ]);
    this.userGameMapping.set(user, gameId);
  }
  broadcast(gameId: string, message: string) {
    const users = this.interestedGames.get(gameId);
    if (!users) {
      console.error("No users in room");
      return;
    }
    users.forEach((user) => {
      user.socket.send(message);
    });
  }
  removeUser(user: User) {
    const gameId = this.userGameMapping.get(user);
    if (!gameId) {
      console.error("User was not interested in any game");
      return;
    }
    const game = this.interestedGames.get(gameId) || [];
    const remainingUsers = game.filter((u) => u !== user);
    this.interestedGames.set(gameId, remainingUsers);
    if (this.interestedGames.get(gameId)?.length === 0) {
      this.interestedGames.delete(gameId);
    }
    this.userGameMapping.delete(user);
  }
}

export const userManager = UserManager.getInstance();
