import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get users");
});

router.post("/login", (req, res) => {
  res.send("Login user");
});

router.post("/register", (req, res) => {
  res.send("Register");
});

export default router;
