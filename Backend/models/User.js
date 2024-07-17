const mongoose = require('mongoose');
const Carrier = require('./Carrier');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'carrier', 'admin'],
        default: 'user',
    },
});

module.exports = mongoose.model('User', userSchema);
