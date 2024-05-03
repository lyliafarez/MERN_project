import { Request, Response } from "express";
import { Registration } from "../models/Registration";
import { EventModel } from "../models/Event";
/**
 * Logique de nos différente routes
 */
class RegistrationController {
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
    
    const allRegistrations = await Registration.find()
    res.status(200).json({
     registrations: allRegistrations
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
      .send(await Registration.findById(req.params.id))
      .end();
    next();
  };

  /**
   * Creation d'un users
   * @param req
   * @param res
   * @param next
   */
  create = async (req, res, next) => {
    try {
      // Create the registration
      const registration = await Registration.create(req.body);
  
      // Decrement the available places of the event
      await EventModel.findByIdAndUpdate(registration.eventId, { $inc: { nbPlaces: -1 } });
  
      res.status(201).json(registration);
    } catch (error) {
      console.error('Error creating registration:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  /**
   * Mise à jour d'un users
   * @param req
   * @param res
   * @returns
   */
  update = async (req: Request, res: Response) => {
    try {
      const updatedRegistration = await Registration.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ); // {new: true} pour retourner l'objet mis à jour
      if (!updatedRegistration) {
        return res.status(404).send({ message: "inscription non trouvé" });
      }
      res.status(200).send(updatedRegistration);
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
    try {
      const { userId, eventId } = req.params;
      const deletedRegistration = await Registration.findOneAndDelete({ userId, eventId });
  
      if (!deletedRegistration) {
        return res.status(404).send("L'enregistrement n'a pas été trouvé.");
      }
  
      res.status(200).send("L'enregistrement a été supprimé avec succès.");
    } catch (error) {
      // Gérer les erreurs
      next(error);
    }
  };

  cancelRegistration = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const eventId = req.params.eventId;
  
      // Delete the registration
      const result = await Registration.deleteOne({ userId, eventId });
  
      if (result.deletedCount === 1) {
        // Increment the available places of the event
        await EventModel.findByIdAndUpdate(eventId, { $inc: { nbPlaces: 1 } });
        
        res.status(200).json({ message: 'Registration deleted successfully' });
      } else {
        res.status(404).json({ message: 'Registration not found' });
      }
    } catch (error) {
      console.error('Error deleting registration:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

export const registrationController = Object.freeze(new RegistrationController());