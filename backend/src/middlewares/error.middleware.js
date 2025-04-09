const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {...err};
        error.message = err.message;
        console.error(err);

        if(err.name === "unthorizedError") {
            const message = "Unauthorized";
            error = new Error(message, 401);
        }
        
        if (err.name === "CastError") {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new Error(message, 404);
        }

        if (err.code === 11000) {
            const message = `Duplicate field value entered: ${err.keyValue.name}`;
            error = new Error(message, 400);
        }

        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message, 400);
        }

        if (err.name === "JsonWebTokenError") {
            const message = "Json Web Token is invalid. Try again!";
            error = new Error(message, 400);
        }

        if (err.name === "TokenExpiredError") {
            const message = "Json Web Token is expired. Try again!";
            error = new Error(message, 400);
        }

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;