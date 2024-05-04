"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserRouting = void 0;
const UserController_1 = require("../controllers/UserController");
/**
 * Fonction permettant d'exporter toute nos routes users vers app.ts
 * @param app
 */
const setUserRouting = (app) => {
    const endpoint = "users";
    app.get(`/${endpoint}`, UserController_1.userController.findAll);
    app.get(`/${endpoint}/:id`, UserController_1.userController.findById);
    app.post(`/${endpoint}`, UserController_1.userController.create);
    app.patch(`/${endpoint}/:id`, UserController_1.userController.update);
    app.delete(`/${endpoint}/:id`, UserController_1.userController.delete);
};
exports.setUserRouting = setUserRouting;
//# sourceMappingURL=userRoutes.js.map