import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  const mongoUri = process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : process.env.MONGODB_LOCAL_URI || 'mongodb://127.0.0.1:27017/hotel-booking';

  if (!mongoUri) {
    throw new Error('No MongoDB URI is configured. Add MONGODB_LOCAL_URI for local development or MONGODB_URI for production.');
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
};

export default connectDB;