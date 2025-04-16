const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {...err};
        error.message = err.message;
        console.error(err);

        if(err.code === 403) {
            const message = "User can not access this resource";
            error = new Error(message);
            error.statusCode = 403;
        }

        if(err.name === "unthorizedError") {
            const message = "Unauthorized";
            error = new Error(message);
            error.statusCode = 401;
        }
        
        if (err.name === "CastError") {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new Error(message);
            error.statusCode = 404;
        }

        if (err.code === 11000) {
            const message = `Duplicate field value entered: ${err.keyValue.name}`;
            error = new Error(message); 
            error.statusCode = 400; 
        }

        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message);
            error.statusCode = 400;
        }

        if (err.name === "JsonWebTokenError") {
            const message = "Json Web Token is invalid. Try again!";
            error = new Error(message);
            error.statusCode = 400;
        }

        if (err.name === "TokenExpiredError") {
            const message = "Json Web Token is expired. Try again!";
            error = new Error(message);
            error.statusCode = 400;
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