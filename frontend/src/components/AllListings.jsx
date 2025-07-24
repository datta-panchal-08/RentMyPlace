import { useSelector } from 'react-redux';
import ListingCard from './ListingCard';
import Spinner from './Spinner';

const AllListings = () => {
  const listings = useSelector(state => state.listing.listings);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 px-5 gap-5 py-4 overflow-hidden'>
      {listings?.length > 0 ? (
        listings?.map((list) => (
          <ListingCard key={list?._id} listing={list} />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">No listings found</p>
      )}
    </div>
  );
};

export default AllListings;
