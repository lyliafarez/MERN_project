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
    try {
      const eventData = {
        ...req.body,
        createdAt: new Date()
      };
      
      const newEventType = await EventType.create(eventData);
  
      res.status(201).json(newEventType);
    } catch (error) {
      console.error("Erreur lors de la création de l'événement : ", error);
      res.status(500).json({ error: "Erreur lors de la création de l'événement" });
    }
  };

  delete = async (req: Request, res: Response, next: Function) => {
    res
      .status(204)
      .send(await EventType.findByIdAndDelete(req.params.id))
      .end();
    next();
  };
}

export const eventTypeController = Object.freeze(new EventTypeController());