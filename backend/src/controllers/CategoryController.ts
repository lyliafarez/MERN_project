import { Request, Response } from "express";
import { Category } from "../models/Category";

/**
 * Logique de nos différentes routes
 */
class CategoryController {
  /**
   * Permet de récuperer la liste des categories
   * @param req
   * @param res
   * @param next
   */
  findAll = async (req: Request, res: Response, next: Function) => {
    try {
      const allCategories = await Category.find();
      res.status(200).json({
        categories: allCategories
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      res.status(500).send({ error: "Erreur interne du serveur" });
    }
  };

  /**
   * Récupération d'une catégorie par son ID
   * @param req
   * @param res
   * @param next
   */
  findById = async (req: Request, res: Response, next: Function) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).send({ message: "Catégorie non trouvée" });
      }
      res.status(200).json({ category });
    } catch (error) {
      console.error("Erreur lors de la récupération de la catégorie by ID:", error);
      res.status(500).send({ error: "Erreur interne du serveur" });
    }
  };

  /**
   * Création d'une catégorie
   * @param req
   * @param res
   * @param next
   */
  create = async (req: Request, res: Response, next: Function) => {
    try {
      const createdCategory = await Category.create(req.body);
      res.status(201).json({ category: createdCategory });
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie:", error);
      res.status(500).send({ error: "Erreur interne du serveur" });
    }
  };

  /**
   * Mise à jour d'une catégorie
   * @param req
   * @param res
   */
  update = async (req: Request, res: Response) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(404).send({ message: "Categorie introuvable" });
      }
      res.status(200).json({ category: updatedCategory });
    } catch (error) {
      console.error("Erreur de mise à jour de la catégorie:", error);
      res.status(500).send({ error: "Erreur interne du serveur" });
    }
  };

  /**
   * Suppression d'une catégorie
   * @param req
   * @param res
   * @param next
   */
  delete = async (req: Request, res: Response, next: Function) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        return res.status(404).send({ message: "Catégorie introuvable" });
      }
      res.status(200).json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
      console.error("Erreur de suppression de la catégorie:", error);
    }
  };
}

export const categoryController = Object.freeze(new CategoryController());
