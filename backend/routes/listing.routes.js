import express from 'express';
import { createListing, deletePlace, getListingByCategory, getPlaceById, updateListing } from '../controllers/listing.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();

router.get("/place/:id", isAuthenticated, getPlaceById);

router.post("/category", getListingByCategory);

router.post("/add", isAuthenticated, createListing);
 
router.patch("/update/place/:id", isAuthenticated, updateListing);

router.delete("/delete/:id", isAuthenticated, deletePlace);

export default router;
