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
      ret.id = ret._id; 
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const EventType = mongoose.model("EventType", eventTypeSchema);
