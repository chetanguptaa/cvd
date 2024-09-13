import { WebSocketServer } from "ws";
import url from "url";
import { gameManager } from "./managers/GameManager";
import { extractAuthUser } from "./auth";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws, req: Request) {
  const token = url.parse(req.url, true).query.token as string;
  const user = extractAuthUser(token, ws);
  gameManager.addUser(user);
  ws.on("close", () => {
    gameManager.removeUser(ws);
  });
});
