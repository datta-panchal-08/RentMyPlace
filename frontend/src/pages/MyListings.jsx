import { useEffect, useState } from "react"
import { get } from "../api/Endpoint";
import Spinner from "../components/Spinner";
import ListingCard from "../components/ListingCard";

const MyListings = () => {
  
  document.title = "Listings"
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update,setUpdate] = useState(false);
  
  const getUserListings = async () => {
    try {
      const res = await get("/user/listings");

      if (res.status === 200) {
        setUserListings(res?.data?.listings);
      }else{
      setUserListings([]);
      }

      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data?.message);
      setLoading(false);
      setUserListings([]);
    }
  };


useEffect(() => {
  getUserListings();
}, [update]);


  return loading ? <Spinner /> : (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 px-5 gap-5 py-4 overflow-hidden'>
      {userListings?.length === 0 ? (
        <p className="font-semibold text-sm w-screen text-center text-gray-500">
          No Listings Found.
        </p>
      ) : (
        userListings?.map((listing) => (
          <ListingCard key={listing._id} listing={listing} isCreator={true} setUpdate={setUpdate} />
        ))
      )}
    </div>

  )
}

export default MyListings