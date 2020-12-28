const bcrypt = require('bcrypt');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user');
const jwt_decode = require('jwt-decode')


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
}

const decodeToken = (token) =>{
  const decodedToken = jwt_decode(token)
  return decodedToken;
}

const strategy = new JwtStrategy(options,(payload,done)=>{
 
  User.findOne({_id: payload.user._id}).then( async(user) =>{
    if (!user) {
      return done(null, false, { message: 'Email není registrován!' });
    }
    console.log(user.password)
    console.log(payload.user.password)
        // porovnání hesla tady nemuzu vyuzivat to bcrypt protoze oboji uz je v tuto chvili zasaltovane
        const isMatch = () =>  user.password === payload.user.password
        if(isMatch()){
          return done(null, user);
        } else{
          return done(null, false, { message: 'Nesprávné heslo!' });
        }
    }).catch(err => done(err,null));
})
require('dotenv').config();
module.exports = function(passport) {

  passport.use(strategy);
};
