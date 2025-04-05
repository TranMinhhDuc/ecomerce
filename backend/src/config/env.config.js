import dotenv from "dotenv";

dotenv.config("/.env");

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export {PORT, DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN};    