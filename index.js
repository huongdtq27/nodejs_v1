import { hostname } from "os";
import { sum } from "./calculation.js";
import * as dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/users.js";

dotenv.config(); //must have
const app = express();

const port = process.env.PORT ?? 3000;

app.listen(port, async () => {
  console.log(`listen on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("From response 1");
});

app.use("/users", userRouter);
