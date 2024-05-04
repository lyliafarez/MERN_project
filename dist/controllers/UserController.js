"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const User_1 = require("../models/User");
/**
 * Logique de nos différente routes
 */
class UserController {
    constructor() {
        /**
         * Permet de récuperer la liste des utilisateurs
         * @param req
         * @param res
         * @param next
         */
        this.findAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res
                .status(200)
                .send(yield User_1.User.find())
                .end();
            next();
        });
        /**
         * Récupération d'un users par son ID
         * @param req
         * @param res
         * @param next
         */
        this.findById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res
                .status(200)
                .send(yield User_1.User.findById(req.params.id))
                .end();
            next();
        });
        /**
         * Creation d'un users
         * @param req
         * @param res
         * @param next
         */
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res
                .status(201)
                .send(yield User_1.User.create(req.body))
                .end();
            next();
        });
        /**
         * Mise à jour d'un users
         * @param req
         * @param res
         * @returns
         */
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield User_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // {new: true} pour retourner l'objet mis à jour
                if (!updatedUser) {
                    return res.status(404).send({ message: "Utilisateur non trouvé" });
                }
                res.status(200).send(updatedUser);
            }
            catch (error) {
                console.error("Erreur de mise à jour :", error);
                res.status(500).send({ error: "Erreur interne du serveur" });
            }
        });
        /**
         * Effacer un Users
         * @param req
         * @param res
         * @param next
         */
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res
                .status(200)
                .send(yield User_1.User.findByIdAndDelete(req.params.id))
                .end();
            next();
        });
    }
}
exports.userController = Object.freeze(new UserController());
//# sourceMappingURL=UserController.js.map