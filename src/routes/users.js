const User = require('../models/user');
const express = require('express')
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt_decode = require('jwt-decode')
const jwt = require('jsonwebtoken');
const router = express.Router()

router.get("/protected", passport.authenticate('jwt',{session:false}), (req,res)=>{
    res.status(200).json({msg:'Jste autorizovani!'})
})

router.get('/',  passport.authenticate('jwt',{session:false}), (req, res) => {
    User.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.post('/delete',  passport.authenticate('jwt',{session:false}),(req, res) => {
    User.deleteOne({ _id: req.body.id }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.post('/deleteAll',  passport.authenticate('jwt',{session:false}), (req, res) => {
    User.deleteMany({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })

})




//GET požadavek pro zobrazení stránky regisrace nového uživatele
router.get('/register', (req, res) => {
    User.findOne({})
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
})


//POST požadavek pro registraci nového uživatele
router.post('/register', (req, res) => {
    const { name, email, password} = req.body;

    
    console.log("name:" + name)
    console.log("email:" + email)
    console.log("heslo:" + password)


   

  
        User.findOne({ email: email }).then(user => {
            if (user) {
                return res.status(401).json({msg:"Email je již zaregistrován!"})
                
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                    
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                
                                const jwt =  issueJWT(user);
                               
                            
                                res.json({token:jwt.token, expiresIn:jwt.expires})
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    
});

//POST požadavek pro přihlášení uživatele
router.post('/login', async (req, res) => {
    const {email, password} = req.body
    console.log("Rekni mi ten email:"+email)
    User.findOne({email:email}).then(async(user) =>{
        if(!user) return res.status(401).json({msg:"Uživatel nenalezen!"})
        const isValid = await bcrypt.compare(password, user.password)
        if(isValid)
        {
            const jwtToken = issueJWT(user)   
            res.status(200).json({token:jwtToken.token, expiresIn:jwtToken.expires})
        } else {
            res.status(401).json({msg:"Špatné heslo!"})
        }
    })
   

});




function issueJWT(user) {
    
  
    const expiresIn = '1d';
  
    const payload = {
      user : user,
      iat: Date.now()
    };
    const signedToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresIn });
  
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    }
  }

//   const decodeToken = (token) =>{
//       const decodedToken = jwt_decode(token)
//       return decodedToken;
//   }
  

module.exports = router