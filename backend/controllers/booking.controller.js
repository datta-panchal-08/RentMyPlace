import { Booking } from "../models/booking.model.js";
import { Listing } from "../models/listing.model.js";
import { User } from '../models/user.model.js';

export const createBooking = async (req, res) => {
  try {
    const {startDate,finalPrice, endDate, methodType } = req.body;
    const listingId= req.params.id;    
    const userId = req.user.id;

    // Step 1: Find the listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        message: "Listing not found!",
        success: false,
      });
    }

    if(listing.isBooked === true){
      return res.status(400).json({
        message:"Already Booked!",
        success:false
      })
    }

    // Step 2: Prevent self-booking
    if (listing.userId.toString() === userId.toString()) {
      return res.status(403).json({
        message: "You cannot book your own listing.",
        success: false,
      });
    }
    const newBooking = new Booking({
      userId,
      listingId,
      startDate,
      endDate,
      finalPrice,
      methodType
    });

    await newBooking.save();
    await User.findByIdAndUpdate(userId, { $push: { booking: newBooking._id } }, { new: true });
    await Listing.findByIdAndUpdate(listingId,{isBooked:true},{new:true});

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
    const userId = req.user?.id;

    if (!userId || !id) {
      return res.status(400).json({
        message: "❌ Missing booking ID or user ID!",
        success: false,
      });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        message: "❌ Booking not found!",
        success: false,
      });
    }

    if (booking.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "❌ Not authorized to delete this booking!",
        success: false,
      });
    }

    await Listing.findByIdAndUpdate(
      booking.listingId,
      { isBooked: false },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userId,
      { $pull: { bookings: id } },
      { new: true }
    );

    await Booking.findByIdAndDelete(id);

    res.status(200).json({
      message: "✅ Booking cancelled successfully!",
      success: true,
    });

  } catch (error) {
    console.error("❌ Delete Booking Error:", error);
    res.status(500).json({
      message: "❌ Internal server error while deleting booking.",
      success: false,
      error: error.message,
    });
  }
};

