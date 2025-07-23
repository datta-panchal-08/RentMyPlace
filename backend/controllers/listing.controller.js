import { Listing } from '../models/listing.model.js';
import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import { Booking } from '../models/booking.model.js';
import uploadToCloudinary from '../config/cloudinary.js';

export const createListing = async (req, res) => {
  try {
    const { title,description, location, isBooked, price, category } = req.body;
    const userId = req.user.id;
    const image1 = await uploadToCloudinary(req.files.image1[0].path);
    const image2 = await uploadToCloudinary(req.files.image2[0].path);
    const image3 = await uploadToCloudinary(req.files.image3[0].path);

      if (
      !title ||
      !image1 ||
      !image2 ||
      !image3 ||
      !description ||
      !location ||
      !category ||
      !price
    ) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false
      });
    }



    const newListing = await Listing.create(
      {
        title, image1, image2, image3, price, description, location, isBooked, category, userId: userId
      }
    );
    await newListing.save();
    await User.findByIdAndUpdate(userId, { $push: { listing: newListing._id } }, { new: true }).exec();
    res.status(201).json({
      message: "Place added!",
      success: true,
      newListing
    })

  } catch (error) {
    console.log("Create Listing Error : ", error);
    res.status(500).json({
      message: "Internal server error!",
      success: false
    })
  }
}

export const getListingByCategory = async (req, res) => {
  try {
    const { category } = req.body;
    let categoryPlace;
    if (!category) {
      return res.status(400).json({
        message: "Category is required!",
        success: false
      });
    }

    if (category === "All") {
      categoryPlace = await Listing.find({});
      return res.status(200).json({
        message: "All listings fetched",
        success: true,
        categoryPlace
      });
    }
    else {
      categoryPlace = await Listing.find({ category });

      if (categoryPlace.length === 0) {
        return res.status(404).json({
          message: "Right now There is no place with this request!",
          success: false
        });
      }

      res.status(200).json({
        message: "Places found",
        success: true,
        categoryPlace
      });
    }

  } catch (error) {
    console.log("Category Place Error : ", error);
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
}

export const getPlaceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format!",
        success: false
      });
    }

    if (!id) {
      return res.status(400).json({
        message: "Error, in getting id!",
        success: false
      })
    }
    const place = await Listing.findById({ _id: id });

    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Error, place not found!"
      });
    }

    res.status(200).json({
      message: "Success, place found!",
      success: true,
      place
    })

  } catch (error) {
    console.log("Place Find Error : ", error);
    res.status(500).json({
      message: "Internal server error",
      success: false
    })
  }
}

export const deletePlace = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!userId || !id) {
      return res.status(400).json({
        message: "userId and id required!",
        success: false
      });
    }

    await Listing.findByIdAndDelete(id);

    await User.findByIdAndUpdate(
      userId,
      { $pull: { listing: { _id: id } } },
      { new: true }
    );

    const booking = await Booking.find({ listingId: id });

    const bookingIds = booking.map((b) => b._id);

    await User.updateMany(
      {},
      {
        $pull: {
          booking: {
            _id: { $in: bookingIds }
          }
        }
      }
    );

    await Booking.deleteMany({ listingId: id });

    res.status(200).json({
      message: "Place and associated bookings deleted successfully!",
      success: true
    });

  } catch (error) {
    console.error("Error deleting place:", error);
    res.status(500).json({
      message: "Something went wrong while deleting place.",
      success: false,
      error: error.message
    });
  }
};
