import { Listing } from '../models/listing.model.js';
import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import { Booking } from '../models/booking.model.js';

/* ===================== CREATE LISTING ===================== */
export const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      price,
      category,
      image1,
      image2,
      image3
    } = req.body;

    const userId = req.user.id;

    if (
      !title ||
      !description ||
      !location ||
      !price ||
      !category ||
      !image1 ||
      !image2 ||
      !image3
    ) {
      return res.status(400).json({
        message: "All fields including images are required!",
        success: false
      });
    }

    const newListing = await Listing.create({
      title,
      description,
      location,
      price,
      category,
      userId,
      image1: { url: image1 },
      image2: { url: image2 },
      image3: { url: image3 }
    });

    await User.findByIdAndUpdate(
      userId,
      { $push: { listing: newListing._id } }
    );

    res.status(201).json({
      message: "Listing Created!",
      success: true,
      newListing
    });

  } catch (error) {
    console.error("Create Listing Error:", error);
    res.status(500).json({
      message: "Internal server error!",
      success: false
    });
  }
};

/* ===================== GET LISTING BY CATEGORY ===================== */
export const getListingByCategory = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        message: "Category is required!",
        success: false
      });
    }

    let categoryPlace;

    if (category === "All") {
      categoryPlace = await Listing.find({});
    } else {
      categoryPlace = await Listing.find({ category });
    }

    if (categoryPlace.length === 0) {
      return res.status(404).json({
        message: "No places found!",
        success: false
      });
    }

    res.status(200).json({
      message: "Places fetched successfully",
      success: true,
      categoryPlace
    });

  } catch (error) {
    console.error("Category Error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

/* ===================== GET PLACE BY ID ===================== */
export const getPlaceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID!",
        success: false
      });
    }

    const place = await Listing.findById(id);

    if (!place) {
      return res.status(404).json({
        message: "Place not found!",
        success: false
      });
    }

    res.status(200).json({
      message: "Place found",
      success: true,
      place
    });

  } catch (error) {
    console.error("Get Place Error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

/* ===================== UPDATE LISTING ===================== */
export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      price,
      category,
      image1,
      image2,
      image3
    } = req.body;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found!",
        success: false
      });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      {
        title,
        description,
        location,
        price,
        category,
        image1: image1 ? { url: image1 } : listing.image1,
        image2: image2 ? { url: image2 } : listing.image2,
        image3: image3 ? { url: image3 } : listing.image3
      },
      { new: true }
    );

    res.status(200).json({
      message: "Listing Updated!",
      success: true,
      updatedListing
    });

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

/* ===================== DELETE LISTING ===================== */
export const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await Listing.findByIdAndDelete(id);

    await User.findByIdAndUpdate(
      userId,
      { $pull: { listing: id } }
    );

    const bookings = await Booking.find({ listingId: id });
    const bookingIds = bookings.map(b => b._id);

    await User.updateMany(
      {},
      { $pull: { booking: { _id: { $in: bookingIds } } } }
    );

    await Booking.deleteMany({ listingId: id });

    res.status(200).json({
      message: "Listing Deleted!",
      success: true
    });

  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};
