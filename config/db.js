const mongoose = require("mongoose");
const logger = require("../src/utils/logger");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("✅ MongoDB connected successfully");
  } catch (error) {
    logger.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
