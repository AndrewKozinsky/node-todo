const express = require('express');


const app = express();

app.get('/', (req, res) => {
    res.status(200).send(`<h1>Hello, Andrew</h1>`)
});


module.exports = app;



//andrew
//-E8XZ.bq_WAb.uU
//mongodb+srv://andrew:<password>@cluster0-mi7ym.mongodb.net/test?retryWrites=true&w=majority