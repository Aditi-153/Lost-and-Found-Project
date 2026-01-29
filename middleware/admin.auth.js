

export const AdminProtect = async( req , res , next) => {
    const userReq = req.user;

    if(!userReq) {
        return res.status(401).json({
            message : "Login required"
        })
    }

    const databaseUser = await User.findOne({
        user : req.user.id
    });
    

    if(!databaseUser.role === "admin"){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }

    next();
}





