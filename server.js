const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Подключение файла app.js
const app = require('./app');

// Строка с данными о подключении
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Настройка соединения с MongoDB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB connection successful!');
});


// Прослушивание порта на сервере
app.listen(process.env.PORT, () => {
    console.log('Server started');
});