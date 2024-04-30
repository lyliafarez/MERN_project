import { Request, Response } from "express";
import { User } from "../models/User";

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
  findById = async (req: Request, res: Response, next: Function) => {
    res
      .status(200)
      .send(await User.findById(req.params.id))
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