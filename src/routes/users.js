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

// router.post('/find', (req, res) => {
//     console.log('jsem u expressu')
//     // console.log('Email: ' + req.body.email)
//     const {email} = req.body
//     console.log('Email: ' + email)
//     const user = User.findOne({email:email})
//     console.log(user.name)
//     User.findOne({email:email})
//     , (error) => {
//         if (error) {
            
//             res.status(500).json({ msg: 'There was an error' })
//         } else {
//             console.log('bez erroru')
//             res.json({
//                 msg: 'Succesfully received'
//             })
//         }

//     }

// })

//POST požadavek pro registraci nového uživatele
router.post('/register', (req, res) => {
    const { name, email, password} = req.body;

    let errors = [];
    console.log("name:" + name)
    console.log("email:" + email)
    console.log("heslo:" + password)

    if (!name || !email || !password) {
        errors.push({ msg: 'Prosím vyplňte všechny údaje!' })
    }

    if (password.length < 6) {
        errors.push({ msg: 'Příliš krátké heslo! Heslo musí mít alespoň 6 znaků!' })
     }
  

    if (errors.length > 0) {

        // res.render('./users/register', {
        //     errors, email, password
        // });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email již existuje' });
                // res.render('register', {
                //     errors,
                //     name,
                //     email,
                //     password
                   
                // });
                console.log('Email již existuje')
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
    }
});

//POST požadavek pro přihlášení uživatele
router.post('/login', async (req, res) => {
    const {email, password} = req.body
    console.log("Rekni mi ten email:"+email)
    User.findOne({email:email}).then(async(user) =>{
        if(!user) return res.status(401).json({msg:"Uzivatel nenalezen!"})
        const isValid = await bcrypt.compare(password, user.password)
        if(isValid)
        {
            const jwtToken = issueJWT(user)   
            const extractedToken = jwtToken.token.replace(/^Bearer\s+/, "");  
            console.log(extractedToken)    
            const decodedToken = decodeToken(extractedToken)
            console.log(decodedToken)
            res.status(200).json({token:jwtToken.token, expiresIn:jwtToken.expires})
        } else {
            res.status(401).json({msg:"Spatne heslo!"})
        }
    })
   

});

//POST požadavek pro přihlášení uživatele
// router.post('/login', (req, res, next) => {
//     const {email} = req.body
//     console.log("Rekni mi ten email:"+email)

//     passport.authenticate('local',{session: false},(err,user,info) => {
      
//         if (err || !user) {
//             return res.status(400).json({
//                 message: 'Something is not right',
//                 user   : user
//             });
//         }
     
//         req.login(user, {session: false}, (err) => {
//             if (err) {
//                 res.send(err);
//             }

//               // generate a signed son web token with the contents of user object and return it in the response
//            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//            return res.json({user, token});
//         });
//     })
   
// });


///POST požadavek pro odhlášení uživatele
router.get('/logout', (req, res) => {
    console.log("Logoutuju")
    req.logout();
    console.log("Logoutuju")
    // res.redirect('/users/login');
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

  const decodeToken = (token) =>{
      const decodedToken = jwt_decode(token)
      return decodedToken;
  }
  

module.exports = router