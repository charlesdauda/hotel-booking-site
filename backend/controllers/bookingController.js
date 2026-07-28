import crypto from 'crypto';
import mongoose from 'mongoose';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';

const ALLOWED_STATUSES = ['pending', 'confirmed', 'cancelled'];

// Which status changes are allowed. Cancelled is final; confirmed can
// only move to cancelled, not back to pending.
const ALLOWED_TRANSITIONS = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['cancelled'],
  cancelled: [],
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Creates one or more bookings at once (a full cart checkout)
export const createBookings = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No booking items were provided.' });
    }

    // Shared id linking every room from this checkout together, so a
    // multi-room booking can be looked up or managed as one order.
    const orderId = crypto.randomUUID();
    const docsToInsert = [];

    for (const item of items) {
      const checkIn = new Date(item.checkIn);
      const checkOut = new Date(item.checkOut);

      if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
        return res.status(400).json({ message: `Invalid dates for ${item.roomName}.` });
      }
      if (checkOut <= checkIn) {
        return res
          .status(400)
          .json({ message: `Check-out must be after check-in for ${item.roomName}.` });
      }

      const room = await Room.findOne({ name: item.roomName });
      if (!room) {
        return res.status(400).json({ message: `Unknown room: ${item.roomName}` });
      }

      const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;

      // Re-check availability at write time. The client may have called
      // /check-availability a while ago (or skipped it entirely), so this
      // is the check that actually protects against overbooking.
      const overlapping = await Booking.find({
        roomName: room.name,
        status: { $ne: 'cancelled' },
        checkIn: { $lt: checkOut },
        checkOut: { $gt: checkIn },
      });
      const bookedUnits = overlapping.reduce((sum, b) => sum + b.quantity, 0);
      const roomsLeft = room.totalUnits - bookedUnits;

      if (roomsLeft < quantity) {
        return res.status(409).json({
          message: `Only ${Math.max(0, roomsLeft)} unit(s) of ${room.name} left for those dates.`,
        });
      }

      const nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));

      docsToInsert.push({
        orderId,
        roomName: room.name,
        // Price is always computed from the Room record — never trusted
        // from the client — so a request can't set its own price.
        pricePerNight: room.pricePerNight,
        nights,
        totalPrice: room.pricePerNight * nights * quantity,
        guestName: item.guestName,
        email: item.email,
        phone: item.phone,
        checkIn,
        checkOut,
        guests: item.guests,
        quantity,
        specialRequests: item.specialRequests || '',
      });
    }

    const bookings = await Booking.insertMany(docsToInsert);
    res.status(201).json({ message: 'Booking confirmed', orderId, bookings });
  } catch (err) {
    res.status(500).json({ message: 'Could not create booking.', error: err.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch bookings.', error: err.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid booking id.' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch booking.', error: err.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid booking id.' });
    }

    const { status } = req.body;
    if (!ALLOWED_STATUSES.includes(status)) {
      return res
        .status(400)
        .json({ message: `Status must be one of: ${ALLOWED_STATUSES.join(', ')}.` });
    }

    const existing = await Booking.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Booking not found.' });

    const isNoOp = status === existing.status;
    const isAllowed = ALLOWED_TRANSITIONS[existing.status].includes(status);

    if (!isNoOp && !isAllowed) {
      return res.status(409).json({
        message: `Cannot change status from "${existing.status}" to "${status}".`,
      });
    }

    existing.status = status;
    await existing.save();
    res.json(existing);
  } catch (err) {
    res.status(500).json({ message: 'Could not update booking.', error: err.message });
  }
};