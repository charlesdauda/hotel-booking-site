import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import bookingRoutes from './routes/bookingRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import Room from './models/Room.js';
import { rooms } from './data/rooms.js';
import { requireDatabase } from './middleware/database.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

const allowedOrigins = [process.env.CLIENT_URLS, process.env.CLIENT_URL, 'http://localhost:5173']
  .filter(Boolean)
  .join(',')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const retryDatabaseConnection = () => {
  const retryTimer = setTimeout(async () => {
    try {
      await connectDB();
      await syncRoomCatalog();
      console.log('MongoDB connection restored');
    } catch (err) {
      console.error(`MongoDB retry failed: ${err.message}`);
      retryDatabaseConnection();
    }
  }, 15000);

  retryTimer.unref();
};

const syncRoomCatalog = async () => {
  await Promise.all(
    rooms.map(({ slug, ...room }) =>
      Room.updateOne({ slug }, { $set: room, $setOnInsert: { slug } }, { upsert: true })
    )
  );
  console.log(`Room catalog synchronized (${rooms.length} rooms)`);
};

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin is not allowed by CORS.'));
  },
}));
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
    await syncRoomCatalog();
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