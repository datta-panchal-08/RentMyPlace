import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { createBooking, deleteBooking  } from '../controllers/booking.controller.js';
const router = express.Router();

router.post("/book/:id",isAuthenticated,createBooking);
router.delete("/book/:id",isAuthenticated,deleteBooking);

export default router;