import { WebSocketServer } from "ws";
import { gameManager } from "./managers/GameManager";
import url from "url";
import { extractAuthUser } from "./auth";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", async function connection(ws, req: Request) {
  try {
    const token: string = url.parse(req.url, true).query.token as string;
    const user = await extractAuthUser(token, ws);
    if (user) {
      gameManager.addUser(user);
      ws.send(
        JSON.stringify({
          type: "SERVER_READY",
        })
      );
    }
    ws.on("close", () => {
      if (user) gameManager.removeUser(user);
    });
  } catch (error) {
    ws.send(
      JSON.stringify({
        t: "AUTH",
        e: "You are not authorized",
      })
    );
  }
});
