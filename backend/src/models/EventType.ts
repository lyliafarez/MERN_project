import mongoose from "mongoose";

const eventTypeSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  createdBy: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User',
   nullable : true
 },
  createdAt: {
   type: Date,
   default: Date.now 
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

export const EventType = mongoose.model("EventType", eventTypeSchema);
