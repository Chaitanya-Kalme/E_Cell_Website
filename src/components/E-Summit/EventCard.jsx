"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Calendar, Clock, MapPin, Users, Trophy, Info, X } from "lucide-react";
import Image from "next/image";
import EventRegistrationForm from "./EventRegistrationForm";

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export function ExpandableEventCards({ events }) {
  const [active, setActive] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setShowRegistration(false);
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => {
    if (!showRegistration) {
      setActive(null);
    }
  });

  const handleRegisterClick = (e) => {
    e.stopPropagation();
    setShowRegistration(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
  };

  return (
    <div className="relative z-10">
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm h-full w-full z-[100]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" && !showRegistration ? (
          <div className="fixed inset-0 grid place-items-center z-[110] p-4 mt-26">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-6 right-6 lg:hidden items-center justify-center bg-gray-800/90 backdrop-blur-sm rounded-full h-10 w-10 z-10 hover:bg-gray-700 transition-colors"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[900px] max-h-[90vh] flex flex-col bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 backdrop-blur-sm border border-blue-400/30 rounded-3xl overflow-hidden m-4 shadow-2xl shadow-blue-500/20"
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Header with gradient */}
              <motion.div
                layoutId={`header-${active.id}-${id}`}
                className={`flex-none bg-gradient-to-r ${active.color} p-6 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl drop-shadow-lg">{active.icon}</span>
                      <div>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                          {active.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setActive(null)}
                      className="hidden lg:flex p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  <motion.h3
                    layoutId={`title-${active.id}-${id}`}
                    className="font-bold text-white text-3xl mb-2 drop-shadow-lg"
                  >
                    {active.title}
                  </motion.h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    {active.description}
                  </p>
                </div>
              </motion.div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col min-h-0 overflow-y-auto">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  {/* Event Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2 bg-blue-900/30 p-3 rounded-lg border border-blue-500/20">
                      <Calendar size={18} className="text-blue-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-400">Date</div>
                        <div className="text-sm text-white font-semibold">
                          {active.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-900/30 p-3 rounded-lg border border-purple-500/20">
                      <Clock size={18} className="text-purple-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-400">Time</div>
                        <div className="text-sm text-white font-semibold">
                          {active.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-green-900/30 p-3 rounded-lg border border-green-500/20 col-span-2 md:col-span-1">
                      <MapPin size={18} className="text-green-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-400">Venue</div>
                        <div className="text-sm text-white font-semibold">
                          {active.venue}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Team Size & Registration Fee */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="text-blue-400" size={20} />
                        <h4 className="font-semibold text-blue-300 text-sm">
                          Team Size
                        </h4>
                      </div>
                      <p className="text-white text-lg font-bold">
                        {active.teamSize.min === active.teamSize.max
                          ? `${active.teamSize.min} member${active.teamSize.min > 1 ? 's' : ''}`
                          : `${active.teamSize.min}-${active.teamSize.max} members`}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="text-green-400" size={20} />
                        <h4 className="font-semibold text-green-300 text-sm">
                          Registration
                        </h4>
                      </div>
                      <p className="text-white text-lg font-bold">
                        {active.registrationFee}
                      </p>
                    </div>
                  </div>

                  {/* Prizes */}
                  <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="text-amber-400" size={20} />
                      <h4 className="font-semibold text-amber-300 text-base">
                        Prizes & Rewards
                      </h4>
                    </div>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      {active.prizes}
                    </p>
                  </div>

                  {/* Highlights */}
                  {active.highlights && active.highlights.length > 0 && (
                    <div className="pt-2">
                      <h4 className="font-semibold text-cyan-300 text-base mb-3 flex items-center gap-2">
                        <Info className="text-cyan-400" size={20} />
                        Event Highlights
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {active.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="text-blue-100 text-sm flex items-start gap-2 bg-blue-900/20 p-2 rounded-lg border border-blue-500/20"
                          >
                            <span className="text-blue-400 mt-1">✓</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Registration Button */}
                  {active.isRegistrationOpen && (
                    <div className="pt-4">
                      <button
                        onClick={handleRegisterClick}
                        className={`w-full py-4 rounded-xl font-bold text-white text-lg
                                 bg-gradient-to-r ${active.color}
                                 hover:opacity-90 transition-all duration-200
                                 flex items-center justify-center gap-3 shadow-lg`}
                      >
                        <span>Register Now</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Registration Form Modal */}
      <AnimatePresence>
        {showRegistration && active && (
          <EventRegistrationForm
            event={active}
            isOpen={showRegistration}
            onClose={handleCloseRegistration}
          />
        )}
      </AnimatePresence>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 max-w-none items-stretch">
        {events.map((event, index) => (
          <motion.div
            layoutId={`card-${event.id}-${id}`}
            key={`card-${event.id}-${id}`}
            onClick={() => setActive(event)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="group cursor-pointer w-full h-full"
          >
            <div className="relative overflow-hidden rounded-2xl backdrop-blur-lg bg-gradient-to-br from-slate-800/40 to-slate-900/60 border-2 border-blue-400/40 p-0 hover:border-blue-400/70 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:scale-105 flex flex-col h-full">
              {/* Icon & Category Badge */}
              <motion.div
                layoutId={`header-${event.id}-${id}`}
                className={`flex-none bg-gradient-to-r ${event.color} p-4 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-4xl drop-shadow-lg mt-3">{event.icon}</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                    {event.category}
                  </span>
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 flex flex-col items-center text-center justify-between p-4 min-h-0">
                <div className="w-full">
                  <motion.h3
                    layoutId={`title-${event.id}-${id}`}
                    className="font-bold text-blue-100 text-lg mb-2 drop-shadow-lg line-clamp-2"
                  >
                    {event.title}
                  </motion.h3>
                  <p className="text-blue-200 text-xs mb-3 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Quick Info */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-center gap-2 text-xs text-blue-300">
                      <Calendar size={14} className="text-blue-400" />
                      {event.date}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-purple-300">
                      <Users size={14} className="text-purple-400" />
                      {event.teamSize.min === event.teamSize.max
                        ? `${event.teamSize.min} member${event.teamSize.min > 1 ? 's' : ''}`
                        : `${event.teamSize.min}-${event.teamSize.max} members`}
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  {/* Registration Fee Badge */}
                  <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-400/50 mb-3">
                    <span className="text-white font-bold text-sm">
                      {event.registrationFee}
                    </span>
                  </div>

                  <p className="text-blue-200 text-xs drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    Click to learn more
                  </p>
                </div>
              </div>

              {/* Registration Status Badge */}

              <div className={`absolute top-2 left-2 ${event.isRegistrationOpen? "bg-green-500/90" : "bg-red-500"} backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1`}>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                { event.isRegistrationOpen? "Open": "Closed"}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const EventCard = ({ events }) => {
  return <ExpandableEventCards events={events} />;
};

export default EventCard;