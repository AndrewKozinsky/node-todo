const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password']
    },
    active: {
        type: Boolean,
        default: true
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;