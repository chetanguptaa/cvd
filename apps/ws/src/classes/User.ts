import { WebSocket } from "ws";

export class User {
  public socket: WebSocket;
  public id: string;
  public name: string;

  constructor(socket: WebSocket, name: string, id: string) {
    this.socket = socket;
    this.id = id;
    this.name = name;
  }
}
