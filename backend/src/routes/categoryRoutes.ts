import { categoryController } from "../controllers/CategoryController";

/**
 * Fonction permettant d'exporter toutes nos routes category vers app.ts
 * @param app
 */
export const setCategoryRouting = (app) => {
  const endpoint = "category";

  app.get(`/${endpoint}`, categoryController.findAll);
  app.get(`/${endpoint}/:id`, categoryController.findById);
  app.post(`/${endpoint}`, categoryController.create);
  app.patch(`/${endpoint}/:id`, categoryController.update);
  app.delete(`/${endpoint}/:id`, categoryController.delete);
};