const AppError = require('../utils/appError')


const handleDuplicateFieldsBD = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`
    
    return new AppError(message, 400)
}

const handleValidationErrorBD = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data: ${errors.join('. ')}`
    
    return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
    res
        .status(err.statusCode)
        .json({
            status: err.status, // fail или error
            error: err,         // Полный объект ошибки
            message: err.message, // Сообщение об ошибке
            stack: err.stack
        })
};

const sendErrorProd = (err, res) => {
    if(err.isOperational) {
        res
            .status(err.statusCode)
            .json({
                status: err.status, // fail или error
                message: err.message, // Сообщение об ошибке
            })
    }
    else {
        res
            .status(500)
            .json({
                status: 'error',
                message: 'Something went wrong!', // Сообщение об ошибке
            })
    }
    
};

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    if(process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
    else if(process.env.NODE_ENV === 'production') {
        let error = {...err};
        
        // Если значение поля должно быть уникальным, но ввели дублирующие значения.
        if(error.code === 11000) error = handleDuplicateFieldsBD(error);
        if(error.errors) error = handleValidationErrorBD(error);
        
        
        sendErrorProd(error, res)
    }
}

module.exports = globalErrorHandler;