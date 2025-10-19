'use client';

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderOne } from "./ui/loader";
import Image from "next/image";

type InitiativesProps = {
  onRegisterClick: (initiative: any) => void;
};

type event = {
  id: string,
  eventName: string,
  eventFees: number,
  isRegistrationOpen: boolean,
  minSize: number,
  maxSize: number,
  eventDateAndTime: Date,
  description: string,
  eventImage: string,
  webPageLink: string,
  eventRuleBook: string
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

  const [loading, setLoading] = useState(true)
  const [eventList, setEventList] = useState<event[]>([])



  useEffect(() => {
    setLoading(true)
    async function getEventList() {
      await axios.get("/api/events/getAllEventList")
        .then((response) => {
          setEventList(response.data.data)
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    getEventList()
  }, [])

  if (loading) {
    return (
      <div className="text-center justify-center mt-32">
        <LoaderOne />
      </div>
    )
  }

  return (
    <div className="py-10 text-center mt-20">
      <h1
        className="text-4xl md:text-5xl font-bold mb-0 text-blue-700 dark:text-orange-200"
      >
        OUR INITIATIVES
      </h1>
      <p
        className="text-lg md:text-xl max-w-2xl mx-auto my-6 dark:text-white"
      >
        At E-Cell, IIT, we firmly believe that entrepreneurship holds the transformative power to shape India’s future. Guided by this conviction, we have envisioned and brought to life a series of impactful initiatives designed to inspire, equip, and support students, emerging entrepreneurs, and professionals as they navigate the dynamic landscape of innovation and enterprise.
      </p>

      <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
        {eventList.length > 0 ? (eventList.map((item, idx) => (
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
              <img src={item.eventImage} alt={item.eventName} width={80} height={80} />
              <h2
                className="font-bold text-xl md:text-2xl mb-3"
                style={{ color: "#ffffff" }}
              >
                {item.eventName}
              </h2>
              <p className="text-base">Event Date: {new Date(item.eventDateAndTime).toDateString()}</p>
              <p className="text-base">Event Date: {new Date(item.eventDateAndTime).toLocaleTimeString()}</p>
              <p className="text-base">Event Fees: {item.eventFees}</p>
              <p className="text-base">Participation: {item.maxSize === 1 ? "Individual" : "Team"}</p>
              {item.maxSize > 1 && (
                <div>
                  <p className="text-base">Team Minimum Size: {item.minSize}</p>
                  <p className="text-base">Team Maximum Size: {item.maxSize}</p>
                </div>
              )}
              {item.eventRuleBook && (
                <p className="text-base">
                  Event Rulebook:&nbsp;
                  <a
                    href={item.eventRuleBook}
                    rel="noopener noreferrer"
                    className="text-orange-200 underline"
                  >
                    View PDF
                  </a>
                </p>
              )}


              {/* Register button with new colors and animations */}
              <button
                onClick={() => item.isRegistrationOpen ? onRegisterClick(item) : toast.error("Registration Closed")}
                className={`mt-6 text-white rounded-full px-7 py-2 font-bold text-base flex items-center gap-2 shadow cursor-pointer transition-transform duration-200 ${item.isRegistrationOpen ? 'hover:scale-105 bg-blue-600 hover:bg-blue-700' : 'opacity-70 cursor-not-allowed bg-gray-600'
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
        ))) : (
          <div className="text-center text-3xl italic font-bold">Coming Soon...</div>
        )}
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