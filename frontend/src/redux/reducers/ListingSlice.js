import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listings: [],
    isListUpdated: false,
    listingCategory:"All"
}

const Listingslice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setListing: (state, action) => {
            state.listings = action.payload;
            state.isListUpdated = false;
        },
        setIsListingUpdated: (state) => {
            state.isListUpdated = !state.isListUpdated;
        },
        setListingCategory:(state,action)=>{
            state.listingCategory = action.payload;
        },
        clearListings: (state) => {
            state.listings = [];
            state.isListUpdated = false; 
        }

    }
});

export const { setListing ,setIsListingUpdated ,setListingCategory ,clearListings  } = Listingslice.actions;
export default Listingslice.reducer;