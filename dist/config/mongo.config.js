"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMongoConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const setMongoConnection = () => {
    mongoose_1.default.connect("mongodb://localhost:27017/mern_events")
        .then(() => {
        console.log("Connected to db !");
    })
        .catch((error) => {
        console.log(`Failed to connect : ${error}`);
    });
};
exports.setMongoConnection = setMongoConnection;
//# sourceMappingURL=mongo.config.js.map