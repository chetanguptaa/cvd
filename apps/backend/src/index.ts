import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import authRouter from "./api/auth.routes";
import userRouter from "./api/user.routes";
import isTokenValid from "./middlewares/is-token-valid";
import guestRouter from "./api/guest.routes";
import gameRouter from "./api/game.routes";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/user", isTokenValid, userRouter);
app.use("/guest", isTokenValid, guestRouter);
app.use("/game", isTokenValid, gameRouter);

app.listen(PORT, () => {
  console.log("app is listening on port ", PORT);
});
