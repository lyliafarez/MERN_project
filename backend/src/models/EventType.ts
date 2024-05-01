import mongoose from "mongoose";


const eventTypeSchema = new mongoose.Schema({
 id: {
    type: Number,
    required : true
 },
 label : {
    type: String,
    required : true
 },
 description : {
   type: String,
   required : false
}
});

export const EventType = mongoose.model("EventType", eventTypeSchema);
