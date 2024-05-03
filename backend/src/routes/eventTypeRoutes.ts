import { eventTypeController } from "../controllers/EventTypeController";

/**
 * Fonction permettant d'exporter toute nos routes EventType vers app.ts
 * @param app
 */
export const setEventTypeRouting = (app) => {
  const endpoint = "eventTypes";

  app.get(`/${endpoint}`, eventTypeController.findAll);
  app.post(`/${endpoint}`, eventTypeController.create);
  app.delete(`/${endpoint}/:id`, eventTypeController.delete);
};