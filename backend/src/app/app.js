import express from 'express';
import dbConnect from '../config/dbconnect.config.js';

const app = express();
app.use(express.json());

dbConnect();

export default app;