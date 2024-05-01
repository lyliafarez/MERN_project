import { eventTypeController } from "../controllers/EventTypeController";

/**
 * Fonction permettant d'exporter toute nos routes users vers app.ts
 * @param app
 */
export const setEventTypeRouting = (app) => {
  const endpoint = "eventTypes";

  app.get(`/${endpoint}`, eventTypeController.findAll);
  app.post(`/${endpoint}`, eventTypeController.create);

};