import jwt from "jsonwebtoken";

export const adminProtect = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;

    if (!token) {
      return res.redirect("/admin/login");
    }

    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);

    if (decoded.role !== "admin") {
      return res.redirect("/admin/login");
    }

    req.admin = decoded; 
    next(); 

  } catch (error) {
    
    res.clearCookie("adminToken");

    return res.status(401).json({
      error: "Unauthorized",
      message: "Invalid or expired admin token"
    });
  }
};
