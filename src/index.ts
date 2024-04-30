import express from 'express';
import { setMongoConnection } from './config/mongo.config';
import { setUserRouting } from './routes/userRoutes';
const app = express();
const port : number = 8080

app.use(express.json());

setMongoConnection()
setUserRouting(app)



app.listen(port,()=>{
    console.log("app working !")
})