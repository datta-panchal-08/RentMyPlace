import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { post } from '../api/Endpoint';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ open, setOpen, place }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [methodType, setMethodType] = useState("");
  const [finalPrice, setfinalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const categories = ["Shop", "Pg", "Flat"];
  const navigate = useNavigate();


  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!startDate || !endDate) {
        toast.error("❌ Please fill all required fields");
        return;
      }
      const bookingData = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        finalPrice,
        methodType
      };

      const res = await post(`/booking/book/${place?._id}`, bookingData);
      if (res.status === 201) {
        toast.success("Jelll");
        setTimeout(() => {
          setOpen(false);
          navigate("/bookings");
        }, 1000);
      }
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      toast.error(errorMsg);
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!place?.category) return;

    const isMonthlyCategory = categories.includes(place.category);

    if (isMonthlyCategory) {
      const currentMonth = new Date();
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setStartDate(currentMonth);
      setEndDate(nextMonth);
      setMethodType("perMonth");
    } else {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      setStartDate(today);
      setEndDate(tomorrow);
      setMethodType("perDay");
    }
  }, [place]);

  useEffect(() => {
    if (!startDate || !endDate || !place?.price) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const isMonthlyCategory = categories.includes(place.category);

    if (isMonthlyCategory) {
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth()) +
        1;
      setfinalPrice(months * place.price);
    } else {
      const days =
        Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      setfinalPrice(days * place.price);
    }
  }, [startDate, endDate, place]);




  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      center
      classNames={{
        overlay: 'customOverlay',
        modal: 'customModal',
      }}
      styles={{
        modal: {
          padding: '1.5rem',
          borderRadius: '1rem',
          maxWidth: '550px',
          width: '90%',
          height: "500px"
        }
      }}
    >
      <h2 className="text-xl font-bold mb-4 text-center">🟢 Book: {place?.title}</h2>
      <div className="flex flex-col gap-3">
        <div className='flex flex-col gap-1'>
          <label className="text-sm font-medium">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="xl:w-[500px] w-full border p-2 rounded-md"
            placeholderText="Start Date"
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className="text-sm font-medium">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            className="xl:w-[500px] w-full border p-2 rounded-md"
            placeholderText="End Date"
          />
        </div>
        <div className="">
          <span className='text-sm xl:text-xl text-orange-600  font-semibold'>You Have To Pay :</span> <span className='xl:text-xl font-semibold text-red-500 '>₹{finalPrice}/{methodType === "perDay" ? "Night" : "Month"} </span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
        >
          {
            loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </Modal>
  );
};

export default BookingModal;
