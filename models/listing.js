import mongoose from "mongoose";
import User from "./user.js";

export const ListingSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    
    },

    descriptionArr : {
        type : Array,
        required : true
    },

    img : {
        type : String, //url
    },

    location : {
        type : String,
        required : true
    },

    status : {
        type : String ,
        enum : ["Lost" , "Found"]
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    Author: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    }],





})



export default mongoose.model("Listing", ListingSchema);