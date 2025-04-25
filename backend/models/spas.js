const mongoose = require('mongoose');

const spaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        country: {
            type: String,
            required: true,
            default: "India",
            trim: true
        },
        state: {
            type: String,
            required: true,
            default: "Maharashtra",
            trim: true
        },
        district: {
            type: String,
            required: true,
            default: "Thane",
            trim: true
        },
        locality: {
            type: String,
            required: true,
            trim: true
        },
        pincode: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
    },
    type: {
        type: [String],
        default: []
    },

    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],

    coordinates: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },

    images: {
        type: [String],
        default: []
    },
    rating: {
        type: Number,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    startingPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    contacts: {
        number: {
            type: String,
            required: true,
            match: /^[0-9]{10}$/
        },
        email: {
            type: String,
            required: true,
            trim: true,
            match: /.+\@.+\..+/
        },
        website: {
            type: String,
            required: true,
            trim: true,
            match: /^(https?:\/\/)?[\w.-]+(\.[\w\.-]+)+[/#?]?.*$/
        }
    },
    openingHours: {
        days: {
            type: String,
            default: "Monday to Sunday",
            trim: true
        },
        time: {
            type: String,
            default: "10:00 AM to 10:00 PM",
            trim: true
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Spa', spaSchema);
