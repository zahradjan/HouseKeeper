const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const budgetSchema = new Schema({
    amount: Number,
 
});

const budget = mongoose.model('Budget', budgetSchema);

module.exports = budget;