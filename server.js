const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 4000;

const routes = require('./src/routes/api')

mongoose.connect('mongodb://localhost/calculator', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));