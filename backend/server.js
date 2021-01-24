const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const app = express();
const PORT = 4000;
const methodOverride = require('method-override')
const axios = require('axios');
const session = require('express-session');


const budgetRouter = require('./routes/budget')
const expenseRouter = require('./routes/expense')
const userRouter = require('./routes/users')
const noteRouter = require('./routes/notes')


// const { ensureAuthenticated } = require('./src/config/auth');

require('dotenv').config({path:'./config/.env'});
// Passport konfigurace
require('./config/passport')(passport);




mongoose.connect(`mongodb://${process.env.MONGO_URL_LOCAL}:27017/calculator`, {
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

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const payload ={name:"admin",email:"admin@admin01", heslo:"admin01", role:"admin"}

axios({
  port: '4000',
  url: 'users/register',
  method: 'POST',
  data: payload
})
  .then(() => {
    console.log("Admin uspesne pridan!")
    })
  .catch((err) => {
     console.log(err)
      
     
})




app.listen(PORT, console.log(`Server is starting at ${PORT}`));

