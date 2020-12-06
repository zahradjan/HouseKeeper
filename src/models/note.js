const mongoose = require('mongoose')


const Schema = mongoose.Schema;
const noteSchema = new Schema({
    noteTitle: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    // author: {
    //     type: String,
    //     required: true
    // },

    // createdAt: {
    //     type: Date,
    //     //default zpusobi ze kdykoliv chceme vytvorit novy article tak mu nastavi defaultni tedy aktualni cas pokud neuvedem jinak
    //     default: Date.now

    // },
})

const note = mongoose.model('Note', noteSchema)

module.exports = note
