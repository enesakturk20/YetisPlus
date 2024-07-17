const mongoose = require('mongoose');

const carrierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Carrier', carrierSchema);
