import { WebSocket } from "ws";

export class User {
  public socket: WebSocket;
  public id: string;
  public name: string;
  public isGuest: boolean;

  constructor(
    socket: WebSocket,
    decoded: { id: string; isGuest?: boolean; name?: string }
  ) {
    this.socket = socket;
    this.id = decoded.id;
    this.name = decoded.name || "";
    if (!decoded.isGuest) this.isGuest = false;
    else this.isGuest = true;
  }
}
