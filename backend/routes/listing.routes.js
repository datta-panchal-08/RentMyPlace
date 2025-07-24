import express from 'express';
import { createListing, deletePlace, getListingByCategory, getPlaceById, updateListing } from '../controllers/listing.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import upload from '../middleware/multer.js';
const router = express.Router();

router.get("/place/:id", isAuthenticated, getPlaceById);
router.post("/category", getListingByCategory);
router.post("/add", isAuthenticated, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 }
]), createListing);
router.patch("/update/place/:id", isAuthenticated, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 }
]), updateListing);
router.delete("/delete/:id", isAuthenticated, deletePlace);
export default router;