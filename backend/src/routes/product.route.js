import { Router } from "express";
import { getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
 } from "../controller/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const productRoute = Router();

productRoute.get("/:id", getProduct);
productRoute.get("/", getProducts);
productRoute.post("/",authMiddleware, createProduct);
productRoute.put("/",authMiddleware, updateProduct);
productRoute.delete("/", authMiddleware, deleteProduct);

export default productRoute;