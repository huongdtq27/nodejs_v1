import express from "express";
import { body, validationResult, query } from "express-validator";

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("Login user");
  }
);

router.post("/register", (req, res) => {
  res.send("Register");
});

export default router;
