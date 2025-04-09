import express from 'express';
import dbConnect from '../config/dbconnect.config.js';
import errorMiddleware from '../middlewares/error.middleware.js';
import authRoute from '../routes/auth.route.js';
import userRoute from '../routes/user.route.js';

const app = express();
app.use(express.json());

dbConnect();

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);

app.use(errorMiddleware);
export default app;