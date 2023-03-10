const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Items', itemSchema)