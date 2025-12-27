import { MdOutlineVerifiedUser } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { BsTrash2Fill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { del } from "../api/Endpoint";
import { toast } from 'react-toastify';
import { setIsListingUpdated } from "../redux/reducers/ListingSlice";
const ListingCard = ({ listing, isCreator, setUpdate }) => {
  const { popup } = useSelector(state => state.auth);
  const categories = ["Shop", "Cabins", "Pg", "Flat"];
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const deleteHandler = async () => {
    try {
      const res = await del(`/listing/delete/${listing?._id}`);
      if (res.status === 200) {
        toast.success(res?.data?.message);
        setUpdate(prev => !prev);
        dispatch(setIsListingUpdated(true));
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg);
    }
  }

  return (
    <div className='w-full h-[350px] hover:scale-105 hover:cursor-pointer rounded-xl overflow-hidden flex flex-col card-shadow shadow-white'>

      <Link to={`/place/${listing._id}`} className="aspect-[4/3] w-full relative overflow-hidden">
        <img className='w-full h-full object-cover' src={listing?.image1?.url} alt={listing?.title} />
        {listing.isBooked ? (
          <div
            className={`absolute top-1 right-1 py-1 px-2 rounded-md bg-slate-100 ${!popup ? "z-50" : ""
              }`}
          >
            <h3 className="text-green-700 text-xs font-semibold flex items-center gap-1">
              Booked <MdOutlineVerifiedUser className="text-sm text-red-500" />
            </h3>
          </div>
        ) : (
          <div
            className={`absolute top-1 left-1 py-1 px-2 rounded-md bg-slate-100 ${!popup ? "z-50" : ""
              }`}
          >
            {/* <h3 className="text-green-700 text-xs font-semibold">Available</h3> */}
          </div>
        )}
      </Link>


      <div className="content w-full flex flex-col gap-2 px-2 py-2">
        <h3 className='text-xs px-2 py-1 rounded-full text-zinc-800 bg-gray-100 w-fit'>{listing?.category}</h3>
        <h3 className='font-semibold text-gray-600'>{listing?.title?.slice(0, 20)}...</h3>
        <p className='text-sm font-[400] text-zinc-500'>{listing?.description?.slice(0, 59)}...</p>
        <div className='flex items-center justify-between'>
          {
            categories?.includes(listing?.category) ? <span className='text-red-400 text-sm font-semibold'>₹{listing?.price}/month</span> : <span className='text-red-400 text-sm font-semibold'>₹{listing?.price}/night</span>
          }
          <span className='text-xs font-semibold flex items-center gap-1 bg-gray-200 capitalize text-blue-600 rounded-full px-2 py-1 '>
            <FaLocationDot className="text-red-500" />{listing?.location}</span>
        </div>
      </div>

      {isCreator && user?._id === listing?.userId && (
        <div className="flex justify-between px-2 py-2">
          <Link to={`/update/place/${listing?._id}`} className="px-4 py-1 font-semibold cursor-pointer bg-yellow-500 text-white rounded-md">
            <FiEdit />
          </Link>
          <button onClick={deleteHandler} className="px-4 cursor-pointer py-1 font-semibold bg-red-500 text-white rounded-md">
            <BsTrash2Fill />
          </button>
        </div>
      )}


    </div>
  )
}

export default ListingCard