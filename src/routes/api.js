const express = require('express');
const router = express.Router();

const Expense = require('../models/expense')
const Budget = require('../models/budget');

router.get('/', (req, res) => {
    Expense.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.post('/delete', (req, res) => {
    Expense.deleteOne({ _id: req.body.id }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.post('/deleteAll', (req, res) => {
    Expense.deleteMany({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })

})

router.get('/count', (req, res) => {
    Expense.find({})
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
    const newExpense = new Expense(data);
    newExpense.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'There was an error' })
        } else {
            res.json({
                msg: 'Succesfully received'
            })
        }
    });
});

router.post('/edit', (req, res) => {
    Expense.findByIdAndUpdate(req.body.id, {
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

router.get('/budget', (req, res) => {
    Budget.findOne({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.post('/budget/save', async (req, res) => {
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