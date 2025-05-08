import { EventDTO } from "@/dtos";
import { EventService } from "@/services";
import { ResponseUtil } from "@/utils";
import { Request, Response } from "express";

/**
 * Retrieves all events. If the request is authenticated, also includes the
 * events which the user has RSVP'd to.
 *
 * @param {Request} req The ExpressJS request object.
 * @param {Response} res The ExpressJS response object.
 * @returns {Promise<void>}
 */
const getAllEvents = async (req: Request, res: Response) => {
  const currentUser = req?.user;

  const includeOptions = currentUser?.id
    ? {
        EventRsvps: {
          where: {
            userId: currentUser.id,
          },
        },
      }
    : {};

  const events = await EventService.findAll({
    include: includeOptions,
  });

  const eventsWithRsvpStatus = events.map((event: any) => {
    const isRsvpToEvent = event?.EventRsvps?.length > 0;
    delete event?.EventRsvps;
    return {
      ...event,
      isRsvpToEvent,
    };
  });

  return ResponseUtil.sendResponse(res, "SUCCESS", eventsWithRsvpStatus);
};

/**
 * Creates a new event with the provided details and returns the created event.
 *
 * @param {Request} req - The ExpressJS request object, containing the event details in the body and user information.
 * @param {Response} res - The ExpressJS response object.
 * @returns {Promise<void>} - A promise that resolves to sending the created event in the response.
 */
const createAnEvent = async (req: Request, res: Response) => {
  const { id } = req.user;
  const data = EventDTO.createEventSchema.parse(req.body);

  const event = await EventService.createOne({
    ...data,
    creatorId: id,
  });

  return ResponseUtil.sendResponse(res, "CREATED", event);
};

export default { getAllEvents, createAnEvent };
