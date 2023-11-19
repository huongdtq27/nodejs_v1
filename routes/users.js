import express from "express";
import { body, validationResult, query } from "express-validator";
import usersController from "../controllers/users.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get users");
});

router.post(
  "/login",
  body("email")
    .trim()
    .isEmail()
    .custom(async (value) => {
      if (value == "milo") throw new Error("Email is milo");
    }),
  usersController.login
);

router.post("/register", (req, res) => {
  res.send("Register");
});

export default router;
