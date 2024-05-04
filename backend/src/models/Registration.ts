import mongoose from "mongoose";


const registrationSchema = new mongoose.Schema({
 id: {
    type: Number,
    required : false
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
 }
}, {
   toJSON: {
     transform: function(doc, ret) {
       ret.id = ret._id; // Renommer _id en id
       delete ret._id; // Supprimer le champ _id
       delete ret.__v; // Supprimer le champ __v si nécessaire
     }
   }
 });

export const Registration = mongoose.model("Registration", registrationSchema);

