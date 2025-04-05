import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"],
        maxLength: [50, "Password cannot exceed 20 characters"]
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    cart: [
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

    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
    ],
},
{
    timestamps: true
}
);

const User = mongoose.model("User", userSchema);
export default User;