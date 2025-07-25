import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { MdOutlineFileUpload } from "react-icons/md";
import { get, patch, post } from '../api/Endpoint';
import { useDispatch } from 'react-redux';
import { setIsListingUpdated } from '../redux/reducers/ListingSlice';
import { useNavigate, useParams } from 'react-router-dom';
const CreateListing = () => {
  document.title = "List";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = ['Rooms', "Trending", "Villa", "Farm House", "Pool House", "Flat", "Pg", "Cabins", "Shop"];
  const { id } = useParams();

  const findPlaceById = async () => {
    try {
      const res = await get(`/listing/place/${id}`);
      if (res.status === 200) {
        const { data } = res;
        setTitle(data?.place?.title);
        setDescription(data?.place?.description);
        setPrice(data?.place?.price);
        setCategory(data?.place?.category);
        setImage1(data?.place?.image1); 
        setImage2(data?.place?.image2);
        setImage3(data?.place?.image3);
        setLocation(data?.place?.location);
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      console.log(errorMsg);
    }
  }

  useEffect(() => {
    if (id) {
      findPlaceById();
    }
  }, [id])

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setCategory("");
    setPrice(0);
    setImage1(null);
    setImage2(null);
    setImage3(null);
  }

  const handleAddListing = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    let formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("category", category);
    formdata.append("image1", image1);
    formdata.append("image2", image2);
    formdata.append("image3", image3);
    formdata.append("location", location);
    formdata.append("price", price);

    let res;

    if (id) {
      res = await patch(`/listing/update/place/${id}`, formdata);
    } else {
      res = await post("/listing/add", formdata);
    }

    if (res?.status === 200 || res?.status === 201) {
      toast.success(res?.data?.message);
      dispatch(setIsListingUpdated(true));
      resetForm();
    }
   navigate("/")
  } catch (error) {
    const errorMsg = error?.response?.data?.message || "Something went wrong!";
    toast.error(errorMsg);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full h-full px-2 lg:py-5 py-2 ">
      <form onSubmit={handleAddListing} className='w-full h-full flex gap-5 flex-col lg:flex-row custom-shadow px-5 py-2 lg:py-5'>
        {/* Left Div Content */}
        <div className="left w-full flex flex-col gap-2  lg:w-[70%]  h-full">

          {/* location and title  */}
          <div className=" w-full flex flex-col gap-2 lg:flex-row   h-full">
            <div className="input-div flex flex-col w-full lg:w-[50%]">
              <label htmlFor="title">Title</label>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Title...' className='py-2 lg:py-2 px-2 border-1 placeholder:text-zinc-600 rounded-md border-gray-300 outline-none' />
            </div>
            <div className="input-div flex flex-col w-full lg:w-[50%]">
              <label htmlFor="location">Location</label>
              <input onChange={(e) => setLocation(e.target.value)} value={location} type="text" placeholder='Location...' className='py-2 lg:py-2 px-2 border-1 placeholder:text-zinc-600 rounded-md border-gray-300 outline-none' />
            </div>
          </div>

          {/* Category and Price */}
          <div className=" w-full flex flex-col gap-2 lg:flex-row h-full">
            <div className="input-div flex flex-col w-full lg:w-[50%]">
              <label htmlFor="price">Price</label>
              <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='Price...' className='py-2 lg:py-2 px-2 border-1 rounded-md border-gray-300 outline-none' />
            </div>
            <div className="input-div flex flex-col w-full overflow-hidden lg:w-[50%]">
              <label htmlFor="category">Category</label>
              <select onChange={(e) => setCategory(e.target.value)} value={category} className='py-[11px] px-2 border-1 overflow-hidden relative rounded-md placeholder:text-zinc-600 border-gray-300 outline-none bg-transparent'  >
                <option disabled>Select Category</option>
                {
                  categories.map((category, i) => {
                    return <option key={i} className='w-full text-black' value={category}>{category}</option>
                  })
                }
              </select>
            </div>
          </div>

          {/* Description */}

          <div className=" w-full flex flex-col gap-2 lg:flex-row h-full">
            <div className="input-div flex flex-col w-full">
              <label htmlFor="description">Description</label>
              <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='lg:h-[100px] h-[80px] outline-none rounded-md placeholder:text-zinc-600 border-gray-300 border-1 px-2 ' placeholder='Description...' ></textarea>
            </div>
          </div>

          {/* First Image Uploader */}
          <div className="imag-1 w-full rounded-md border-dashed border-3 flex-col outline-blue-500 border-gray-300 bg-transparent h-[30vh] flex items-center justify-center custom-shadow">
            <label className="flex-col gap-2 items-center justify-center">
              <MdOutlineFileUpload className='text-6xl bg-amber-400 border-none text-zinc-900 cursor-pointer border-2 w-[200px]' />
              <input
                type="file"
                className="hidden"
                onChange={(e) => setImage1(e.target.files[0])}
              />
            </label>
            {
              id ? <>{image1?.url.slice(0, 30)}...</> : <> {
                image1 ? <h3>{image1?.name}</h3> : <h3>Upload First Image</h3>
              }</>
            }
          </div>

        </div>
        {/* Right Div Content */}
        <div className="right w-full flex flex-col gap-2  lg:w-[30%]  h-full">

          {/* Second Image Uploader */}
          <div className="imag-1 w-full rounded-md border-dashed border-3 flex-col outline-blue-500 border-gray-300 bg-transparent h-[30vh] flex items-center justify-center custom-shadow">
            <label className="flex-col gap-2 items-center justify-center">
              <MdOutlineFileUpload className='text-6xl bg-amber-400 border-none text-zinc-900 cursor-pointer border-2 w-[200px]' />              <input
                type="file"
                className="hidden"
                onChange={(e) => setImage2(e.target.files[0])}
              />
            </label>
            {
              id ? <>{image2?.url.slice(0, 30)}...</> : <> {
                image2 ? <h3>{image2?.name}</h3> : <h3>Upload Second Image</h3>
              }</>
            }
          </div>

          {/* Third Image Uploader */}
          <div className="imag-1 w-full rounded-md border-dashed border-3 flex-col outline-blue-500 border-gray-300 bg-transparent h-[30vh] flex items-center justify-center custom-shadow">
            <label className="flex-col gap-2 items-center justify-center">
              <MdOutlineFileUpload className='text-6xl bg-amber-400 border-none text-zinc-900 cursor-pointer border-2 w-[200px]' />
              <input
                type="file"
                className="hidden"
                onChange={(e) => setImage3(e.target.files[0])}
              />
            </label>
            {
              id ? <>{image3?.url.slice(0, 30)}...</> : <> {
                image3 ? <h3>{image3?.name}</h3> : <h3>Upload Third Image</h3>
              }</>
            }
          </div>

          {
            id ? <button
              type='submit'
              disabled={loading}
              className='w-full cursor-pointer lg:py-3 py-2 lg:mt-2 bg-orange-500 text-white font-semibold rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600'
            >
              {loading ? "Updating..." : "Update"}
            </button> : <button
              type='submit'
              disabled={loading}
              className='w-full cursor-pointer lg:py-3 py-2 lg:mt-2 bg-orange-500 text-white font-semibold rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600'
            >
              {loading ? "Creating..." : "Create"}
            </button>
          }

        </div>
      </form>
    </div>
  )
}

export default CreateListing