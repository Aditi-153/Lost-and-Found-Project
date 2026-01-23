import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username : {
        type : String , 
        required : true ,
        unique : true , 
        trim : true ,
    },

    password : {
        type : String ,
        required : true ,
        minlength : 5 , 
    },

    role : {
        type : String ,
        default : "admin" ,
    },

    createdAt : {
        type : Date ,
        default : Date.now ,
    }


});


module.exports = mongoose.model('Admin', adminSchema);

