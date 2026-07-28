import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from '../models/Room.js';

dotenv.config();

const rooms = [
  {
    name: 'Single Room',
    slug: 'single-room',
    pricePerNight: 200,
    capacity: 1,
    totalUnits: 5,
    amenities: ['Pick & Drop Service', 'Swimming Pool', 'City Tour Guide', 'Fibre Internet'],
    description: 'A cozy single room with premium amenities.',
  },
  {
    name: 'Double Room',
    slug: 'double-room',
    pricePerNight: 250,
    capacity: 2,
    totalUnits: 5,
    amenities: ['Pick & Drop Service', 'Swimming Pool', 'City Tour Guide', 'Fibre Internet'],
    description: 'A spacious double room with premium amenities.',
  },
];

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Room.deleteMany();
  await Room.insertMany(rooms);
  console.log('Rooms seeded');
  process.exit();
};

run();