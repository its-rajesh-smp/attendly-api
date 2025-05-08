import { EventRsvpController } from "@/controllers";
import express from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/:eventId", AuthMiddleware, EventRsvpController.rsvpToEvent);
router.delete("/:eventId", AuthMiddleware, EventRsvpController.unRsvpFromEvent);

export default router;
