const path = require('path')
const express = require('express')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const userRouter = require('./routes/userRouter')
const myNotesRouter = require('./routes/myNotesRouter')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const app = express()

// Установлю безопасные заголовки в ответ
app.use(helmet())

app.use(cookieParser())

// Разрешение обрабатывать запросы от любых адресов если нахожусь в режиме разработки
if(process.env.NODE_ENV === 'development') {
    app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }))
}

// Сделаю чтобы в свойство body объекта запроса заносились данные присланные в теле запроса
app.use(express.json({limit: '10kb'}))

// Удаление вредоносного кода в запросах
app.use(mongoSanitize())

// Ограничение количества запросов
const rater = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!'
})
app.use('/api', rater)


// Статические файлы Приложения
app.use(express.static(
    path.resolve(process.cwd(), 'app/dist'))
)
// Статические файлы на сервере.
// Для обращения к файлу в папке static-files нужно написать static и затем имя файла.
app.use('/static', express.static(
    path.resolve(process.cwd(), 'api/static-files'))
)

// Маршруты API
app.use('/api/v1/users', userRouter);
app.use('/api/v1/myNotes', myNotesRouter)


// Обработка несуществующего маршрута
app.all("*", (req, res, next) => {
    next(
        new AppError(`Can't find ${req.originalUrl} on the server!`, 404)
    )
})

// Глобальный обработчик ошибок
app.use(globalErrorHandler)


module.exports = app;