import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
    },

    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending",
    },

    shipping: {
        carrier: {
            type: String,
            required: [true, "Carrier is required"],
        },

        address: {
            type: String,
            required: [true, "Address is required"],
        }
    },

    item: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            variant:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity cannot be less than 1"],
            }
        }
    ],

    payment: {
        method: {
            type: String,
            enum: ["credit_card", "paypal"],
            required: [true, "Payment method is required"],
        },

        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
        
        timsptamp: {
            type: Date,
            default: Date.now,
        }
    },

    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    }
},
{
    timestamps: true
}
);

const Order = mongoose.model("Order", orderSchema);
export default Order;