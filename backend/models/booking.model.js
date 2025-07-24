import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  listingId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Listing",
    required:true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  finalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  methodType:{
    type:String,
  }
}, {
  timestamps: true
});

export const Booking = mongoose.model("Booking", bookingSchema);
