import React, { useEffect } from 'react'
import MainRoutes from './routes/MainRoutes'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { findPlaceBycategory } from './redux/actions/ListingActions';
import { setListingCategory } from './redux/reducers/ListingSlice';
import Nav from './components/Nav'
import { useLocation } from 'react-router-dom';
const App = () => {
  const dispatch = useDispatch();
  const isListingUpdated = useSelector(state => state.listing.isListUpdated);
  const { listings } = useSelector(state => state.listing);
  const {isDarkMode}= useSelector(state=>state.auth);
  const {pathname} = useLocation();
  const paths = ['/login','/signup'];
  useEffect(() => {
    if (listings?.length === 0 || isListingUpdated) {
      dispatch(setListingCategory("All"));
      dispatch(findPlaceBycategory("All"));
    }
  }, [dispatch, isListingUpdated]);
  
  

  return (
    <div className={`${isDarkMode ? "bg-zinc-950 max-w-screen shadow-white shadow-2xl min-h-screen text-white":"max-w-screen min-h-screen text-black"}`}>
      <ToastContainer position='top-center' />
      {
        paths.includes(pathname) ? "":<Nav/>
      }
      <MainRoutes />
    </div>
  )
}

export default App