import express from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserController } from "@/controllers";

const router = express.Router();

router.get("/me", AuthMiddleware, UserController.getUser);
router.post("/login", UserController.loginUser);
router.post("/register", UserController.registerUser);

export default router;
