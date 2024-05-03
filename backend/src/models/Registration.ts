import mongoose from "mongoose";


const registrationSchema = new mongoose.Schema({
 id: {
    type: Number,
    required : true
 },
 userId: {
    type: mongoose.Schema.Types.ObjectId,
   ref: 'User',
   nullable : true
 },
 eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    nullable : true
 },
 
});

export const Registration = mongoose.model("Registration", registrationSchema);

