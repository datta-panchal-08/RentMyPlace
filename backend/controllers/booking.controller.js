import { Booking } from "../models/booking.model.js";
import { Listing } from "../models/listing.model.js";
import { User } from '../models/user.model.js';

export const createBooking = async (req, res) => {
  try {
    const { listingId, startDate, endDate, price, methodType, title } = req.body;
    const userId = req.user.id;

    // Step 1: Find the listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        message: "Listing not found!",
        success: false,
      });
    }

    // Step 2: Prevent self-booking
    if (listing.userId.toString() === userId.toString()) {
      return res.status(403).json({
        message: "You cannot book your own listing.",
        success: false,
      });
    }

    // Step 3: Price calculation based on method
    const start = new Date(startDate);
    const end = new Date(endDate);
    let finalPrice = 0;

    if (methodType === "perMonth") {
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
      finalPrice = months * price;
    } else if (methodType === "perDay") {
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      finalPrice = days * price;
    }

    // Step 4: Save booking
    const newBooking = new Booking({
      userId,
      listingId,
      title,
      startDate,
      endDate,
      finalPrice,
    });

    await newBooking.save();

    await User.findByIdAndUpdate(userId, { $push: { booking: newBooking._id } }, { new: true });

    res.status(201).json({
      message: "Booking successful!",
      success: true,
      booking: newBooking,
    });

  } catch (error) {
    console.error("Create Booking Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!userId || !id) {
      return res.status(400).json({
        message: "Error, No listingId and BookedBy provided!",
        success: false,
      });
    }

    // Remove booking from user
    await User.findByIdAndUpdate(
      userId,
      { $pull: { booking: { _id: id } } },
      { new: true }
    );

    // Delete the booking document
    await Booking.findByIdAndDelete(id);

    res.status(200).json({
      message: "Booking Cancelled!",
      success: true,
    });

  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      message: "Internal server error while deleting booking.",
      success: false,
      error: error.message,
    });
  }
};
