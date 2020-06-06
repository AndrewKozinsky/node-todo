const express = require('express');
const userRouter = require('./api/routes/userRouter');
const AppError = require('./api/utils/appError')
const globalErrorHandler = require('./api/controllers/errorController')


const app = express();

// Добавлю свойство body в объекте запроса
app.use(express.json())

// Маршруты
app.use('/api/v1/users', userRouter);


// Обработка несуществующего маршрута
app.all("*", (req, res, next) => {
    next(
        new AppError(`Can't find ${req.originalUrl} on the server!`, 404)
    )
})

// Глобальный обработчик ошибок
app.use(globalErrorHandler)


module.exports = app;

