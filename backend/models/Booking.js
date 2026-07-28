import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    // Groups every room booked in the same checkout together.
    orderId: { type: String, required: true, index: true },
    roomName: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    guestName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Enter a valid email address'],
    },
    phone: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    nights: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    specialRequests: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Speeds up the overlap lookups used by check-availability and by
// createBookings' own re-validation on every write.
bookingSchema.index({ roomName: 1, checkIn: 1, checkOut: 1 });

export default mongoose.model('Booking', bookingSchema);