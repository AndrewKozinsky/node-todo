const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });




const app = express();

/*app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello from the server side!'
    })
});*/

app.get('/', (req, res) => {
    res.status(200).send(`<h1>Hello, ${process.env.PORT}</h1>`)
});


app.listen(process.env.PORT, () => {
    console.log('Server started');
});