import { MdOutlineVerifiedUser } from "react-icons/md";

const ListingCard = ({listing}) => {
    const categories = ["Shop","Cabins","Pg","Flat"];
  return (
    <div className='w-full h-[100%] rounded-xl overflow-hidden flex flex-col card-shadow'>
        <div className="img-container w-full relative h-[60%] overflow-hidden ">
              <img className='w-full h-full object-cover' src={listing?.image1} alt={listing?.title} />
              {
                listing.isBooked ? <div className="status absolute z-50 top-1 right-1 py-1 px-2 rounded-md bg-slate-100">
                <h3 className='text-green-700 text-xs font-semibold flex items-center'>Booked<MdOutlineVerifiedUser className="text-sm"/></h3>
              </div>:<div className="status absolute z-50 top-1 left-1 py-1 px-2 rounded-md bg-slate-50">
                <h3 className='text-green-700 text-xs font-semibold'>Available</h3>
              </div>
              }
              
        </div>
        <div className="content w-full flex flex-col gap-1 px-2 py-2">
            <h3 className='text-xs px-2 py-1 rounded-full bg-gray-100 w-fit'>{listing?.category}</h3>
            <h3 className='font-semibold text-gray-600'>{listing?.title?.slice(0,20)}...</h3>
            <p className='text-sm font-[400] text-zinc-500'>{listing?.description?.slice(0,70)}...</p>
            <div className='flex items-center justify-between'>
              {
               categories?.includes(listing?.category)? <span className='text-red-400 text-sm font-semibold'>₹{listing?.price}/month</span>: <span className='text-red-400 text-sm font-semibold'>₹{listing?.price}/day</span>
              }
              <span className='text-xs font-semibold bg-gray-200 capitalize text-blue-600 rounded-full px-2 py-1 '>{listing?.location}</span>
            </div>
        </div>
    </div>
  )
}

export default ListingCard