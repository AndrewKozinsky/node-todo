const AppError = require('../utils/appError')


function globalErrorHandler (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    let error = {...err}
    console.log(err);
    
    // Если значение поля должно быть уникальным, но ввели дублирующие значения.
    if(error.code === 11000) error = handleDuplicateFieldsBD(error);
    if(error.errors) error = handleValidationErrorBD(error);
    if(error.name === 'JsonWebTokenError') handleJWTError(error)
    if(error.name === 'TokenExpiredError') handleJWTExpiredError(error)
    
    if(process.env.NODE_ENV === 'development') {
        sendErrorDev(error, res)
    }
    else if(process.env.NODE_ENV === 'production') {
        sendErrorProd(error, res)
    }
}


function sendErrorDev(err, res) {
    res
        .status(err.statusCode)
        .json({
            status: err.status,  // fail или error
            error: {
                statusCode: err.statusCode,
                isOperational: err.isOperational,
                message: err.message
            }
        })
}

function sendErrorProd(err, res) {
    res
        .status(err.statusCode)
        .json({})
    
    
    if(err.isOperational) {
        res
            .status(err.statusCode)
            .json({
                status: err.status,   // fail или error
                error: {
                    statusCode: err.statusCode,
                    message: err.msg, // Сообщение об ошибке
                }
            })
    }
    else {
        res
            .status(500)
            .json({
                status: 'error',
                data: {
                    message: 'Something went wrong!', // Сообщение об ошибке
                }
            })
    }
}



// В поле, которое должно быть уникальным, передали повторяющееся значение
function handleDuplicateFieldsBD(err) {
    const value = Object.values(err.keyValue)[0]
    const message = `Duplicate field value: ${value}. Please use another one!`
    
    err.statusCode = 400
    err.message = message
    return err
}

// Ошибка при проверке поля
function handleValidationErrorBD(err) {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data: ${errors.join('. ')}`
    
    err.statusCode = 400
    err.message = message
    return err
}

// Ошибка в JWT
function handleJWTError(err) {
    err.statusCode = 401
    err.message = 'Invalid token. Please log in again.'
    return err
}

// В JWT истёк срок действия
function handleJWTExpiredError(err) {
    err.statusCode = 401
    err.message = 'Your token has expired. Please log in again.'
    return err
}

module.exports = globalErrorHandler;