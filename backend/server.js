const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

const db = require('./config/db');
const spaRoute = require('./routes/spaRoute');
const reviewRoute = require('./routes/reviewRoute');
const bookServiceRoute = require('./routes/bookServiceRoute');

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.use(cors());

// Routes
app.use('/api/v1/spas', spaRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/bookings', bookServiceRoute);

const port = process.env.PORT || 4000;
// Database connection
app.listen(port, () => {
    db();
    console.log(`Server is running on port ${port}`);
});