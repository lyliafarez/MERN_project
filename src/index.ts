import express from 'express';
import { setMongoConnection } from './config/mongo.config';
import { setUserRouting } from './routes/userRoutes';
import cors from "cors"
const app = express();
const port : number = 8080

app.use(cors())
app.use(express.json());

setMongoConnection()
setUserRouting(app)



app.listen(port,()=>{
    console.log("app working !")
})