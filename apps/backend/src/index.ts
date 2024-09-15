import { config } from "dotenv";
config();
import express from "express";
import authRouter from "./routes/auth.routes";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("app is listening on port ", PORT);
});
