const express = require('express');
const router = express.Router();

const Expense = require('../models/expense')

router.get('/',(req, res) => {
    Expense.find({ })
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
    const newExpense = new Expense(data);
    newExpense.save((error) => {
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