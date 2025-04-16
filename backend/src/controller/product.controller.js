import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if(!product) {
            const error = new Error("Product does\'t exists");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req, res, next) => {
    try {
        const { category, price, page, limit } = req.params;

        const filter = {};
        if(category) {
            filter.category = { $regex: category, $options: 'i'};
        }
        if(price) {
            filter.price = { $regex: price, $options: 'i'}
        }

        const totalProduct = await Product.countDocuments(filter);
        const totalPage = Math.ceil(parseInt(totalProduct) / parseInt(limit));
        const products = await Product.find(filter).skip(parseInt(limit) * (parseInt(page) - 1)).limit(limit);

        res.status(200).json({
            success: true,
            data: {
                totalProduct,
                totalPage,
                currentPage: page,
                products
            }
        });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if(req.user.role !== 'admin') {
            const error = new Error('User can\'t access this resouces');
            error.statusCode = 403;
            throw(error);
        }

        const { name, variant, description, price, quantity, images } = req.body;
        
        const existsProduct = await Product.findOne({ name });
        if(existsProduct) {
            const error = new Error('This product is already exists');
            error.statusCode = 409;
            throw error;
        }

        const newProduct = new Product({
            name,
            variant, 
            description,
            price,
            quantity, 
            images
        })

        await newProduct.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "Product is created successfully",
            data: {
                newProduct
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error)
    }
};

export const updateProduct = async (req, res, next) => {

};

export const deleteProduct = async (req, res, next) => {

};