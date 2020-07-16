const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please provide note\'s text' ]
    },
    date: {
        type: Date,
        required: [true, 'Please provide a date of creation' ]
    },
    important: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: [true, 'Please provide user\'s id' ]
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})


const Note = mongoose.model('Note', noteSchema)

module.exports = Note