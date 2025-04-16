import mongoose from "mongoose";
import Category from "../models/category.model.js";

export const getCategories = async (req, res, next) => {
    try {
        const { name, gender } = req.params;
        const filter = {};

        if(name) {
            filter.name = { $regex: name, $options: 'i'};
        }

        if(gender) {
            filter.gender = { $regex: gender, $options: 'i'}
        }
        const categories = await Category.find(filter);

        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        next(error);
    }
};

export const createCategory = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if( req.user.role !== "admin" ) {
            const error = new Error('User can\'t access this resouces');
            error.statusCode = 403;
            throw error;
        }

        const { name, gender } = req.body;

        const newCategory = new Category({ name, gender });
        await newCategory.save({ session });

        await session.commitTransaction();
        await session.endSession();
        
        res.status(201).json({
            success: true,
            message: 'Create category Successfully',
            data: newCategory 
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error)
    }

};

export const updateCategory = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        if(req.user.role === 'user') {
            const error = new Error('User can\'t access this resouces');
            error.statusCode = 403;
            throw error;
        }

        const categoryId = req.params.id;
        const { name, gender } = req.body;

        const updateCategory = await Category.findById(categoryId).session(session);
        
        if(name) {
            updateCategory.name = name;
        }
        if(gender) {
            updateCategory.gender = gender;
        }
        
        await updateCategory.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: updateCategory
        });

    } catch (error) {
        session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if(req.user.role === 'user') {
            const error = new Error("User can't access this resource");
            error.statusCode = 403;
            throw error;
        }

        const categoryId = req.params.id;
        const deleteCategory = await Category.findById(categoryId).session(session);

        if(!deleteCategory) {
            const error = new Error('Category doesn\'t exists');
            error.statusCode = 404;
            throw error;
        }

        await deleteCategory.deleteOne({ session });
        
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        })

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};