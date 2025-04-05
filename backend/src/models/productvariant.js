import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    color: {
        type: String,
        required: [true, "Color is required"],
    },

    size: {
        type: String,
        enum: ["S", "M", "L", "XL", "XXL"],
        required: [true, "Size is required"],
    },

    quantity:{
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity cannot be negative"],
    }
},
    {
        _id: true
    }
);

export default variantSchema;