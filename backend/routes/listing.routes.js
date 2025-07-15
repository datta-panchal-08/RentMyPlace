import express from 'express';
import { getAllListings, getListingByCategory } from '../controllers/listing.controller.js';
const router = express.Router();

router.get("/all",getAllListings);
router.post("/category",getListingByCategory);
export default router;