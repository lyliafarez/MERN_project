import { Request, Response } from "express";
import { Registration } from "../models/Registration";
import { EventModel } from "../models/Event";

/**
 * Logique des différentes routes
 */
class RegistrationController {
  /**
   * Permet de récupérer la liste de toutes les inscriptions
   * @param req
   * @param res
   * @param next
   */
  findAll = async (req: Request, res: Response, next: Function) => {
    try {
      const allRegistrations = await Registration.find();
      res.status(200).json({ registrations: allRegistrations });
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  };

  /**
   * Récupération d'une inscription par son ID
   * @param req
   * @param res
   * @param next
   */
  findById = async (req: Request, res: Response, next: Function) => {
    try {
      const registration = await Registration.findById(req.params.id);
      if (!registration) {
        return res.status(404).json({ message: "Inscription non trouvée" });
      }
      res.status(200).json(registration);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  };

  /**
   * Création d'une inscription
   * @param req
   * @param res
   * @param next
   */
  create = async (req: Request, res: Response, next: Function) => {
    try {
      // Créer l'inscription
      const registration = await Registration.create(req.body);

      // Décrémenter le nombre de places disponibles de l'événement
      await EventModel.findByIdAndUpdate(registration.eventId, { $inc: { nbPlaces: -1 } });

      res.status(201).json(registration);
    } catch (error) {
      console.error('Erreur lors de la création de l\'inscription:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };

  /**
   * Mise à jour d'une inscription
   * @param req
   * @param res
   */
  update = async (req: Request, res: Response) => {
    try {
      const updatedRegistration = await Registration.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedRegistration) {
        return res.status(404).json({ message: "Inscription non trouvée" });
      }
      res.status(200).json(updatedRegistration);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };

  /**
   * Suppression d'une inscription
   * @param req
   * @param res
   * @param next
   */
  delete = async (req: Request, res: Response, next: Function) => {
    try {
      const { userId, eventId } = req.params;
      const deletedRegistration = await Registration.findOneAndDelete({ userId, eventId });

      if (!deletedRegistration) {
        return res.status(404).json({ message: "Inscription non trouvée" });
      }

      res.status(200).json({ message: "Inscription supprimée avec succès" });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'inscription:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };

  /**
   * Annulation d'une inscription
   * @param req
   * @param res
   * @param next
   */
  cancelRegistration = async (req: Request, res: Response, next: Function) => {
    try {
      const userId = req.params.userId;
      const eventId = req.params.eventId;

      // Supprimer l'inscription
      await EventModel.findByIdAndUpdate(eventId, { $inc: { nbPlaces: 1 } });
      const result = await Registration.deleteOne({ userId, eventId });

      if (result.deletedCount === 1) {
        // Incrémenter le nombre de places disponibles de l'événement
        

        res.status(200).json({ message: 'Inscription supprimée avec succès' });
      } else {
        res.status(404).json({ message: 'Inscription non trouvée' });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };

  /**
   * Récupération des inscriptions par ID d'événement
   * @param req
   * @param res
   * @param next
   */
  findByEventId = async (req: Request, res: Response, next: Function) => {
    try {
      const registrations = await Registration.find({ eventId: req.params.eventId });
      res.status(200).json({ registrations: registrations });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'inscription by ID:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };
}

export const registrationController = Object.freeze(new RegistrationController());
