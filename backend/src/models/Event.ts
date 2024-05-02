import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
 id: {
    type: Number,
    required : true
 },
 categoryId: {
    type: Number,
    required : true
 },
 ownerId: {
    type: Number,
    required : true
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
    required : true
 },
});

export const Event = mongoose.model("Event", eventSchema);

