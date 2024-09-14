import { WebSocket } from "ws";
import { User } from "../classes/User";
import generateName from "../utils/random-name";
import generateId from "../utils/random-id";

export const createUser = (ws: WebSocket): User => {
  const name = generateName();
  const id = generateId();
  return new User(ws, name, id);
};
