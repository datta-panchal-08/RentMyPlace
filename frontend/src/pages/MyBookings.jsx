import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import { get } from '../api/Endpoint';
import BookingCard from '../components/BookingCard';

const MyBookings = () => {
  document.title = "Bookings";

  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update,setUpdate] = useState(false);

  const getUserBookings = async () => {
    try {
      const res = await get("/user/bookings");

      if (res.status === 200) {
        setUserBookings(res?.data?.bookings);
      } else {
        setUserBookings([]);
      }

      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data?.message);
      setLoading(false);
      setUserBookings([]);
    }
  };

  useEffect(() => {
    if(update === true || userBookings?.length === 0){
          getUserBookings(); 
    }
  }, [update,userBookings?.length]);

  return loading ? (
    <Spinner />
  ) : (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 px-5 gap-5 py-4 overflow-hidden'>
      {userBookings?.length === 0 ? (
        <p className="font-semibold text-sm w-screen text-center text-gray-500">
          No Bookings Found.
        </p>
      ) : (
        userBookings?.map((booking) => (
          <BookingCard key={booking._id} booking={booking} setUpdate={setUpdate} />
        ))
      )}
    </div>
  );
};

export default MyBookings;
