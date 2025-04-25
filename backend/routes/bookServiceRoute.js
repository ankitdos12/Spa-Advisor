const express = require('express');
const router = express.Router();

const { createBooking, getAllBookings, getBookingById, deleteBooking } = require('../controllers/BookService');

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.delete('/:id', deleteBooking);

module.exports = router;