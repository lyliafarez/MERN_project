import express from 'express';
import { setMongoConnection } from './config/mongo.config';
import { setUserRouting } from './routes/userRoutes';
const app = express();
const port : number = 8080

setMongoConnection()
setUserRouting(app)

app.listen(port,()=>{
    console.log("app working !")
})