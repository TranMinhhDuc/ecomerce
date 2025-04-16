import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token) {
            const error = new Error("unauthorized");
            error.name = "unthorizedError";
            return next(error);
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if(!user) {
            return res.status(404).json({
                message: "User not found"

            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
            error: error.message
        })
    }
};

export default authMiddleware;