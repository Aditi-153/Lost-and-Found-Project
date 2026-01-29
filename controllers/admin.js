import User from "../models/user.js";

export const adminLogin = async ( req , res ) => {
    try {

        const { username , password } = req.body ;

        if(!username || !password) {
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
