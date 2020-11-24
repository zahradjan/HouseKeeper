const express = require('express');
const router = express.Router();


const Budget = require('../models/budget');

router.get('/', (req, res) => {
    Budget.findOne({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.post('/save', async (req, res) => {
    const data = req.body;
    const newBudget = new Budget(data);
    const oldBudget = (await Budget.findOne())

    if (oldBudget !== null) {
        oldBudget.overwrite(newBudget);
        oldBudget.save((error) => {
            if (error) {
                res.status(500).json({ msg: 'There was an error' })
            } else {
                res.json({
                    msg: 'Succesfully received'
                })
            }
        })
    } else {

        newBudget.save((error) => {
            if (error) {
                res.status(500).json({ msg: 'There was an error' })
            } else {
                res.json({
                    msg: 'Succesfully received'
                })
            }
        })
    }
})


module.exports = router;