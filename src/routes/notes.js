const express = require('express');
const router = express.Router();
const passport = require('passport');
const Note = require('../models/note')

const { ensureAuthenticated } = require('../config/auth');

router.get('/',  passport.authenticate('jwt',{session:false}), (req, res) => {
    Note.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.post('/delete',  passport.authenticate('jwt',{session:false}), (req, res) => {
    console.log("Id v backendu: " + req.body.id )
    Note.deleteOne({ _id: req.body.id }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.post('/deleteAll',  passport.authenticate('jwt',{session:false}), (req, res) => {
    Note.deleteMany({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })

})

router.get('/count',  passport.authenticate('jwt',{session:false}), (req, res) => {
    Note.find({})
        .then((data) => {
            var count = 0;
            if (data.length != 0) {
                data.map((item) => {
                    count += item.amount;
                })
            }
            res.json(count);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.post('/save', passport.authenticate('jwt',{session:false}), async (req, res) => {
    const data = req.body;
    
    const newNote = new Note(data);
    console.log("Data:" +  newNote)
    newNote.save((error) => {
        if (error) {
            console.log("Jsem tady")
            res.status(500).json({ msg: 'There was an error' })
        } else {
            console.log("Jsem tu")
            res.json({
                msg: 'Succesfully received'
            })
        }
    });
});

router.post('/edit',  passport.authenticate('jwt',{session:false}),(req, res) => {
    Note.findByIdAndUpdate(req.body.id, {
        noteTitle: req.body.noteTitle,
        description: req.body.description,
        date: Date.now()
    }, (error) => {
        if (error) {
            res.status(500).json({ msg: 'There was an error' })
        } else {
            res.json({
                msg: 'Succesfully received'
            })
        }

    })

});


module.exports = router;