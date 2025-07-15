import { Listing } from '../models/listing.model.js';

export const getAllListings = async (req, res) => {
    try {
        // const userId = req.user.id;

        // if(!userId){
        //     return res.status(401).json({
        //         message:"Unauthorized, Login First"
        //     })
        // }

        const allListings = await Listing.find({});

        res.status(200).json({
            message: "Listings Fetched",
            success: true,
            allListings
        });

    } catch (error) {
        console.log("Listing Error ", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const getListingByCategory = async(req,res)=>{
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        message: "Category is required!",
        success: false
      });
    }

    const categoryPlace = await Listing.find({ category });

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

  } catch (error) {
    console.log("Category Place Error : ", error);
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
}

