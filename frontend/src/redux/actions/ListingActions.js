import {get, post} from '../../api/Endpoint.js'
import {setListing } from '../reducers/ListingSlice.js';

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


