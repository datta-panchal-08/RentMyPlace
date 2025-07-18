import Logo from '../assets/RentPng.png'
import { FaCity, FaMagnifyingGlass } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from 'react';
import { TbBrandBooking } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { MdHomeWork } from "react-icons/md";
import { FaThLarge } from 'react-icons/fa';
import { FaFirefoxBrowser } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { FaTreeCity } from "react-icons/fa6";
import { IoBedSharp } from "react-icons/io5";
import { MdPool } from "react-icons/md";
import { PiCity } from "react-icons/pi";
import { IoBedOutline } from "react-icons/io5";
import { GiShop } from "react-icons/gi";
import { GiWoodCabin } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { post } from '../api/Endpoint';
import { toast } from 'react-toastify';
import { isPopupVisible, removeUser } from '../redux/reducers/AuthSlice';
import { Link } from 'react-router-dom';
import { clearListings, setIsListingUpdated, setListing, setListingCategory } from '../redux/reducers/ListingSlice';
import { findPlaceBycategory } from '../redux/actions/ListingActions';


const Nav = () => {
  const {user,popup} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const listingCategory = useSelector((state) => state.listing.listingCategory);
  const {listings} = useSelector((state) => state.listing);

  const setPopup = ()=>{
    dispatch(isPopupVisible());
  }
  
  const setCategory = (cat)=>{
    dispatch(setListingCategory(cat));
  }

  const handleLogout = async()=>{
    try {
       const res = await post("/auth/logout");
       if(res.status === 200){
           toast.success(res?.data?.message);
           dispatch(removeUser());
           dispatch(clearListings());
       }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  const getListingByCategory = () => {
    if(listingCategory === "All"){
        dispatch(setIsListingUpdated());
    }else{
       dispatch(findPlaceBycategory(listingCategory));
    }
};

useEffect(() => {
  getListingByCategory();
}, [listingCategory]);

  const isActive=(cat)=> listingCategory === cat ? "text-red-500":"";
  
  return (
    <div className='w-full flex flex-col items-center gap-2'>

      <nav className='w-full  flex justify-between items-center border-b-2 border-gray-200 py-1 px-2'>
        <div className="img w-fit bg-orange-500 rounded-full px-2 flex items-center justify-center">
          <img className=' w-[40px] h-[px] md:w-[60px] md:h-[60px] object-cover select-none' src={Logo} alt="" />
          <h2 className='md:text-xl font-semibold text-white'>RentMyPlace</h2>
        </div>

        <div className="search  items-center w-[30%] hidden md:flex border-1 border-gray-300 rounded-full relative  ">
          <input className='w-[90%] px-[30px] py-[7px] placeholder:text-sm placeholder:font-semiboldoutline-none  placeholder:text-gray-400 outline-none' type="text" placeholder='Any Where | Any Location | Any city' />
          <button className='bg-orange-600  font-semibold cursor-pointer text-white px-2 py-2 rounded-full'><FaMagnifyingGlass /></button>
        </div>

        <div className="flex items-center justify-end gap-4 relative w-[17%]">
          {
            popup ? "" : <span className='hidden lg:block text-gray-500 font-semibold'>List Your Home</span>
          }
          <button className='px-5 gap-2 py-2 rounded-full border-1 border-gray-300 flex items-center'><GiHamburgerMenu className='text-xl cursor-pointer' onClick={() => setPopup(!popup)} /><CgProfile className='text-xl' /></button>
          {
            popup && <div className="menu  absolute top-[110%] right-[1%] md:right-[10%] border-1 border-gray-200 rounded-md w-[200px] h-[200px] bg-slate-50 z-50">
              <ul className='flex flex-col gap-5 py-2'>
                {
                  user ? <li onClick={handleLogout} className='flex cursor-pointer items-center ml-2 '>Logout</li>:<Link to={'/login'} className='flex items-center ml-2 cursor-pointer'>Login</Link>
                }
                <hr />
                <li className='flex items-center ml-2 '><MdHomeWork />List Your Home</li>
                <li className='flex items-center ml-2 '><FaClipboardList />My Listings</li>
                <li className='flex items-center ml-2 '><TbBrandBooking />Check Booking</li>
              </ul>
            </div>
          }
        </div>
      </nav>

      <div className="search flex items-center w-[95%] border-1 border-gray-300 rounded-full relative md:hidden ">
        <input className='w-[90%] px-[30px] py-[7px] placeholder:text-sm placeholder:font-semiboldoutline-none  placeholder:text-gray-400 outline-none' type="text" placeholder='Any Where | Any Location | Any city' />
        <button className='bg-orange-600 right-[2%] font-semibold cursor-pointer text-white px-2 py-2 rounded-full'><FaMagnifyingGlass /></button>
      </div>

        <div className="flex items-center flex-wrap gap-5 mt-3 justify-center">
      <span onClick={() => setCategory("All")} className={`flex flex-col items-center justify-center cursor-pointer ${isActive("All")}`}>
        <FaThLarge className="text-2xl" />
        <h4 className="text-xs font-semibold">All</h4>
      </span>

      <span onClick={() => setCategory("Trending")} className={`flex flex-col items-center justify-center cursor-pointer ${isActive("Trending")}`}>
        <FaFirefoxBrowser className="text-2xl" />
        <h4 className="text-xs font-semibold">Trending</h4>
      </span>

      <span onClick={() => setCategory("Villa")} className={`flex flex-col items-center justify-center cursor-pointer ${isActive("Villa")}`}>
        <GiFamilyHouse className="text-2xl" />
        <h4 className="text-xs font-semibold">Villa</h4>
      </span>

      <span onClick={() => setCategory("Farm House")} className={`flex flex-col items-center justify-center cursor-pointer ${isActive("Farm House")}`}>
        <FaTreeCity className="text-2xl" />
        <h4 className="text-xs font-semibold">Farm House</h4>
      </span>

      <span onClick={() => setCategory("Pool House")} className={`flex flex-col items-center justify-center cursor-pointer ${isActive("Pool House")}`}>
        <MdPool className="text-2xl" />
        <h4 className="text-xs font-semibold">Pool House</h4>
      </span>

      <span onClick={() => setCategory("Rooms")} className={`flex flex-col items-center justify-center cursor-pointer ${isActive("Rooms")}`}>
        <IoBedSharp className="text-2xl" />
        <h4 className="text-xs font-semibold">Rooms</h4>
      </span>

      <span onClick={() => setCategory("Flat")} className={`flex flex-col items-center justify-center cursor-pointer ${isActive("Flat")}`}>
        <FaCity className="text-2xl" />
        <h4 className="text-xs font-semibold">Flat</h4>
      </span>

      <span onClick={() => setCategory("Pg")} className={`flex flex-col items-center justify-center cursor-pointer ${isActive("Pg")}`}>
        <IoBedOutline className="text-2xl" />
        <h4 className="text-xs font-semibold">Pg</h4>
      </span>

      <span onClick={() => setCategory("Cabins")} className={`flex flex-col items-center justify-center cursor-pointer ${isActive("Cabins")}`}>
        <GiWoodCabin className="text-2xl" />
        <h4 className="text-xs font-semibold">Cabins</h4>
      </span>

      <span onClick={() => setCategory("Shop")} className={`flex flex-col items-center justify-center cursor-pointer ${isActive("Shop")}`}>
        <GiShop className="text-2xl" />
        <h4 className="text-xs font-semibold">Shop</h4>
      </span>
    </div>


    </div>
  )
}

export default Nav