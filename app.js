const express = require('express')
const rateLimit = require('express-rate-limit')
// const helmet = require('helmet')
// const mongoSanitize = require('express-mongo-sanitize')
const userRouter = require('./api/routes/userRouter')
const myNotesRouter = require('./api/routes/myNotesRouter')
const siteRouter = require('./api/routes/siteRouter')
const AppError = require('./api/utils/appError')
const globalErrorHandler = require('./api/controllers/errorController')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const app = express()

// Установлю безопасные заголовки в ответ
// app.use(helmet())

app.use(cookieParser())

// Разрешение обрабатывать запросы от любых адресов если нахожусь в режиме разработки
if(process.env.NODE_ENV === 'development') {
    app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }))
}

// Сделаю чтобы в свойство body объекта запроса заносились данные присланные в теле запроса
app.use(express.json({limit: '10kb'}))

/*app.use((req, res, next) => {
    console.log(req.body)
    next()
})*/

// Удаление вредоносного кода в запросах
// app.use(mongoSanitize())

// Ограничение количества запросов
const rater = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!'
})
app.use('/api', rater)


// Статические файлы
app.use(express.static(`${__dirname}/app/dist`))

// Маршруты API
app.use('/api/v1/users', userRouter);
app.use('/api/v1/myNotes', myNotesRouter)

// Маршруты сайта
app.use('/', siteRouter)

// Обработка несуществующего маршрута
app.all("*", (req, res, next) => {
    next(
        new AppError(`Can't find ${req.originalUrl} on the server!`, 404)
    )
})

// Глобальный обработчик ошибок
app.use(globalErrorHandler)


module.exports = app;