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
router.get('/', requireAdmin, getBookings);
router.get('/:id', getBookingById);
router.patch('/:id/status', requireAdmin, updateBookingStatus);

export default router;