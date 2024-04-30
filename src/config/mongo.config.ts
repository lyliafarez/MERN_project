import mongoose from "mongoose";

export const setMongoConnection = ()=>{

    mongoose.connect("mongodb://localhost:27017/mern_events")
    .then(()=>{
        console.log("Connected to db !")
    })
    .catch((error)=>{
        console.log(`Failed to connect : ${error}`)
    })
}