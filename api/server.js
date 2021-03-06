const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './api/config.env' });

// Выключение сервера при ошибке типа uncaughtException
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION 💥. Shutting down...');
    console.log(err.name, err.message);
    process.exit(1)
})

// Подключение файла app.js с маршрутами
const app = require('./app')


// Строка с данными о подключении
const DB = process.env.DATABASE
    .replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
    .replace('<USERNAME>', process.env.DATABASE_USERNAME)

// Настройка Монгуса чтобы не ругался
mongoose.set('useCreateIndex', true)
// --mongoose.set('useFindAndModify', false)

// Настройка соединения с MongoDB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB connection successful!')
})


// Прослушивание порта на сервере
const server = app.listen(3000, () => {
    console.log('Server started 🔥')
})


/*process.on('SIGINT', () => {
    console.info('SIGINT signal received.')
    console.log('Closing http server.')
    server.close(err => {
        console.error(err)
        process.exit(1)
    })
});*/

// Выключение сервера при ошибке типа unhandledRejection
process.on('unhandledRejection', err => {
    console.log(err)
    console.log('UNHANDLED REJECTION. 💥 Shitting down...');
    server.close(() => {
        process.exit(1)
    })
})