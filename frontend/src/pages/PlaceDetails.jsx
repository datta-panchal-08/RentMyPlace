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

const PlaceDetails = () => {
    document.title = "Details"
    const { id } = useParams();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const categories = ["Shop", "Shop", "Pg", "Flat"];

    const chatHandler = () => {
        toast.warning("Coming soon!");
    }

    useEffect(() => {
        if (place?.category) {
            const isMonthlyCategory = categories.includes(place.category);

            if (isMonthlyCategory) {
                const currentMonth = new Date();
                const nextMonth = new Date();
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                setStartDate(currentMonth);
                setEndDate(nextMonth);
            } else {
                const today = new Date();
                const tomorrow = new Date();
                tomorrow.setDate(today.getDate() + 1);
                setStartDate(today);
                setEndDate(tomorrow);
            }
        }
    }, [place]);

    const bookingHandler = () =>{
        
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
        if (id) console.log("PlaceID : ", id);
        getPlaceById();
    }, [id]);

    return loading ? <Spinner /> : (
        <div className="flex flex-col gap-2 mx-auto px-2 lg:px-5 py-4">
            {/* Images Section */}
            <div className="flex flex-col w-full lg:flex-row gap-2 lg:gap-7">

                <div className="img-1 w-full lg:w-[50%] h-[30vh] lg:h-[50vh]">
                    <img
                        className='w-full h-full object-cover rounded-2xl'
                        src={place?.image1}
                        alt={place?.title}
                    />
                </div>

                <div className="img-2-3 flex gap-2 lg:gap-5 w-full lg:w-[50%] h-[30vh] lg:h-[50vh]">
                    <div className="w-[50%] h-full overflow-hidden">
                        <img
                            className='w-full h-full object-cover rounded-2xl'
                            src={place?.image2}
                            alt={place?.title}
                        />
                    </div>
                    <div className="w-[50%] h-full overflow-hidden">
                        <img
                            className='w-full h-full object-cover rounded-2xl'
                            src={place?.image3}
                            alt={place?.title}
                        />
                    </div>
                </div>
            </div>
            {/* Content Div */}
            <div className="content w-full flex flex-col gap-2">
                <div className="flex flex-col w-full gap-2 md:flex-row lg:justify-between lg:items-center">
                    <div className="first-div w-full h-[50%] lg:w-[50%] flex flex-col gap-2">
                        <h3 className='lg:text-4xl md:text-4xl text-[1.1rem] font-semibold text-nowrap flex items-center gap-1'>{place?.title} <span className='text-white font-semibold px-2 py-1.5 bg-red-600 rounded-2xl text-xs md:text-sm'>{place?.category}</span></h3>
                        <div className="flex items-center gap-2">
                            <span className='text-sm md:text-2xl px-4 flex items-center gap-1 py-1 bg-gray-100 w-fit rounded-full text-blue-600 font-semibold '><FaLocationDot className='text-red-500' />{place?.location}</span>

                            <span className='text-green-600 font-semibold flex items-center md:text-2xl'><FaRupeeSign className='text-red-500' />{place?.price} <span className=''>
                                {
                                    categories?.includes(place?.category) ? "/Month" : "/Night"
                                }
                            </span></span>
                        </div>
                        <p className='text-sm font-medium text-zinc-400 md:text-xl'>{place?.description}</p>
                    </div>

                    <div className="sec-div w-full h-[50%] lg:w-[50%] flex flex-col gap-2 ">
                        <h3 className='text-xl font-semibold'>Pick Dates</h3>
                        <div className="flex flex-col lg:flex-row gap-2">

                            <div className="first bg-[#216BA5] py-2 text-white font-semibold  px-2 rounded-md w-full lg:w-[50%]">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat={categories?.includes(place?.category) ? "MM/yyyy" : "dd/MM/yyyy"}
                                    showMonthYearPicker={categories?.includes(place?.category)}
                                    showFullMonthYearPicker={categories?.includes(place?.category)}
                                    popperPlacement="bottom-start"
                                    className="text-white font-semibold px-2 outline-none py-1 rounded-md w-full"
                                    calendarClassName="rounded-md shadow-lg"
                                />

                            </div>
                            <div className="sec bg-[#216BA5] py-2 text-white font-semibold  px-2 rounded-md w-full lg:w-[50%]">
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    dateFormat={categories?.includes(place?.category) ? "MM/yyyy" : "dd/MM/yyyy"}
                                    showMonthYearPicker={categories?.includes(place?.category)}
                                    showFullMonthYearPicker={categories?.includes(place?.category)}
                                    popperPlacement="bottom-start"
                                    className="text-white font-semibold px-2 outline-none py-1 rounded-md w-full"
                                    calendarClassName="rounded-md shadow-lg"
                                />

                            </div>
                        </div>
                        <div className="flex gap-1 w-full justify-between mt-3">
                            <button onClick={bookingHandler} className="px-3 cursor-pointer flex items-center gap-1 py-1 bg-green-600 text-white font-semibold rounded-md ">
                                Book Place <FaLocationDot className='text-red-500 font-semibold' />
                            </button>
                            <button onClick={chatHandler} className='px-3 flex items-center gap-1 py-1 bg-orange-500 text-white font-semibold rounded-md  cursor-pointer'>Chat With Owner <FaTelegram className='' /></button>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default PlaceDetails