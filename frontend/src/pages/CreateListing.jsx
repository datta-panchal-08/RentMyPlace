import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get, patch, post } from '../api/Endpoint';
import { useDispatch, useSelector } from 'react-redux';
import { setIsListingUpdated } from '../redux/reducers/ListingSlice';
import { useNavigate, useParams } from 'react-router-dom';

const CreateListing = () => {
  document.title = "List";
  const {isDarkMode} = useSelector(state => state.auth); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const categories = ['Rooms', "Trending", "Villa", "Farm House", "Pool House", "Flat", "Pg", "Cabins", "Shop"];

  const findPlaceById = async () => {
    try {
      const res = await get(`/listing/place/${id}`);
      if (res.status === 200) {
        const { data } = res;
        setTitle(data?.place?.title);
        setDescription(data?.place?.description);
        setPrice(data?.place?.price);
        setCategory(data?.place?.category);
        setImageUrl1(data?.place?.image1?.url || "");
        setImageUrl2(data?.place?.image2?.url || "");
        setImageUrl3(data?.place?.image3?.url || "");
        setLocation(data?.place?.location);
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      console.log(errorMsg);
    }
  };

  useEffect(() => {
    if (id) findPlaceById();
  }, [id]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setCategory("");
    setPrice(0);
    setImageUrl1("");
    setImageUrl2("");
    setImageUrl3("");
  };

  const handleAddListing = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title,
        description,
        category,
        location,
        price,
        image1: imageUrl1,
        image2: imageUrl2,
        image3: imageUrl3
      };

      let res;

      if (id) {
        res = await patch(`/listing/update/place/${id}`, payload);
      } else {
        res = await post("/listing/add", payload);
      }

      if (res?.status === 200 || res?.status === 201) {
        toast.success(res?.data?.message);
        dispatch(setIsListingUpdated(true));
        resetForm();
      }

      navigate("/");

    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full px-2 lg:py-5 py-2">
      <form onSubmit={handleAddListing} className='w-full h-full flex gap-5 flex-col lg:flex-row custom-shadow px-5 py-2 lg:py-5'>

        {/* Left Div */}
        <div className="left w-full flex flex-col gap-2 lg:w-[70%] h-full">

          {/* Location and Title */}
          <div className="w-full flex flex-col gap-2 lg:flex-row h-full">
            <div className="input-div flex flex-col w-full lg:w-[50%]">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title...'
                className='py-2 px-2 border-1 rounded-md border-gray-300 outline-none'
              />
            </div>
            <div className="input-div flex flex-col w-full lg:w-[50%]">
              <label>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder='Location...'
                className='py-2 px-2 border-1 rounded-md border-gray-300 outline-none'
              />
            </div>
          </div>

          {/* Category and Price */}
          <div className="w-full flex flex-col gap-2 lg:flex-row h-full">
            <div className="input-div flex flex-col w-full lg:w-[50%]">
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='Price...'
                className='py-2 px-2 border-1 rounded-md border-gray-300 outline-none'
              />
            </div>
            <div className="input-div flex flex-col w-full lg:w-[50%]">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`py-2 px-2 text-gray-400 border-1 rounded-md border-gray-300 outline-none ${!isDarkMode ? "bg-transparent":" bg-transparent text-gray-500"}`}
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="w-full flex flex-col gap-2">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Description...'
              className='h-[100px] px-2 border-1 rounded-md border-gray-300 outline-none'
            ></textarea>
          </div>

          {/* Image URL 1 */}
          <div className="w-full flex flex-col gap-1">
            <label>Image URL 1</label>
            <input
              type="text"
              value={imageUrl1}
              onChange={(e) => setImageUrl1(e.target.value)}
              placeholder='Enter Image URL 1'
              className='py-2 px-2 border-1 rounded-md border-gray-300 outline-none'
            />
          </div>

        </div>

        {/* Right Div */}
        <div className="right w-full flex flex-col gap-2 lg:w-[30%] h-full">

          {/* Image URL 2 */}
          <div className="w-full flex flex-col gap-1">
            <label>Image URL 2</label>
            <input
              type="text"
              value={imageUrl2}
              onChange={(e) => setImageUrl2(e.target.value)}
              placeholder='Enter Image URL 2'
              className='py-2 px-2 border-1 rounded-md border-gray-300 outline-none'
            />
          </div>

          {/* Image URL 3 */}
          <div className="w-full flex flex-col gap-1">
            <label>Image URL 3</label>
            <input
              type="text"
              value={imageUrl3}
              onChange={(e) => setImageUrl3(e.target.value)}
              placeholder='Enter Image URL 3'
              className='py-2 px-2 border-1 rounded-md border-gray-300 outline-none'
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full lg:py-3 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? (id ? "Updating..." : "Creating...") : (id ? "Update" : "Create")}
          </button>

        </div>
      </form>
    </div>
  );
};

export default CreateListing;
