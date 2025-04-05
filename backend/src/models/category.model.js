import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [50, "Name cannot exceed 50 characters"],
    },

},
{
    timestamps: true
}
);

const Category = mongoose.model("Category", categorySchema);
export default Category;