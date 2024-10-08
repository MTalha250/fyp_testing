import React, { useEffect } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { Axios } from "../../../config";
import requests from "../../../libs/request";
import useAuthStore from "../../../stores";
import { toast, ToastContainer } from "react-toastify";

const GigsOrder = ({ data, id }) => {
  const { authUser} = useAuthStore();
  const handleSubmitOrder = async (id) => {
    try {
      const data2 = {
        gigId: id,
        img: data.cover, // Assuming data.cover exists and is valid
        title: data.title,
        buyerId: authUser._id,
        sellerId: data.userId,
        price: data.price,
        payment_intent: "temporary", // Might need further handling based on payment logic
      };
  
      const res = await Axios.post(`${requests.orders}/${id}`, data2);
      if(res.status === 200) {
        toast.success( res.data)
      }
      console.log('res', res); // Optional: Log response for debugging
  
      return res; // Assuming you need the response data in the frontend
    } catch (err) {
      console.error("Error creating order:", err);
      // Handle error here and provide user feedback (e.g., alert message)
    }
  };
  
console.log("data", data);

  return (
    <>
    <ToastContainer
      position= "top-right"
      toastId= {1}
      autoClose= {1000}
    />
    <div className="w-full bg-white border p-4 flex flex-col gap-4 items-start justify-start rounded">
      <div className="flex items-center justify-between gap-2 w-full">
        <h2 className="text-gray-800 text-sm font-bold">{data?.shortTitle}</h2>
        <p className="text-base font-normal">$ {data?.price}</p>
      </div>
      <p className="text-sm font-medium text-darkColor">{data?.shortDesc}</p>
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex items-center justify-start gap-2 text-sm text-darkColor font-semibold">
          <AiOutlineClockCircle />
          <span>{data?.deliveryTime} Days Delivery</span>
        </div>
        <div className="flex items-center justify-start gap-2 text-sm text-darkColor font-semibold">
          <TfiReload />
          <span>{data?.revisionNumber} Revisions</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 items-start justify-start w-full">
        {data.features.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-start gap-2 text-sm text-darkColor/70 font-semibold"
          >
            <BsCheckLg className="text-primary" />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <Link to={`/pay/${id}`} className="w-full">
        <button className="w-full h-10 rounded bg-primary/95 text-white hover:bg-primary outline-none">
          Continue
        </button>
      </Link>
    </div>
    </>
  );
};

export default GigsOrder;
