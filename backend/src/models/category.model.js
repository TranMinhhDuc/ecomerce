import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [50, "Name cannot exceed 50 characters"],
    },

    gender: {
        type: String,
        enum:['Nam', 'Nữ', 'Unisex'],
        required: true,
        maxLength: 100
    }
},
{
    timestamps: true
}
);

const Category = mongoose.model("Category", categorySchema);
export default Category;