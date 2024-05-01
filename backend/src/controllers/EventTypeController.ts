import { Request, Response } from "express";
import { EventType } from "../models/EventType"

class EventTypeController {
  findAll = async (req: Request, res: Response, next: Function) => {
    const allEventTypes = await EventType.find()
    res.status(200).json({
      eventtypes: allEventTypes
    })
  };

  create = async (req: Request, res: Response, next: Function) => {
    res
      .status(201)
      .send(await EventType.create(req.body))
      .end();
    next();
  };

  delete = async (req: Request, res: Response, next: Function) => {
    res
      .status(200)
      .send(await EventType.findByIdAndDelete(req.params.id))
      .end();
    next();
  };
}

export const eventTypeController = Object.freeze(new EventTypeController());