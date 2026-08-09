import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    pricePerNight: { type: Number, required: true },
    image: { type: String },
    capacity: { type: Number, default: 2 },
    totalUnits: { type: Number, default: 5 },
    amenities: [{ type: String }],
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Room', roomSchema);