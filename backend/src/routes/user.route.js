import { Router } from "express";
import { getProfile, getUser, getUsers } from "../controller/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRoute = Router();

userRoute.get('/profile', authMiddleware, getProfile);
userRoute.get('/:id', authMiddleware, getUser);
userRoute.get('/', authMiddleware, getUsers);

export default userRoute;