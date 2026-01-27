import jwt from "jsonwebtoken";
import User from "../models/user.js";




export const userProtect = async ( req , res , next ) => {
  try {

    const token = req.cookies.userToken;

    if(!token) {
      return res.status(401).json({
        message : "not authorized , please log in first"
      })
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id).select("-password");

    if(!user){
      return res.status(401).json({
        message : "user not found"
      })
    };

    req.user = {
      id : user._id,
      email : user.email,
      role : user.role,
    }
    next();


  } catch(error) {
    return res.status(500).json({
      message : "not authorised , please log in first",
      error: error.message
    })
  }
}



