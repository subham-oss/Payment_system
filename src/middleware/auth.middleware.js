import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}