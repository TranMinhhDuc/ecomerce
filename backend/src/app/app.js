import express from 'express';
import dbConnect from '../config/dbconnect.config.js';
import errorMiddleware from '../middlewares/error.middleware.js';
import authRoute from '../routes/auth.route.js';
import userRoute from '../routes/user.route.js';
import categoryRoute from '../routes/category.route.js';
import productRoute from '../routes/product.route.js';

const app = express();
app.use(express.json());

dbConnect();

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);

app.use(errorMiddleware);
export default app;