const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Выключение сервера при ошибке типа uncaughtException
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION 💥. Shutting down...');
    console.log(err.name, err.message);
    process.exit(1)
})

// Подключение файла app.js с маршрутами
const app = require('./app');

// Строка с данными о подключении
const DB = process.env.DATABASE
    .replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
    .replace('<USERNAME>', process.env.DATABASE_USERNAME)

// Настройка Монгуса чтобы не ругался
mongoose.set('useCreateIndex', true)

// Настройка соединения с MongoDB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB connection successful!')
})


// Прослушивание порта на сервере
const server = app.listen(process.env.PORT, () => {
    console.log('Server started 🔥')
})

// Выключение сервера при ошибке типа unhandledRejection
process.on('unhandledRejection', err => {
    console.log(err)
    console.log('UNHANDLED REJECTION. 💥 Shitting down...');
    server.close(() => {
        process.exit(1)
    })
})
