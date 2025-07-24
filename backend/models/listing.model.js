import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image1: {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
    image2: {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
    image3: {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export const Listing = mongoose.model("Listing", listingSchema);
