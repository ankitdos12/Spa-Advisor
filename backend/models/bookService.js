const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    spa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spa',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    special_request: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    serviceTital:{
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('BookService', bookSchema);