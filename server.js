import { hostname } from "os";
import * as dotenv from "dotenv";
dotenv.config(); //must have, to read env

import express from "express";
import userRouter from "./routes/users.js";
import connect from "./database/database.js";

const app = express();
app.use(express.json()); //middleware parses incoming requests with JSON payloads

const port = process.env.PORT;

app.listen(port, async () => {
  await connect();
  console.log(`listen on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("From response 1");
});

app.use("/users", userRouter);
