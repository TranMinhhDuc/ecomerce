import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import generateToken from "../utils/token.util.js";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const { name, email, password } = req.body;

        const existsEmail = await User.findOne({ email });
        if(existsEmail) {
            const error = new Error('This email is already in use');
            error.statusCode = 409;
            throw error;
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ 
            name, 
            email,
            password: hashedPassword
        });

        await newUser.save({ session });
        const token = generateToken(newUser._id);

        await session.commitTransaction();
        await session.endSession();

        return res.status(201).json({
            success: true,
            message: "User is created successfully",
            data: {
                token,
                user: newUser
            }
        });
    } catch (error) {
        (await session).abortTransaction();
        session.endSession();
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user) {
            const error = new Error('Can\'t find this email');
            error.statusCode = 404;
            throw(error);
        }

        const token = generateToken(user._id);
        return res.status(200).json({
            success: true,
            message: 'Login successfully',
            token,
            user
        });
    } catch (error) {
        next(error);
    }
};