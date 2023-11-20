import express from "express";
import { userController } from "../controllers/index.js";
import { body } from "express-validator";
import { checkPermissionByToken } from "../authentication/auth.js";

const router = express.Router();

router.post("/register", userController.register);

router.post("/login", body("email").isEmail(), body("password").isLength({ min: 5 }), userController.login);

router.get("/:name", checkPermissionByToken(["admin"]), userController.getUserByName);
export default router;
