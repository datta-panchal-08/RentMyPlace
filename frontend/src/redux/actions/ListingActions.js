import { toast } from 'react-toastify';
import {get, post} from '../../api/Endpoint.js'
import { setIsListingUpdated, setListing } from '../reducers/ListingSlice.js';

export const getAllListings = () => async (dispatch, getState) => {
    try {
        const res = await get("/listing/all");
        if (res.status === 200) {
            dispatch(setListing(res?.data?.allListings));
            dispatch(setIsListingUpdated());
        }
    } catch (error) {
        console.log("All Listing Error : ", error?.response?.data?.message);
    }
};

export const findPlaceBycategory = (category)=>async(dispatch,getState)=>{
    try {
        const res = await post('/listing/category',{category});
        if(res.status === 200){
            dispatch(setListing(res?.data?.categoryPlace));
        }
   } catch (error) {
        console.log("Findplace By Category Error : ",error);
        dispatch(setListing(null));
    }
}



