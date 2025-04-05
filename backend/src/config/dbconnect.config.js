import mongoose from "mongoose";
import { DATABASE_URL } from "./env.config.js";

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(DATABASE_URL);
        console.log("Database connected successfully:", connection.connection.host);
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); 
    }

};

export default dbConnect;
