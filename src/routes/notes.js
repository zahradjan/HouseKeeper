const express = require('express');
const router = express.Router();

const Note = require('../models/note')



router.get('/', (req, res) => {
    Note.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.post('/delete', (req, res) => {
    Note.deleteOne({ _id: req.body.id }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.post('/deleteAll', (req, res) => {
    Note.deleteMany({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })

})

router.get('/count', (req, res) => {
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

router.post('/save', async (req, res) => {
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

router.post('/edit', (req, res) => {
    Note.findByIdAndUpdate(req.body.id, {
        expenseTitle: req.body.expenseTitle,
        amount: req.body.amount,
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