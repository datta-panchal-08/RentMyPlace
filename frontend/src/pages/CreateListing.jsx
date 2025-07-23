import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { MdOutlineFileUpload } from "react-icons/md";

const CreateListing = () => {
  document.title = "List";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [price, setPrice] = useState(null);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const categories = ['Rooms', "Trending", "Villa", "Farm House", "Pool House", "Flat", "Pg", "Cabins", "Shop"];

  const handleAddListing = async (e) => {
    e.preventDefault();
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

      const res = await post("/listing/add", formdata);

      if (res.status === 201) {
        toast.success(res?.data?.message);
      }

    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      toast.error(errorMsg);
    }
  }

  return (
    <div className="w-full h-full px-2 lg:py-5 py-2 ">
      <form className='w-full h-full flex gap-5 flex-col lg:flex-row custom-shadow px-5 py-2 lg:py-5'>
        {/* Left Div Content */}
        <div className="left w-full flex flex-col gap-2  lg:w-[70%]  h-full">

          {/* location and title  */}
          <div className=" w-full flex flex-col gap-2 lg:flex-row   h-full">
            <div className="input-div flex flex-col w-full lg:w-[50%]">
              <label htmlFor="title">Title</label>
              <input type="text" placeholder='Title...' className='py-2 lg:py-2 px-2 border-1 rounded-md border-gray-300 outline-none' />
            </div>
            <div className="input-div flex flex-col w-full lg:w-[50%]">
              <label htmlFor="location">Location</label>
              <input type="text" placeholder='Location...' className='py-2 lg:py-2 px-2 border-1 rounded-md border-gray-300 outline-none' />
            </div>
          </div>

          {/* Category and Price */}

          <div className=" w-full flex flex-col gap-2 lg:flex-row h-full">
            <div className="input-div flex flex-col w-full lg:w-[50%]">
              <label htmlFor="price">Price</label>
              <input type="number" placeholder='Price...' className='py-2 lg:py-2 px-2 border-1 rounded-md border-gray-300 outline-none' />
            </div>
            <div className="input-div flex flex-col w-full overflow-hidden lg:w-[50%]">
              <label htmlFor="category">Category</label>
              <select className='py-[11px] px-2 border-1 overflow-hidden relative rounded-md border-gray-300 outline-none'  >
                <option disabled>Select Category</option>
                {
                  categories.map((category, i) => {
                    return <option key={i} className='w-full' value={category}>{category}</option>
                  })
                }
              </select>
            </div>
          </div>

          {/* Description */}

          <div className=" w-full flex flex-col gap-2 lg:flex-row h-full">
            <div className="input-div flex flex-col w-full">
              <label htmlFor="description">Description</label>
              <textarea className='lg:h-[100px] h-[80px] outline-none rounded-md border-gray-300 border-1 px-2 ' placeholder='Description...' ></textarea>
            </div>
          </div>

           {/* First Image Uploader */}
          <div className="imag-1 w-full rounded-md border-dashed border-3 flex-col outline-blue-500 border-gray-300 bg-transparent h-[30vh] flex items-center justify-center custom-shadow">
            <label className="flex-col gap-2 items-center justify-center">
              <MdOutlineFileUpload className='text-6xl border-dashed border-2 border-zinc-500' />
              <input
                type="file"
                className="hidden"
                onChange={(e) => setImage1(e.target.files[0])}
              />
            </label>
            {
              image1 ? <h3>{image1?.name}</h3> : <h3>Upload First Image</h3>
            }
          </div>

        </div>
        {/* Right Div Content */}
        <div className="right w-full flex flex-col gap-2  lg:w-[30%]  h-full">
        
          {/* Second Image Uploader */}
           <div className="imag-1 w-full rounded-md border-dashed border-3 flex-col outline-blue-500 border-gray-300 bg-transparent h-[30vh] flex items-center justify-center custom-shadow">
            <label className="flex-col gap-2 items-center justify-center">
              <MdOutlineFileUpload className='text-6xl border-dashed border-2 border-zinc-500' />
              <input
                type="file"
                className="hidden"
                onChange={(e) => setImage2(e.target.files[0])}
              />
            </label>
            {
              image2 ? <h3>{image2?.name}</h3> : <h3>Upload Second Image</h3>
            }
          </div>

          {/* Third Image Uploader */}
           <div className="imag-1 w-full rounded-md border-dashed border-3 flex-col outline-blue-500 border-gray-300 bg-transparent h-[30vh] flex items-center justify-center custom-shadow">
            <label className="flex-col gap-2 items-center justify-center">
              <MdOutlineFileUpload className='text-6xl border-dashed border-2 border-zinc-500' />
              <input
                type="file"
                className="hidden"
                onChange={(e) => setImage1(e.target.files[0])}
              />
            </label>
            {
              image3 ? <h3>{image3?.name}</h3> : <h3>Upload Third Image</h3>
            }
          </div>
           
           <button className='w-full lg:py-3 py-2 lg:mt-2 bg-orange-500 text-white font-semibold' type='submit' disabled={loading}> {
            loading ? "Saving...":"Submit"
            }</button>

        </div>
      </form>
    </div>
  )
}

export default CreateListing