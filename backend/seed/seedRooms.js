import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from '../models/Room.js';
import connectDB from '../config/db.js';
import { rooms } from '../data/rooms.js';

dotenv.config();

const run = async () => {
  await connectDB();
  await Room.deleteMany();
  await Room.insertMany(rooms);
  console.log('Rooms seeded');
};

run()
  .catch((err) => {
    console.error(`Room seeding failed: ${err.message}`);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());