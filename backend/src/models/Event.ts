import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
 id: {
    type: Number,
    required : false
 },
 categoryId: {
    type: Number,
    required : false
 },
 ownerId: {
    type: Number,
    required : false
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
    type: Date,
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
    required : false
 },
});

export const Event = mongoose.model("Event", eventSchema);

