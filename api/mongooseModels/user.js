const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Please provide a valid email'],
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide password. Password must have at least 4 characters.'],
        minlength: 4
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (passwordConfirm) {
                return this.password === passwordConfirm
            },
            message: 'Passwords are not equal!'
        }
    },
    active: {
        type: Boolean,
        default: true
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;