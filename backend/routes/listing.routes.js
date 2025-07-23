import express from 'express';
import {createListing, getListingByCategory, getPlaceById } from '../controllers/listing.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import upload from '../middleware/multer.js';
const router = express.Router();

router.get("/place/:id",isAuthenticated,getPlaceById);
router.post("/category",getListingByCategory);
router.post("/add",isAuthenticated,upload.fields([
    {name:"image1", maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1}
]),createListing);

export default router;