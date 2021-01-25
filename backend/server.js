const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const PORT = 4000;
const methodOverride = require('method-override')
const session = require('express-session');
const User = require('./models/user')
const bcrypt = require('bcrypt');


const budgetRouter = require('./routes/budget')
const expenseRouter = require('./routes/expense')
const userRouter = require('./routes/users')
const noteRouter = require('./routes/notes')


// const { ensureAuthenticated } = require('./src/config/auth');

require('dotenv').config({ path: './config/.env' });
// Passport konfigurace
require('./config/passport')(passport);




mongoose.connect(`mongodb://${process.env.MONGO_URL}:27017/calculator`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});




mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected')
});






app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express nastavení session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);



// Passport inicilizace s použitím session
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'))
app.use(express.json())

app.use('/budget', budgetRouter)
app.use('/expense', expenseRouter)
app.use('/note', noteRouter)
app.use('/users', userRouter);

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


initAdmin()

app.listen(PORT, console.log(`Server is starting at ${PORT}`));







async function initAdmin() {
  const name = 'sysadmin'
  const email = 'sysadmin@sysadmin00'
  const password = 'sysadmin00'
  const role = 'admin'

  await User.findOne({ email: email }).then(user => {
    if (user) {
      return

    } else {
      const newUser = new User({
        name,
        email,
        password,
        role

      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .catch(err => console.log(err));
        });
      });
    }
  });
}

