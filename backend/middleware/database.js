import mongoose from 'mongoose';

export const requireDatabase = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database is currently unavailable. Please try again in a moment.',
    });
  }

  next();
};