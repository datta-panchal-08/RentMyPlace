import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listings: [],
    isListUpdated: false,
    listingCategory:"All"
}

const Listingslice = createSlice({
    name: "listing",
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
       removeListingCategory:(state)=>{
          state.listingCategory = null;
       },
       clearListings:(state)=>{
        state.listings = null;
       } 

    }
});

export const { setListing,clearListings ,setIsListingUpdated ,setListingCategory ,removeListingCategory  } = Listingslice.actions;
export default Listingslice.reducer;