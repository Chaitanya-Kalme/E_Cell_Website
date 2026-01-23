"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Building2, Users, MapPin, Briefcase, Star, Award } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

export function ExpandableStartupExpoCards({ startups }) {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
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

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="relative z-10">
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-100 p-4">
            <motion.button
              key={`button-${active.startupName}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-6 right-6 lg:hidden items-center justify-center bg-gray-800/90 backdrop-blur-sm rounded-full h-8 w-8 z-10"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.startupName}-${id}`}
              ref={ref}
              className="w-full max-w-[800px] max-h-[90vh] flex flex-col bg-gradient-to-br from-[#0a1628] to-[#1e3a5f] backdrop-blur-sm border border-amber-400/30 rounded-3xl overflow-hidden m-4 shadow-2xl shadow-amber-500/20"
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <motion.div
                layoutId={`image-${active.startupName}-${id}`}
                className="flex-none relative"
              >
                <Image
                  width={800}
                  height={280}
                  src={active.startupImage}
                  alt={active.startupName}
                  loading="lazy"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-amber-500/90 backdrop-blur-sm px-4 py-2 rounded-full text-white font-bold text-sm flex items-center gap-2">
                  <Award size={18} />
                  Exhibitor
                </div>
              </motion.div>

              <div className="p-6 flex-1 flex flex-col min-h-0">
                <div className="text-center mb-4">
                  <motion.h3
                    layoutId={`title-${active.startupName}-${id}`}
                    className="font-bold text-white text-3xl mb-2 drop-shadow-[0_0_15px_rgba(251,191,36,0.9)]"
                  >
                    {active.startupName}
                  </motion.h3>
                  <p className="text-amber-300 text-lg font-semibold">
                    {active.industry}
                  </p>
                </div>

                <div className="text-center mb-4 px-4">
                  {active.website && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(active.website, '_blank');
                      }}
                      className="inline-block px-8 py-3 text-sm rounded-full font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/40 transition-all duration-200"
                    >
                      Visit Website
                    </motion.button>
                  )}
                </div>

                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-auto flex-1 min-h-0 text-blue-200 space-y-4"
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 bg-black/30 p-3 rounded-lg">
                        <Building2
                          size={18}
                          className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                        />
                        <div>
                          <div className="text-xs text-gray-400">Founded</div>
                          <div className="text-sm text-white font-semibold">
                            {active.foundedYear}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-black/30 p-3 rounded-lg">
                        <Users
                          size={18}
                          className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                        />
                        <div>
                          <div className="text-xs text-gray-400">Team Size</div>
                          <div className="text-sm text-white font-semibold">
                            {active.teamSize}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-black/30 p-3 rounded-lg col-span-2">
                        <MapPin
                          size={18}
                          className="text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                        />
                        <div>
                          <div className="text-xs text-gray-400">Location</div>
                          <div className="text-sm text-white font-semibold">
                            {active.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="text-amber-400" size={20} />
                        <h4 className="font-semibold text-amber-300 text-lg">
                          What We Do
                        </h4>
                      </div>
                      <p className="text-blue-100 text-sm leading-relaxed">
                        {active.description}
                      </p>
                    </div>

                    {active.achievements && active.achievements.length > 0 && (
                      <div className="pt-2">
                        <h4 className="font-semibold text-cyan-300 text-lg mb-3 flex items-center gap-2">
                          <Award className="text-cyan-400" size={20} />
                          Achievements
                        </h4>
                        <ul className="space-y-2">
                          {active.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className="text-blue-100 text-sm flex items-start gap-2"
                            >
                              <span className="text-amber-400 mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {active.contact && (
                      <div className="bg-black/30 p-4 rounded-lg">
                        <h4 className="font-semibold text-cyan-300 text-sm mb-2">
                          Contact Information
                        </h4>
                        <p className="text-blue-100 text-sm">{active.contact}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 max-w-none items-stretch">
        {startups.map((startup, index) => (
          <motion.div
            layoutId={`card-${startup.startupName}-${id}`}
            key={`card-${startup.startupName}-${id}`}
            onClick={() => setActive(startup)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="group cursor-pointer w-full h-full"
          >
            <div className="relative overflow-hidden rounded-2xl backdrop-blur-lg bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-2 border-amber-400/40 p-0 hover:border-amber-400/70 transition-all duration-300 hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] hover:scale-105 flex flex-col h-full">
              <motion.div
                layoutId={`image-${startup.startupName}-${id}`}
                className="flex-none relative"
              >
                <Image
                  width={400}
                  height={200}
                  src={startup.startupImage}
                  alt={startup.startupName}
                  loading="lazy"
                  className="w-full h-40 rounded-t-xl object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-amber-500 px-3 py-1 rounded-full text-white text-xs font-bold">
                  Startup
                </div>
              </motion.div>

              <div className="flex-1 flex flex-col items-center text-center justify-between p-4 min-h-0">
                <div className="w-full">
                  <motion.h3
                    layoutId={`title-${startup.startupName}-${id}`}
                    className="font-bold text-amber-100 text-lg mb-1 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                  >
                    {startup.startupName}
                  </motion.h3>
                  <p className="text-amber-300 text-xs font-semibold mb-3">
                    {startup.industry}
                  </p>

                  <div className="flex items-center justify-center gap-3 text-xs mb-3">
                    <div className="flex items-center gap-1 text-blue-200">
                      <MapPin size={14} className="text-green-400" />
                      {startup.location}
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="grid grid-cols-2 gap-2 w-full mb-3 text-xs">
                    <div className="text-center p-2 rounded bg-black/40 border border-amber-400/30">
                      <div className="text-amber-300 font-semibold">
                        {startup.foundedYear}
                      </div>
                      <div className="text-cyan-100 text-xs">Founded</div>
                    </div>
                    <div className="text-center p-2 rounded bg-black/40 border border-blue-400/30">
                      <div className="text-blue-300 font-semibold">
                        {startup.teamSize}
                      </div>
                      <div className="text-cyan-100 text-xs">Team</div>
                    </div>
                  </div>
                  <p className="text-amber-200 text-xs drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    Click to learn more
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const StartupExpoCard = ({ startups }) => {
  return <ExpandableStartupExpoCards startups={startups} />;
};

export default StartupExpoCard;