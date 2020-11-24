const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 4000;

const budgetRouter = require('./src/routes/budget')
const expenseRouter = require('./src/routes/expense')

mongoose.connect('mongodb://localhost/calculator', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use('/api', routes);
app.use('/budget', budgetRouter)
app.use('/expense', expenseRouter)
app.listen(PORT, console.log(`Server is starting at ${PORT}`));