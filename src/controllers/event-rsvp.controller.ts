import { EventRsvpDTO } from "@/dtos";
import { EventRsvpService } from "@/services";
import { ResponseUtil } from "@/utils";
import { Request, Response } from "express";

const rsvpToEvent = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { eventId } = EventRsvpDTO.eventRsvpSchema.parse(req.params);

  await EventRsvpService.createOne({
    userId: id,
    eventId,
  });

  return ResponseUtil.sendResponse(res, "SUCCESS", true);
};

const unRsvpFromEvent = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { eventId } = EventRsvpDTO.eventRsvpSchema.parse(req.params);

  const isDeleted = await EventRsvpService.findOneAndDelete({
    userId: id,
    eventId,
  });

  if (!isDeleted) return ResponseUtil.sendErrorResponse(res, "NOT_FOUND");

  return ResponseUtil.sendResponse(res, "SUCCESS", true);
};

export default { rsvpToEvent, unRsvpFromEvent };
