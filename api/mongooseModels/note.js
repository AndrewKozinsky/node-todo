const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please provide note\'s text' ]
    },
    important: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    }
});


const Note = mongoose.model('Note', noteSchema);

module.exports = Note;