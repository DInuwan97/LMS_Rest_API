const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//import { Schema, Mongoose } from "mongoose";

const UserSchema = new Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = User = mongoose.model('user',UserSchema);