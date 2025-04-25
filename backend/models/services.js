const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    spa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spa',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: [String],
        default: []
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        trim: true
    },
    details: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        required: true,
        trim: true
    }

});

module.exports = mongoose.model('Service', serviceSchema);