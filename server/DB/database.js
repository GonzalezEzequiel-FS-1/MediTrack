// Load Mongoose
const mongoose = require('mongoose');

// Load logger
const logger = require('../logs/logger');

// Environment variable for the Database URL
const DB_URL = process.env.DB_URL;

// Function to connect Databse
const connectDB = async ()=>{
  try {
    await mongoose.connect(DB_URL)
    logger.info(`✅ Database connected successfully!`);
  } catch (err) {
    logger.error(`❌ Unable to connect to Databse, error: ${err.message}`);
    process.exit(1)
  }
}

module.exports = {
  connectDB
};