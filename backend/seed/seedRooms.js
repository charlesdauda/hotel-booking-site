import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from '../models/Room.js';
import connectDB from '../config/db.js';

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
  {
    name: 'Luxury Suite Room',
    slug: 'luxury-suite-room',
    pricePerNight: 90,
    capacity: 2,
    totalUnits: 5,
    amenities: ['Pick & Drop Service', 'Swimming Pool', 'City Tour Guide', 'Fibre Internet'],
    description: 'A refined suite with premium amenities and generous space.',
  },
  {
    name: 'Deluxe Double Room',
    slug: 'deluxe-double-room',
    pricePerNight: 90,
    capacity: 2,
    totalUnits: 5,
    amenities: ['Pick & Drop Service', 'Swimming Pool', 'City Tour Guide', 'Fibre Internet'],
    description: 'A spacious double room with premium amenities.',
  },
  {
    name: 'Superior King Room',
    slug: 'superior-king-room',
    pricePerNight: 120,
    capacity: 2,
    totalUnits: 5,
    amenities: ['Pick & Drop Service', 'Swimming Pool', 'City Tour Guide', 'Fibre Internet'],
    description: 'A calm king room designed for an elevated stay.',
  },
  {
    name: 'Executive Room',
    slug: 'executive-room',
    pricePerNight: 150,
    capacity: 2,
    totalUnits: 5,
    amenities: ['Pick & Drop Service', 'Swimming Pool', 'City Tour Guide', 'Fibre Internet'],
    description: 'A polished executive room for comfortable business and leisure stays.',
  },
];

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