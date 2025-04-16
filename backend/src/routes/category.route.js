import { Router } from "express";
import { createCategory, 
    deleteCategory, 
    getCategories, 
    updateCategory } from "../controller/category.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const categoryRoute = Router();

categoryRoute.get('/', getCategories);
categoryRoute.post('/',authMiddleware, createCategory);
categoryRoute.put('/:id',authMiddleware, updateCategory);
categoryRoute.delete('/:id',authMiddleware, deleteCategory);

export default categoryRoute;