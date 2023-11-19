import { hostname } from "os";
import * as dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/users.js";

dotenv.config(); //must have, to read env
const app = express();
app.use(express.json()); //middleware parses incoming requests with JSON payloads

const port = process.env.PORT ?? 3000;

app.listen(port, async () => {
  console.log(`listen on port: ${port}`);
});

app.get("/", (req, res) => {
  debugger;
  res.send("From response 1");
});

app.use("/users", userRouter);
