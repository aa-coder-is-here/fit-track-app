import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = async(req,res,next) => {
  try {
    const token = req.cookies.token;
    
    if(!token){
      return res.status(401).json({
        message: "Unauthorized Token not Found",
      });
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized Token does not Match!",
      });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(`Error in Protected Middleware: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
};