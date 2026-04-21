import User from "../models/User.js";
import jwt from "jsonwebtoken"

// Middleware to protect route
export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        req.user = user;
        next();
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }

}