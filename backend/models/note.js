const mongoose = require('mongoose')


const Schema = mongoose.Schema;
const noteSchema = new Schema({
    noteTitle: {
        type: String,
        required: true
    },
    noteUserName:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const note = mongoose.model('Note', noteSchema)

module.exports = note
