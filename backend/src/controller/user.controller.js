import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getProfile = async (req, res, next) => {
    try {
        const user = req.user; 
        
        return pes.status(200).json({
            user
        });
    } catch (error) {
        next(error);
    }
};
export const getUser = async (req, res, next) => {
    try {
        const role = req.user.role;
        
        if(role === 'user') {
            const error = new Error('User can\'t access this resouces');
            error.statusCode = 403;
            throw(error);
        }

        const userId = req.params.id;
        const user = await User.findById(userId);

        return res.status(200).json({
            user
        });
    } catch (error) {
        next(error)
    }
};

export const getUsers = async (req, res, next) => {

};