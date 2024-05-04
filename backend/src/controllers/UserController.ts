import { Request, Response } from "express";
import { User } from "../models/User";
import { Registration } from "../models/Registration";

/**
 * Logique de nos différente routes
 */
class UserController {
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
    
    const allUsers = await User.find()
    res.status(200).json({
     users : allUsers
    })
  };

  /**
   * Récupération d'un users par son ID
   * @param req
   * @param res
   * @param next
   */
 /*  findById = async (req: Request, res: Response, next: Function) => {
    res
      .status(200)
      .send(await User.findById(req.params.id))
      .end();
    next();
  }; */

  findById = async (req: Request, res: Response, next: Function) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find registrations for the user
        const registrations = await Registration.find({ userId: req.params.id });

        // Extract event IDs from registrations
        const eventIds = registrations.map(registration => registration.eventId);

        // Send response with user and event IDs
        res.status(200).json({ user, eventIds });
    } catch (error) {
        console.error("Error fetching user and event IDs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


  /**
   * Récupération d'un users par son email
   * @param req
   * @param res
   * @param next
   */
  findByEmail = async (req: Request, res: Response, next: Function) => {
    res
      .status(200)
      .send(await User.findOne({email:req.params.email}))
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
      .send(await User.create(req.body))
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
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ); // {new: true} pour retourner l'objet mis à jour
      if (!updatedUser) {
        return res.status(404).send({ message: "Utilisateur non trouvé" });
      }
      res.status(200).send(updatedUser);
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
      .send(await User.findByIdAndDelete(req.params.id))
      .end();
    next();
  };
}

export const userController = Object.freeze(new UserController());