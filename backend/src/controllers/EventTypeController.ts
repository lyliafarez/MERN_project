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
        ...req.body, // Copier les données de la requête
        //createdBy: req.user._id,
        createdAt: new Date()
      };
      
      const newEventType = await EventType.create(eventData); // Créer l'événement avec les données modifiées
  
      res.status(201).json(newEventType); // Renvoyer la réponse avec le nouvel événement créé
    } catch (error) {
      console.error("Erreur lors de la création de l'événement : ", error);
      res.status(500).json({ error: "Erreur lors de la création de l'événement" }); // Gérer les erreurs
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