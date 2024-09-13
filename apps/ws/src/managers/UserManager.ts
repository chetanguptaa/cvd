import { WebSocket } from "ws";
import { User } from "../classes/User";

class UserManager {
  private interestedSockets: Map<string, User[]>;
  private userRoomMapping: Map<User, string>;
  private static instance: UserManager;
  private constructor() {
    this.interestedSockets = new Map();
    this.userRoomMapping = new Map();
  }
  public static getInstance() {
    if (!this.instance) {
      this.instance = new UserManager();
    }
    return this.instance;
  }
  addUser(user: User, roomId: string) {
    this.interestedSockets.set(roomId, [
      ...(this.interestedSockets.get(roomId) || []),
      user,
    ]);
    this.userRoomMapping.set(user, roomId);
  }
  broadcast(roomId: string, message: string) {
    const users = this.interestedSockets.get(roomId);
    if (!users) {
      console.error("No users in room?");
      return;
    }
    users.forEach((user) => {
      user.socket.send(message);
    });
  }
  removeUser(user: User) {
    const roomId = this.userRoomMapping.get(user);
    if (!roomId) {
      console.error("User was not interested in any room?");
      return;
    }
    const room = this.interestedSockets.get(roomId) || [];
    const remainingUsers = room.filter((u) => u !== user);
    this.interestedSockets.set(roomId, remainingUsers);
    if (this.interestedSockets.get(roomId)?.length === 0) {
      this.interestedSockets.delete(roomId);
    }
    this.userRoomMapping.delete(user);
  }
}

export const userManager = UserManager.getInstance();
