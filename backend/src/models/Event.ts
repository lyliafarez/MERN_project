import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
 id: {
    type: Number,
    required : true
 },
 categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventType',
    nullable : true
  },
 ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    nullable : true
  },
 title : {
    type: String,
    required : true
 },
 description : {
    type: String,
    required : true
 },
 date : {
    type: String,
    required : true
 },
 address : {
    type: String,
    required : false
 },
 pictures : {
    type: Array,
    required : false
 },
 links : {
    type: Array,
    required : false
 },
 isActive : {
    type: Boolean,
    required : true
 },
});

export const EventModel = mongoose.model("Event", eventSchema);

