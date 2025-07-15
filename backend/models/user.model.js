import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }
}, { timestamps: true }); 

export const User = mongoose.model("User",userSchema);