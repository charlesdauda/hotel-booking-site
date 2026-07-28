import express from 'express';
import {
  createBookings,
  getBookings,
  getBookingById,
  updateBookingStatus,
} from '../controllers/bookingController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createBookings);
// Listing every booking exposes every guest's PII, so it's admin-only.
router.get('/', requireAdmin, getBookings);
// Left public: this acts as a confirmation-number lookup — you need the
// exact booking id (an unguessable Mongo ObjectId) to use it, same as
// most "check your reservation" flows. Lock this down too if that's not
// a strong enough guarantee for your use case.
router.get('/:id', getBookingById);
// Changing a booking's status (e.g. confirming or cancelling) is admin-only.
router.patch('/:id/status', requireAdmin, updateBookingStatus);

export default router;