import { User } from '../models/user.model.js';

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "user not found!",
        success: false
      })
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
      success: false
    })
  }
}

export const getUserListings = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized! Please login first.",
        success: false,
      });
    }

    const user = await User.findById(userId).populate("listing");

    if (!user || user.listing.length === 0) {
      return res.status(404).json({
        message: "No listings created by the user.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User listings fetched successfully.",
      success: true,
      listings: user.listing,
    });

  } catch (error) {
    console.log("Get User Listings Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized! Please login first.",
        success: false,
      });
    }

    const user = await User.findById(userId)
      .populate({
        path: "booking",
        populate: {
          path: "listingId",
          model: "Listing"
        }
      });

    if (!user || user.booking.length === 0) {
      return res.status(404).json({
        message: "No bookings made by the user.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User bookings fetched successfully.",
      success: true,
      bookings: user.booking,
    });

  } catch (error) {
    console.log("Get User Bookings Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};