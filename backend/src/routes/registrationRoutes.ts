import { registrationController } from "../controllers/RegistrationController";
/**
 * Fonction permettant d'exporter toute nos routes users vers app.ts
 * @param app
 */
export const setRegistrationRouting = (app) => {
  const endpoint = "registrations";

  app.get(`/${endpoint}`, registrationController.findAll);
  app.get(`/${endpoint}/:id`, registrationController.findById);
  app.post(`/${endpoint}`, registrationController.create);
  app.patch(`/${endpoint}/:id`, registrationController.update);
  app.delete(`/${endpoint}/:id`, registrationController.delete);
  app.delete(`/${endpoint}/:userId/cancel/:eventId`,registrationController.cancelRegistration)
  
};