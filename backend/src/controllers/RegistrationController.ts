import { Request, Response } from "express";
import { Registration } from "../models/Registration";

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
  create = async (req: Request, res: Response, next: Function) => {
    res
      .status(201)
      .send(await Registration.create(req.body))
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
    res
      .status(200)
      .send(await Registration.findByIdAndDelete(req.params.id))
      .end();
    next();
  };
}

export const registrationController = Object.freeze(new RegistrationController());