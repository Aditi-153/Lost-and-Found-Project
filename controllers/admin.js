import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const adminLogin = async ( req , res ) => {
    try {

        const { name , password } = req.body ;

        if(!name || !age || !email || !phone || !password) {
            return res.status(400).json({
                message : "Username and Password are required"
            });
        }

        

        

        

        
    } catch(err){
        return res.status(500).json({
            message : "Error in admin login",
            error : err.message
        })
        
    }
}
