import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import bookingRoutes from './routes/bookingRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import { requireDatabase } from './middleware/database.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

const retryDatabaseConnection = () => {
  const retryTimer = setTimeout(async () => {
    try {
      await connectDB();
      console.log('MongoDB connection restored');
    } catch (err) {
      console.error(`MongoDB retry failed: ${err.message}`);
      retryDatabaseConnection();
    }
  }, 15000);

  retryTimer.unref();
};

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'Hotel booking API is running' }));

app.get('/api/health', (req, res) => {
  const databaseReady = mongoose.connection.readyState === 1;
  res.status(databaseReady ? 200 : 503).json({
    status: databaseReady ? 'ok' : 'degraded',
    database: databaseReady ? 'connected' : 'unavailable',
  });
});

app.use('/api/rooms', requireDatabase, roomRoutes);
app.use('/api/bookings', requireDatabase, bookingRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error(
      `Database unavailable at startup: ${err.message}. The API will stay up, but database requests will be rejected until MongoDB is reachable.`
    );
    retryDatabaseConnection();
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();