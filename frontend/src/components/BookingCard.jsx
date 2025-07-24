import React from 'react';
import { TbCancel } from "react-icons/tb";
import { FaLocationDot } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { del } from '../api/Endpoint';

const BookingCard = ({ booking, setUpdate }) => {
  const { popup, user } = useSelector((state) => state.auth);
  const categories = ['Shop', 'Cabins', 'Pg', 'Flat'];

  const deleteHandler = async () => {
    try {
      const res = await del(`/booking/book/${booking?._id}`); 
      if (res.status === 200) {
        toast.success(res?.data?.message);
        setUpdate(true);
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong!";
      toast.error(errMsg);
    }
  };

  return (
    <div className='w-full h-[350px] transition-all ease-in duration-300 hover:scale-105 rounded-xl overflow-hidden flex flex-col card-shadow'>
      <Link to={`/place/${booking?.listingId?._id}`} className="aspect-[4/3] w-full relative overflow-hidden">
        <img
          className='w-full h-full object-cover'
          src={booking?.listingId?.image1?.url}
          alt={booking?.listingId?.title}
        />
        {booking?.listingId?.isBooked ? (
          <div className={`absolute top-1 right-1 py-1 px-2 rounded-md bg-slate-100 ${!popup ? "z-50" : ""}`}>
            <h3 className="text-green-700 text-xs font-semibold flex items-center gap-1">
              Booked <MdOutlineVerifiedUser className="text-sm text-red-500" />
            </h3>
          </div>
        ) : (
          <div className={`absolute top-1 left-1 py-1 px-2 rounded-md bg-slate-100 ${!popup ? "z-50" : ""}`}>
            <h3 className="text-green-700 text-xs font-semibold">Available</h3>
          </div>
        )}
      </Link>

      <div className="content w-full flex flex-col gap-2 px-2 py-2">
        <h3 className='text-xs px-2 py-1 rounded-full text-zinc-800 bg-gray-100 w-fit'>
          {booking?.listingId?.category}
        </h3>
        <h3 className='font-semibold text-gray-600'>
          {booking?.listingId?.title?.slice(0, 20)}...
        </h3>
        <p className='text-sm font-[400] text-zinc-500'>
          {booking?.listingId?.description?.slice(0, 59)}...
        </p>
        <div className='flex items-center justify-between'>
          {categories.includes(booking?.listingId?.category) ? (
            <span className='text-red-400 text-sm font-semibold'>
              ₹{booking?.listingId?.price}/month
            </span>
          ) : (
            <span className='text-red-400 text-sm font-semibold'>
              ₹{booking?.listingId?.price}/night
            </span>
          )}
          <span className='text-xs font-semibold flex items-center gap-1 bg-gray-200 capitalize text-blue-600 rounded-full px-2 py-1'>
            <FaLocationDot className="text-red-500" />
            {booking?.listingId?.location}
          </span>
        </div>
      </div>

      {user?._id === booking?.userId && (
        <div className="flex justify-between px-2 py-2">
          <button onClick={deleteHandler} className="px-4 py-1 font-semibold bg-red-500 text-white rounded-md">
            <TbCancel />
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
