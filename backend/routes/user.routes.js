import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { getCurrentUser, getUserBookings, getUserListings  } from '../controllers/user.controller.js';
const router = express.Router();

router.get("/current",isAuthenticated,getCurrentUser);
router.get("/listings",isAuthenticated,getUserListings);
router.get("/bookings",isAuthenticated,getUserBookings);

export default router;  