import { Listing } from '../models/listing.model.js';
import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import { Booking } from '../models/booking.model.js';
import uploadToCloudinary, { deleteFromCloudinary } from '../config/cloudinary.js';

export const createListing = async (req, res) => {
  try {
    const { title, description, location, price, category } = req.body;
    const userId = req.user.id;
    const image1 = await uploadToCloudinary(req.files?.image1[0]?.path);
    const image2 = await uploadToCloudinary(req.files?.image2[0]?.path);
    const image3 = await uploadToCloudinary(req.files?.image3[0]?.path);

    if (!req.files?.image1 || !req.files?.image2 || !req.files?.image3) {
      return res.status(400).json({
        message: "All three images are required",
        success: false
      });
    }


    if (
      !title ||
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
        title, image1: {
          url: image1.secure_url,
          public_id: image1.public_id
        }, image2: {
          url: image2.secure_url,
          public_id: image2.public_id
        }, image3: {
          url: image3.secure_url,
          public_id: image3.public_id
        }, price, description, location, category, userId: userId
      }
    );
    await newListing.save();
    await User.findByIdAndUpdate(userId, { $push: { listing: newListing._id } }, { new: true }).exec();
    res.status(201).json({
      message: "Listing Created!",
      success: true,
      newListing
    });

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
      message: "Listing Deleted!",
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

export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, price, category } = req.body;

    const findListing = await Listing.findById(id);

    if (!findListing) {
      return res.status(404).json({
        message: "No Listing Found!",
        success: false
      })
    }

    const oldImage1 = findListing.image1.public_id && findListing.image1.public_id;
    const oldImage2 = findListing.image2.public_id && findListing.image2.public_id;
    const oldImage3 = findListing.image3.public_id && findListing.image3.public_id;

    const newImg1 = req.files?.image1 ? await uploadToCloudinary(req.files.image1[0].path) : null;
    const newImg2 = req.files?.image2 ? await uploadToCloudinary(req.files.image2[0].path) : null;
    const newImg3 = req.files?.image3 ? await uploadToCloudinary(req.files.image3[0].path) : null;


    if (newImg1) {
      await deleteFromCloudinary(oldImage1);
    }
    if (newImg2) {
      await deleteFromCloudinary(oldImage2);
    }
    if (newImg3) {
      await deleteFromCloudinary(oldImage3);
    }

    const updatedListing = await Listing.findByIdAndUpdate(id, {
      title, location, category, price, description,
      image1: newImg1
        ? { url: newImg1.secure_url, public_id: newImg1.public_id }
        : findListing.image1,

      image2: newImg2
        ? { url: newImg2.secure_url, public_id: newImg2.public_id }
        : findListing.image2,

      image3: newImg3
        ? { url: newImg3.secure_url, public_id: newImg3.public_id }
        : findListing.image3,

    }, { new: true })

    res.status(200).json({
      message: "Listing Updated!",
      success: true
    })

  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({
      message: "Something went wrong while update place.",
      success: false,
      error: error.message
    })
  }
}
