import { WebSocket } from "ws";

export class User {
  public socket: WebSocket;
  public id: string;
  public name: string;

  constructor(socket: WebSocket, decoded: { id: string; name: string }) {
    this.socket = socket;
    this.id = decoded.id;
    this.name = decoded.name;
  }
}
