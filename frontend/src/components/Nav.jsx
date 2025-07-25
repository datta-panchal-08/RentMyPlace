import Logo from '../assets/RentPng.png'
import { FaCity, FaMagnifyingGlass, FaUser, FaUserLarge } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from 'react';
import { TbBrandBooking } from "react-icons/tb";
import { FaClipboardList, FaUserCircle } from "react-icons/fa";
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
import { isPopupVisible, removeUser, setDarkMode } from '../redux/reducers/AuthSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearListings, setIsListingUpdated, setListing, setListingCategory } from '../redux/reducers/ListingSlice';
import { findPlaceBycategory } from '../redux/actions/ListingActions';
import { IoPartlySunny } from "react-icons/io5";
import { FaCloudMoon } from "react-icons/fa6";
import { persist } from '../redux/store'; 

const Nav = () => {
  const { user, popup, isDarkMode } = useSelector(state => state.auth);
  const { listings } = useSelector(state => state.listing);
  const dispatch = useDispatch();
  const listingCategory = useSelector((state) => state.listing.listingCategory);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchTxt, setSearchTxt] = useState("");
  const paths = ['/bookings', '/listings', '/place', '/add-place','/update/place'];

  const setPopup = () => {
    dispatch(isPopupVisible());
  }
  const toggleHandler = () => {
    dispatch(setDarkMode());
  }
  const setCategory = (cat) => {
    dispatch(setListingCategory(cat));
  }

  const searchHandler = () => {
    const filteredListings = listings.filter((listing) => {
      const query = searchTxt.toLowerCase();
      return (
        listing.location.toLowerCase().includes(query) ||
        listing.category.toLowerCase().includes(query) ||
        listing.location.toLowerCase().includes(query)
      )
    });

    dispatch(setListing(filteredListings));
  };

  useEffect(() => {
    if (searchTxt.trim() === "") {
      dispatch(setIsListingUpdated(true));
    }
  }, [searchTxt]);


  const handleLogout = async () => {
    try {
      const res = await post("/auth/logout");
      if (res.status === 200) {
        toast.success(res?.data?.message);
        dispatch(removeUser());
        dispatch(clearListings());
        dispatch(setIsListingUpdated());
        persist.purge();
        navigate('/login');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  const getListingByCategory = () => {
    if (listingCategory === "All") {
      dispatch(setIsListingUpdated(true));
    } else {
      dispatch(findPlaceBycategory(listingCategory));
    }
  };

  useEffect(() => {
    getListingByCategory();
  }, [listingCategory]);

  const isActive = (cat) => listingCategory === cat ? "text-red-500" : "";

  return (
    <div className='w-full flex flex-col items-center gap-2'>

      <nav className='w-full flex justify-between items-center border-b-2 border-gray-200 py-1 px-2'>
        <Link
          to="/"
          className="w-fit bg-white text-black fontsem cursor-pointer custom-shadow rounded-3xl px-3 py-1 flex items-center justify-center gap-1 shadow-md transition-all duration-300 hover:scale-105"
        >
          <img
            className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] object-cover select-none"
            src={Logo}
            alt="logo"
          />
          <h2 className="md:text-xl text-sm font-bold montserrat uppercase text-orange-600 ">
            RentMyPlace
          </h2>
        </Link>




        <div className="search  items-center w-[30%] border border-gray-300 rounded-full px-3 py-2 hidden lg:flex max-w-[400px]">
          <input
            onChange={(e) => setSearchTxt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchHandler();
              }
            }}
            value={searchTxt}
            className="flex-grow bg-transparent outline-none px-2 placeholder:text-sm placeholder:font-semibold placeholder:text-gray-400"
            type="text"
            placeholder="Anywhere | Any Location | Any City"
          />
          <button
            onClick={searchHandler}
            className="bg-orange-600 font-semibold text-white p-2 rounded-full flex items-center justify-center"
          >
            <FaMagnifyingGlass size={16} />
          </button>
        </div>


        <div className="flex items-center justify-end gap-4 relative w-[17%]">
          {
            popup ? "" : <Link to={"/add-place"} className='hidden text-sm text-nowrap lg:block text-gray-500 font-semibold'>List Your Home</Link>
          }



          <div className=" md:px-4 py-1 px-2 gap-2 md:py-2 text-black bg-white rounded-full custom-shadow flex items-center">
            {
              !user ? <FaUserCircle className='w-[30px] flex items-center justify-center h-[30px] rounded-full custom-shadow text-xs font-semibold text-blue-500 px-1' /> : <span className='md:w-[30px] flex items-center justify-center h-[25px] w-[25px] md:h-[30px] rounded-full hover:scale-105 duration-300 custom-shadow text-xl font-semibold text-orange-500'>
                {user?.username.slice(0, 1)}
              </span>
            }
            <button className={` ${isDarkMode ? "" : ""} w-[30px] px-1 flex items-center justify-center h-[30px] rounded-full custom-shadow cursor-pointer text-xl hover:scale-105 duration-300 `} onClick={toggleHandler}>
              {
                isDarkMode === true ? <IoPartlySunny className='text-yellow-500 font-semibold' /> : <FaCloudMoon className='text-[#34517D]' />
              }
            </button>
            <button className='w-[30px] flex items-center justify-center hover:scale-105 duration-300 h-[30px] rounded-full custom-shadow'>
              <GiHamburgerMenu className='text-xl cursor-pointer ' onClick={() => setPopup(!popup)} />
            </button>
          </div>

          {
            popup && <div className="menu text-zinc-800 absolute top-[110%] right-[1%] md:right-[1%] border-1 border-gray-200 rounded-md w-[200px] h-[200px] bg-slate-50 z-50">
              <ul className='flex flex-col gap-5 py-2'>
                {
                  user ? <li onClick={handleLogout} className='flex cursor-pointer items-center ml-2 '>Logout</li> : <button onClick={()=>{
                    navigate("/login");
                    dispatch(removeUser());
                  }} className='flex items-center ml-2 cursor-pointer'>Login</button>
                }
                <hr />
                <Link to={"/add-place"} className='flex items-center ml-2 '><MdHomeWork />List Your Home</Link>
                <Link to={'/listings'} className='flex items-center ml-2 '><FaClipboardList />My Listings</Link>
                <Link to={"/bookings"} className='flex items-center ml-2 '><TbBrandBooking />Check Booking</Link>
              </ul>
            </div>
          }
        </div>
      </nav>

      {
        !paths.some(path => pathname.startsWith(path)) && <>

          <div className="search flex items-center w-[95%] max-w-[600px] border border-gray-300 rounded-full px-3 py-2 lg:hidden">
            <input
              onChange={(e) => setSearchTxt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchHandler();
                }
              }}
              className="flex-grow bg-transparent outline-none px-2 placeholder:text-sm placeholder:font-semibold placeholder:text-gray-400"
              type="text"
              placeholder="Anywhere | Any Location | Any City"
            />
            <button
              onClick={searchHandler}
              className="bg-orange-600 text-white p-2 rounded-full flex items-center justify-center"
            >
              <FaMagnifyingGlass size={16} />
            </button>
          </div>


          <div className="flex items-center flex-wrap gap-5 mt-3 px-2 justify-center">
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
        </>
      }


    </div>
  )
}

export default Nav
