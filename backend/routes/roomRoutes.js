import express from 'express';
import { getRooms, checkAvailability } from '../controllers/roomController.js';

const router = express.Router();

router.get('/', getRooms);
router.post('/check-availability', checkAvailability);

export default router;