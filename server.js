const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const app = express();
const PORT = 4000;
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const Budget = require('./src/models/budget')

const budgetRouter = require('./src/routes/budget')
const expenseRouter = require('./src/routes/expense')
const userRouter = require('./src/routes/users')
const noteRouter = require('./src/routes/notes')


// const { ensureAuthenticated } = require('./src/config/auth');

require('dotenv').config({path:'./src/config/.env'});
// Passport konfigurace
require('./src/config/passport')(passport);





mongoose.connect('mongodb://localhost/calculator', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Express nastavení session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );



// // Pouziti flash modulu
// app.use(flash());

// Passport inicilizace s použitím session
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'))
app.use(express.json())

app.use('/budget', budgetRouter)
app.use('/expense', expenseRouter)
app.use('/note', noteRouter)
app.use('/users',userRouter);


app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, console.log(`Server is starting at ${PORT}`));

