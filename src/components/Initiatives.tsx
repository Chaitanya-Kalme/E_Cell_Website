'use client';

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderOne } from "./ui/loader";
import Image from "next/image";

type InitiativesProps = {
  onRegisterClick: (initiative: any) => void;
};

type event={
  id: string,
  eventName: string,
  eventFees: number,
  isRegistrationOpen: boolean,
  minSize: number,
  maxSize: number,
  eventDateAndTime: Date,
  description: string,
  eventImage: string
  webPageLink: string
};


const initiatives = [
    {
       id: "5c3011cc-9737-41de-aa54-cfefaeb502cf",
    eventName: "TedX",
    eventDateAndTime: "2025-09-30T04:30:00.000Z",
    eventFees: 67,
    minSize: 1,
    maxSize: 3,
    isRegistrationOpen: false,
    createdAt: "2025-09-29T06:58:07.769Z",
    updatedAt: "2025-10-12T17:24:26.072Z",
    eventImage: "https://res.cloudinary.com/dykbuvd20/image/upload/v1759122895/Event_Images/exbftnbus4mcvxw2mzbj.png",
    description: "This is the tedx event of iit ropar",
    webPageLink: "localhost:3000/contact"
    },
   
    {
       id: "5c3011cc-9737-41de-aa54-cfefaeb502cf",
    eventName: "Startup bootcomp",
    eventDateAndTime: "2025-09-30T04:30:00.000Z",
    eventFees: 67,
    minSize: 1,
    maxSize: 3,
    isRegistrationOpen: false,
    createdAt: "2025-09-29T06:58:07.769Z",
    updatedAt: "2025-10-12T17:24:26.072Z",
    eventImage: "https://res.cloudinary.com/dykbuvd20/image/upload/v1759122895/Event_Images/exbftnbus4mcvxw2mzbj.png",
    description: "This is the tedx event of iit ropar",
    webPageLink: "localhost:3000/contact"
    }
  ];

const Initiatives = ({ onRegisterClick }: InitiativesProps) => {
  
  const [loading,setLoading] = useState(true)
  const [eventList,setEventList]= useState<event[]>([])
  


  useEffect(() =>{
      setLoading(true)
      async function getEventList(){
        await axios.get("/api/events/getAllEventList")
        .then((response) =>{
          setEventList(response.data.data)
        })
        .catch((error) =>{
          toast.error(error.response.data.message)
        })
        .finally(() =>{
          setLoading(false)
        })
      }
      getEventList()
  },[])

  if(loading){
      return(
        <div className="text-center justify-center mt-32">
          <LoaderOne/>
        </div>
      )
    }
    else if(eventList.length===0){
      return(
        <div className="text-center mt-2 italic text-xl">
          No Event Present 
        </div>
      )
    }

  return (
    <div className="py-10 text-center mt-20" style={{ backgroundColor: "#F5F5F5" }}>
      <h1
        className="text-4xl md:text-5xl font-bold mb-0"
        style={{ color: "#1f2937" }}
      >
        OUR INITIATIVES
      </h1>
      <p
        className="text-lg md:text-xl max-w-2xl mx-auto my-6 dark:text-white"
        style={{ color: "#374151" }}
      >
        We at E-Cell, IIT believe that entrepreneurship is the key to India's
        development. To fulfill this vision, we have conceptualized &
        successfully implemented various initiatives to help students, young
        entrepreneurs & professionals in their entrepreneurial journey.
      </p>

      <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
        {eventList.map((item, idx) => (
          <div
            key={idx}
            className="text-white rounded-3xl max-w-sm transition-transform hover:scale-105 relative overflow-hidden"
            style={{
              backgroundColor: "#1f2937",
              padding: "32px 24px",
              minHeight: 340,
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-3xl" style={{
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
              backgroundSize: "300% 300%",
              padding: "2px",
              zIndex: 0,
              animation: "border-spin 3s linear infinite"
            }}>
              <div className="w-full h-full rounded-3xl" style={{ backgroundColor: "#1f2937" }}></div>
            </div>

            {/* Content wrapper with higher z-index */}
            <div style={{ 
              zIndex: 1, 
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100%"
            }}>
              <img src={item.eventImage} alt={item.eventName} width={80} height={80}/>
              <h2
                className="font-bold text-xl md:text-2xl mb-3"
                style={{ color: "#ffffff" }}
              >
                {item.eventName}
              </h2>
              <p className="text-base mb-auto">{item.description}</p>
              
              {/* Register button with new colors and animations */}
              <button
                onClick={() => item.isRegistrationOpen?onRegisterClick(item):toast.error("Registration Closed")}
                className={`mt-6 text-white rounded-full px-7 py-2 font-bold text-base flex items-center gap-2 shadow cursor-pointer transition-transform duration-200 ${
                  item.isRegistrationOpen ? 'hover:scale-105 bg-blue-600 hover:bg-blue-700' : 'opacity-70 cursor-not-allowed bg-gray-600'
                }`}
                style={{ border: "none" }}
              >
                Register <span style={{ fontSize: 18 }}>→</span>
              </button>
              {!item.isRegistrationOpen && (
                <p className="text-xs mt-2 opacity-80">(Closed)</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes border-spin {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 300% center;
          }
        }
      `}</style>
    </div>
  );
};

export default Initiatives;