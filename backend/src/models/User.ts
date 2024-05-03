import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
 id: {
    type: Number,
    required : false
 },
 name : {
    type: String,
    required : true
 },
 lastname : {
    type: String,
    required : true
 },
 email: {
   type: String,
   required : true
 },
 age : {
    type: Number,
    required : true
 },
 isAdmin:{
   type: Boolean,
   required : true,
   default : false
 },

 password : {
   type: String,
   required : true
}
});

export const User = mongoose.model("User", userSchema);

