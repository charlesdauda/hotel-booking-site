import Room from '../models/Room.js';
import Booking from '../models/Booking.js';

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch rooms.', error: err.message });
  }
};

export const checkAvailability = async (req, res) => {
  try {
    const { checkIn, checkOut, guests, roomName } = req.body;

    if (!checkIn || !checkOut) {
      return res.status(400).json({ message: 'Check-in and check-out dates are required.' });
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (end <= start) {
      return res.status(400).json({ message: 'Check-out must be after check-in.' });
    }

    // A booking overlaps this range if it starts before our end and ends after our start
    const overlapFilter = {
      status: { $ne: 'cancelled' },
      checkIn: { $lt: end },
      checkOut: { $gt: start },
      ...(roomName ? { roomName } : {}),
    };

    const overlappingBookings = await Booking.find(overlapFilter);
    const rooms = await Room.find(roomName ? { name: roomName } : {});

    const results = rooms.map((room) => {
      const bookedUnits = overlappingBookings
        .filter((b) => b.roomName === room.name)
        .reduce((sum, b) => sum + b.quantity, 0);

      const roomsLeft = Math.max(0, room.totalUnits - bookedUnits);

      return {
        roomName: room.name,
        pricePerNight: room.pricePerNight,
        roomsLeft,
        available: roomsLeft > 0 && (!guests || room.capacity >= guests),
      };
    });

    res.json({ checkIn, checkOut, results });
  } catch (err) {
    res.status(500).json({ message: 'Could not check availability.', error: err.message });
  }
};