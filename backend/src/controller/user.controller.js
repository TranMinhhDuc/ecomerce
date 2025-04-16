import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getProfile = async (req, res, next) => {
    try {
        const user = req.user; 
        
        return res.status(200).json({
            success: true,
            data: user
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

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error)
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const role = req.user.role;

        if(role === 'user') {
            const error = new Error('User can\'t access this resouces');
            error.statusCode = 403;
            throw(error);
        } 

        const { name, email, page, limit} = req.query;

        let filter = {};
        if(name) {
            filter.name = { $regex: name, $options: 'i' };
        }
        if(email) {
            filter.email = { $regex: email, $options: 'i' };
        }

        const totalUser = await User.countDocuments(filter);
        const totalPage = Math.ceil(parseInt(totalUser) / parseInt(limit));
        const users = await User.find(filter).skip(parseInt(limit) * (parseInt(page) - 1)).limit(limit);
        
        res.status(200).json({
            success: true, 
            data: {
                totalUser,
                currentPage: page,
                totalPage: totalPage,
                users
            }
        });

    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {

};

export const updateProfile = async (req, res, next) => {

};