const express = require('express');
const router = express.Router();

const Budget = require('../models/budget');

router.get('/',(req, res) => {
    Budget.find({ })
    .then((data) => {
        //console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
});

router.post('/save', async (req, res) => {
    const data = req.body; 
    const newBudget = new Budget(data);
    newBudget.save((error) => {
        if(error) {
            res.status(500).json({ msg: 'There was an error' })
        } else {
            res.json({
                msg: 'Succesfully received'
            })
        }
    });
});
 
module.exports = router;