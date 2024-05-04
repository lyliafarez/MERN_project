import { Request, Response } from "express";
import { EventModel } from "../models/Event";

/**
 * Logique de nos différente routes
 */
class EventController {
  /**
   * Permet de récuperer la liste des utilisateurs
   * @param req
   * @param res
   * @param next
   */
  /* findAll = async (req: Request, res: Response, next: Function) => {
    
    res
      .status(200)
      .send(await User.find())
      .end();
    next();
  }; */

  findAll = async (req: Request, res: Response, next: Function) => {
    
    const allEvents = await EventModel.find().populate('categoryId').populate('ownerId')
    res.status(200).json({
     events: allEvents
    })
  };

  /**
   * Récupération d'un users par son ID
   * @param req
   * @param res
   * @param next
   */
  findById = async (req: Request, res: Response, next: Function) => {
    res
      .status(200)
      .send(await EventModel.findById(req.params.id))
      .end();
    next();
  };

  /**
   * Creation d'un users
   * @param req
   * @param res
   * @param next
   */
  create = async (req: Request, res: Response, next: Function) => {
    res
      .status(201)
      .send(await EventModel.create(req.body))
      .end();
    next();
  };

  /**
   * Mise à jour d'un users
   * @param req
   * @param res
   * @returns
   */
  update = async (req: Request, res: Response) => {
    try {
      const updatedEvent = await EventModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ); // {new: true} pour retourner l'objet mis à jour
      if (!updatedEvent) {
        return res.status(404).send({ message: "Evenement non trouvé" });
      }
      res.status(200).send(updatedEvent);
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
      res.status(500).send({ error: "Erreur interne du serveur" });
    }
  };

  /**
   * Effacer un Users
   * @param req
   * @param res
   * @param next
   */
  delete = async (req: Request, res: Response, next: Function) => {
    res
      .status(200)
      .send(await EventModel.findByIdAndDelete(req.params.id))
      .end();
    next();
  };
}

export const eventController = Object.freeze(new EventController());