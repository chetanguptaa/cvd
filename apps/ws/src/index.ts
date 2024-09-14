import { WebSocketServer } from "ws";
import { gameManager } from "./managers/GameManager";
import { createUser } from "./filter";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws, req: Request) {
  const user = createUser(ws);
  gameManager.addUser(user);
  ws.on("close", () => {
    gameManager.removeUser(ws);
  });
});
