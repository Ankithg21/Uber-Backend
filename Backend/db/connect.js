const mongoose = require('mongoose');

const connectDB = async () => {
    if(mongoose.connection.readyState) {
        console.log('MongoDB is already connected');
        return;
    }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    if(!db) {
      throw new Error('Failed to connect to MongoDB');
    }
    console.log('Database connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;