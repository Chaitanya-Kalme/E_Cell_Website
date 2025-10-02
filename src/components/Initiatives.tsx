

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
      _id: "tedx_2025_fall", // Example unique ID
      title: "TEDX",
      description:
        "TEDxIITROPAR is a part of a larger TEDx network, meaning we’re an independently organized event licensed by TED. TEDx is a program of local, self-organized events that bring people together to share a TED-like experience.",
      button: "register",
      url: "#", // URL is no longer needed for the register button
    },
   
    {
      _id: "startup_bootcamp_2025",
      title: "Startup Bootcamp",
      description:
        "An intensive 3-day workshop for aspiring entrepreneurs to learn the fundamentals of building a successful startup, from idea validation to pitching investors.",
      button: "register",
      url: "#",
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
    <div className="py-10 text-center mt-20">
      <h1
        className="text-4xl md:text-5xl font-bold mb-0"
        style={{ color: "#6f72bfff" }}
      >
        OUR INITIATIVES
      </h1>
      <p
        className="text-lg md:text-xl max-w-2xl mx-auto my-6"
        style={{ color: "#222222ff" }}
      >
        We at E-Cell, IIT believe that entrepreneurship is the key to India’s
        development. To fulfill this vision, we have conceptualized &
        successfully implemented various initiatives to help students, young
        entrepreneurs & professionals in their entrepreneurial journey.
      </p>

      <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
        {eventList.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#9b6fbfff] text-white rounded-3xl border-2 max-w-sm"
            style={{
              borderColor: "#bfbc6fff",
              borderWidth: "10px",
              borderStyle: "solid",
              padding: "32px 24px",
              minHeight: 340,
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={item.eventImage} alt={item.eventName} width={80} height={80}/>
            <h2
              className="font-bold text-xl md:text-2xl mb-3"
              style={{ color: "#6fa8bfff" }}
            >
              {item.eventName}
            </h2>
            <p className="text-base mb-auto">{item.description}</p>
            
            {/* --- THIS IS THE KEY CHANGE --- */}
            {/* This is now a button that triggers the onRegisterClick function */}
            <button
              onClick={() => item.isRegistrationOpen?onRegisterClick(item):toast.error("Registration Closed")}
              className="mt-6 bg-[#6fa8bfff] text-white rounded-full px-7 py-2 font-bold text-base flex items-center gap-2 shadow cursor-pointer transition-transform duration-200 hover:scale-105"
              style={{ border: "none" }}
            >
              Register <span style={{ fontSize: 18 }}>→</span>
            </button>
            {/* --- END OF CHANGE --- */}

          </div>
        ))}
      </div>
    </div>
  );
};

export default Initiatives;
