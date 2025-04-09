import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    start: {
        type: Number,
        min: [1, "Start must be at least 1"],
        max: [5, "Start cannot exceed 5"],
    },
    comment: {
        type: String,
        trim: true,
        maxLength: [500, "Comment cannot exceed 500 characters"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
    }
},
{
    timestamps: true
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;