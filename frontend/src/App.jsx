import React, { useEffect } from 'react'
import MainRoutes from './routes/MainRoutes'
import {ToastContainer} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { getAllListings } from './redux/actions/ListingActions';

const App = () => {
  const dispatch = useDispatch();
    const isListingUpdated = useSelector(state => state.listing.isListUpdated);
    const {listings} = useSelector(state => state.listing);

  useEffect(()=>{
    if(listings?.length === 0 ||isListingUpdated){
           dispatch(getAllListings());
    }
  },[dispatch, isListingUpdated]);


  return (
    <div className='max-w-screen min-h-screen text-black'>
      <ToastContainer position='top-center'/>
      <MainRoutes/>
    </div>
  )
}

export default App