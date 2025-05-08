import { EventController } from "@/controllers";
import { OptionalAuthMiddleware } from "@/middlewares/optional-auth.middleware";
import express from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/all", OptionalAuthMiddleware, EventController.getAllEvents);
router.post("/", AuthMiddleware, EventController.createAnEvent);

export default router;
