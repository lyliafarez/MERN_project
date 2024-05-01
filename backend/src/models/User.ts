import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
 id: {
    type: Number,
    required : true
 },
 nom : {
    type: String,
    required : true
 },
 prenom : {
    type: String,
    required : true
 },
 age : {
    type: Number,
    required : true
 }
});

export const User = mongoose.model("User", userSchema);

