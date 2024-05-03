import express from 'express';
import { setMongoConnection } from './config/mongo.config';
import { setUserRouting } from './routes/userRoutes';
import { setEventTypeRouting } from './routes/eventTypeRoutes';
import { setEventRouting } from './routes/eventRoutes';
import { setCategoryRouting } from './routes/categoryRoutes';
import { setRegistrationRouting } from './routes/registrationRoutes';
import cors from "cors"

const app = express();
const port : number = 8080

app.use(cors())
app.use(express.json());

setMongoConnection()
setUserRouting(app)
setEventTypeRouting(app)
setEventRouting(app)
setCategoryRouting(app)
setRegistrationRouting(app)



app.listen(port,()=>{
    console.log("app working !")
})