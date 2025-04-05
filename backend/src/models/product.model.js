import mongoose from "mongoose";
import variantSchema from "./productvariant";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [50, "Name cannot exceed 50 characters"],
    },

    brand: {
        type: String,
        required: [true, "Brand is required"],
        trim: true,
        maxLength: [50, "Brand cannot exceed 50 characters"],
    },

    variant: [ variantSchema ],

    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxLength: [500, "Description cannot exceed 500 characters"],
    },

    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },

    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity cannot be negative"],
    },

    images: {
        type: Array,
        default: [],
    },

    ratings: {
        type: Number,
        default: 0,
    },

    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",

    },
    
    category: {
        type: String,
        ref: "Category",
    },

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},
{
    timestamps: true
}
);

const Product = mongoose.model("Product", productSchema);
export default Product;