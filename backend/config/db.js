require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Database connection failed: ", error.message);
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;