import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get } from '../api/Endpoint';
import { RiTelegram2Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { FaLocationDot, FaTelegram } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from '../components/BookingModal';
import BookingModal from '../components/BookingModal';

const PlaceDetails = () => {
    document.title = "Details"
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const categories = ["Shop", "Pg", "Flat"];
    const [open, setOpen] = useState(false);

    const chatHandler = () => {
        toast.warning("Coming soon!");
    }

  
    const getPlaceById = async () => {
        try {
            const res = await get(`/listing/place/${id}`);
            if (res.status === 200) {
                setPlace(res?.data?.place);
            }
            setLoading(false);
        } catch (error) {
            console.log("Findplace By Id Error : ", error);
            setLoading(true);
        }
    }
    useEffect(() => {
        getPlaceById();
    }, [id]);
    

    return loading ? <Spinner /> : (
        <div className="flex flex-col gap-2 mx-auto px-2 lg:px-5 py-4">
            {/* Images Section */}
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">

                <div className="img-1 w-full h-[30vh] md:h-[45vh] xl:h-[65vh] ">
                    <img
                        className='w-full h-full object-cover rounded-2xl'
                        src={place?.image1?.url}
                        alt={place?.title}
                    />
                </div>

                {/* <div className="img-2-3 flex gap-2 lg:gap-5 w-full lg:w-[50%] h-[30vh] lg:h-[50vh]"> */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="w-full h-[25vh] xl:h-full overflow-hidden">
                        <img
                            className='w-full h-full object-cover rounded-2xl'
                            src={place?.image2?.url}
                            alt={place?.title}
                        />
                    </div>
                    <div className="w-full h-[25vh] xl:h-full overflow-hidden">
                        <img
                            className='w-full h-full object-cover rounded-2xl'
                            src={place?.image3?.url}
                            alt={place?.title}
                        />
                    </div>
                </div>
            </div>
            {/* Content Div */}
            <div className="content grid grid-cols-1 gap-2">
                <div className="grid grid-cols-1">
                    <div className="first-div w-full">
                        <h3 className='lg:text-2xl md:text-2xl text-[15px] font-semibold text-nowrap flex items-center gap-1'>{place?.title} <span className='text-white font-semibold px-2 py-1.5 bg-red-600 rounded-2xl text-xs md:text-sm'>{place?.category}</span></h3>
                        <div className="flex items-center gap-2">
                            <span className='text-sm md:text-xl px-4 flex items-center gap-1 py-1 bg-gray-100 w-fit rounded-full text-blue-600 font-semibold '><FaLocationDot className='text-red-500' />{place?.location}</span>

                            <span className='text-green-600 font-semibold flex items-center md:text-2xl'><FaRupeeSign className='text-red-500' />{place?.price} <span className=''>
                                {
                                    categories?.includes(place?.category) ? "/Month" : "/Night"
                                }
                            </span></span>
                        </div>
                        <p className='text-sm font-medium mt-1 text-zinc-600 '>{place?.description}</p>
                    </div>

                    {/* <div className="sec-div w-full flex items-center justify-between xl:w-[40%] xl:flex xl:gap-3 xl:justify-start">
                        <div className="flex gap-1 w-full justify-between mt-3">
                            <button onClick={()=>setOpen(true)} className="px-3 cursor-pointer flex items-center gap-1 xl:py-2 py-1 bg-green-600 text-white font-semibold rounded-md ">
                                Book Place <FaLocationDot className='text-red-500 font-semibold' />
                            </button>
                            <button onClick={chatHandler} className='px-3 flex items-center gap-1 xl:py-2 py-1 bg-orange-500 text-white font-semibold rounded-md  cursor-pointer'>Chat With Owner <FaTelegram className='' /></button>
                        </div>
                    </div> */}
                          {/* {
                        open &&<BookingModal place={place} open={open} setOpen={setOpen} />
                        } */}
                </div>
            </div>
        </div>
    )
}

export default PlaceDetails
