const catchAsync = require('../utils/catchAsync')
const path = require('path')
const fs = require('fs')


// Получить адрес индексного файла
const indexFileSrc = `${process.cwd()}/app/dist/index.html`;

// Получить текст индесного файла
const indexFile = fs.readFileSync(indexFileSrc, {encoding: 'utf-8'}, (err, data) => {
    if(err) console.log(err);
    return data;
})

// Обновление конкретной заметки пользователя
exports.getSite = catchAsync(async (req, res, next) => {
    
    // Отправить текст индексного файла
    res.status(200).send(indexFile)
});