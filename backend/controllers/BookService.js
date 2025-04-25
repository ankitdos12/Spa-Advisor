const BookService = require('../models/bookService');
// const Service = require('../models/services');
const Spa = require('../models/spas');

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const { spa, name, email, phone, special_request, date, time, serviceTital } = req.body;

        // Validate required fields
        if (!spa || !name || !email || !phone || !date || !time || !serviceTital) {
            return res.status(400).json({
                message: 'Missing required fields. Please provide service, name, email, phone, date, and time'
            });
        }

        // Validate service exists
         const spaExists = await Spa.findById(spa);
         if (!spaExists) {
             return res.status(404).json({ message: 'Spa not found' });
         }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Validate phone format (basic validation)
        const phoneRegex = /^\d{10}$/;  // Assumes 10-digit phone number
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: 'Invalid phone number format' });
        }

        // Create and save the booking
        const booking = new BookService({
            spa,
            name,
            email,
            phone,
            special_request: special_request || '',
            date,
            time,
            serviceTital
        });
        await booking.save();

        res.status(201).json({
            message: 'Booking created successfully',
            booking: await booking.populate('spa')
        });
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(500).json({
            message: 'Error creating booking',
            error: error.message
        });
    }
};

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await BookService.find().populate('spa');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

// Get a booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await BookService.findById(req.params.id).populate('spa');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error });
    }
};

// Delete a booking by ID
const deleteBooking = async (req, res) => {
    try {
        const booking = await BookService.findByIdAndDelete(req.params.id).populate('spa');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    deleteBooking
};