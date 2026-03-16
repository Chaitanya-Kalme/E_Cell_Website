"use client";
import { useEffect, useState } from "react";
import { motion, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { galleryImages1 } from "@/context/galleryImages";
import { SpeakersListCards } from "@/components/E-Summit/speakerCard";
import { pastSpeakers } from "@/context/E-Summit/speakersData"

import StartupExpoCard from '@/components/E-Summit/StartupExpoCard';
import AccommodationForm from '@/components/E-Summit/AccommodationForm';
import { allEvents, startupExpoData } from '@/context/E-Summit/dataObjects';
import { Calendar, MapPin, Users } from "lucide-react";
import EventCard from "@/components/E-Summit/EventCard";
import { useRouter } from "next/navigation";
import Antigravity from "@/components/Antigravity"
import ParticleBackground from "@/components/E-Summit/ParticleBackground"
import ProtonLoader from "@/components/E-Summit/ProtonLoader";
import ShinyText from '@/components/ShinyText';

import { Montserrat } from "next/font/google";

import { Playfair_Display } from 'next/font/google'
import HeroSectionBackground from "@/components/E-Summit/HeroSectionBackground"

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900']
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

import { IBM_Plex_Mono } from "next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

import { Viga } from "next/font/google";

const viga = Viga({
  subsets: ["latin"],
  weight: "400", // Viga only has one weight
});

export default function ESummitPage() {
  const { scrollY } = useScroll();
  const [scrollRange, setScrollRange] = useState(1); // avoid division by zero
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  const imageName = 'IIT_Ropar_Main_Gate.png';


  useEffect(() => {
    function updateScrollRange() {
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      setScrollRange(scrollHeight - innerHeight);
    }

    updateScrollRange();
    window.addEventListener("resize", updateScrollRange);
    return () => window.removeEventListener("resize", updateScrollRange);
  }, []);

  // Calculate scroll progress as 0 → 1 across the full scrollable height
  const scrollProgress = useTransform(scrollY, [0, scrollRange], [0, 1], {
    clamp: true,
  });

  // Map scroll progress 0 → 1 to scale 1 → 1.5
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.5]);

  const hoverCard = {
    initial: {
      scale: 1,
      y: 0,
    },
    hover: {
      scale: 1.08,
      y: -6,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 18,
      },
    },
  };

  const hoverIcon = {
    initial: { rotate: 0, scale: 1 },
    hover: {
      rotate: 8,
      scale: 1.15,
      transition: { duration: 0.3 },
    },
  };

  const hoverText = {
    initial: { opacity: 0.9 },
    hover: {
      opacity: 1,
      textShadow: "0 0 12px rgba(255,255,255,0.35)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* ── Full-screen loader — sits above everything, unmounts when done ── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "#010408",
            }}
          >
            <ProtonLoader onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION — background image + parallax scale, NO particles ── */}
      <div
        className="relative bg-black overflow-x-hidden"
        style={{ minHeight: "100vh" }}
      >

        {/* Parallax background image */}
        <motion.div
          className="absolute top-0 left-0 w-full h-screen bg-center bg-no-repeat bg-cover pointer-events-none z-5"
          style={{ backgroundImage: `url(${imageName})` }}
        /


        {/* Dark overlay */}
        <div className="absolute top-0 left-0 w-full h-screen bg-black/40 pointer-events-none z-10" />

        {/* Hero content */}
        <div className="relative z-30 px-6 pt-10 pb-40 max-w-7xl mx-auto text-center text-white">

          {/* Hero Section Logo */}
          <div className="flex justify-center mb-10">
            <img
              src="E-Summit Logo2.png"
              alt="E-Summit 2026"
              className="h-[150px] w-[450px] sm:w-[600px] sm:h-[200px]"
            />
          </div>

          <p className="md:text-sm font-black tracking-[0.5em] uppercase mb-20 drop-shadow-md">
            <EncryptedText
              text="Ideas • Innovation • Growth"
              encryptedClassName="text-white"
              revealedClassName="text-white text-sm"
              revealDelayMs={60}
              className={`${ibmPlexMono.className}`}
            />
          </p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 mt-2"
          >
            {[
              { icon: Calendar, text: "Dates: April 11-12, 2026", color: "orange" },
              { icon: MapPin, text: "Venue: IIT Ropar", color: "purple" },
              { icon: Users, text: "1000+ Participants", color: "blue" },
            ].map(({ icon: Icon, text, color }) => (
              <motion.div
                key={text}
                variants={hoverCard}
                initial="initial"
                whileHover="hover"
                className={`
                  group flex items-center space-x-3
                  bg-black/60 backdrop-blur-md
                  px-5 py-3 rounded-full cursor-default
                  border border-${color}-400/40
                  hover:bg-black/80
                  transition-colors duration-300
                  ${ibmPlexMono.className}
                `}
              >

                <motion.span
                  variants={hoverIcon}
                  className={`text-${color}-300`}
                >
                  <Icon size={24} />
                </motion.span>


                <motion.span
                  variants={hoverText}
                  className={`text-base md:text-lg font-semibold text-${color}-200`}
                >
                  {text}
                </motion.span>


                <span
                  className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
                    blur-xl bg-${color}-500/10 transition-opacity duration-300`}
                />
              </motion.div>
            ))}
          </motion.div>


        </div>
      </div>

      {/* ── LOWER SECTION — ParticleBackground starts here from About onwards ── */}
      <div className="relative bg-black overflow-x-hidden">
        {/* ParticleBackground scoped only to this lower section */}
        <ParticleBackground />
        <div className="relative z-30 px-6 py-16 max-w-7xl mx-auto text-center text-white">

          {/* About Section */}
          <h2 className={`${playfair.className} md:mt-10 font-extrabold mb-6 drop-shadow-lg`}>
            <span className="bg-gradient-to-r from-purple-100 to-blue-300 bg-clip-text text-transparent">
              <button className="relative inline-flex w-fit h-full overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 p-1">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

                <span className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3 text-3xl md:text-6xl font-medium text-white backdrop-blur-3xl">
                  About E-Summit 2026
                </span>

              </button>
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full mb-12" />

          <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center gap-10 text-gray-200">
            <div className="flex-shrink-0">
              <img
                src="spiral.jpg"
                alt="IIT Ropar Spiral"
                className="w-64 md:w-80 lg:w-96 rounded-2xl shadow-xl hover:scale-105 transition duration-500 ease-in-out"
              />
            </div>

            <p className={`${montserrat.className} text-lg md:text-xl leading-relaxed text-left`}>
              <span className="text-white font-semibold">E-Summit</span> is the
              <span className="text-purple-300 font-semibold">
                {" "}
                flagship annual entrepreneurial fest{" "}
              </span>
              organized by the{" "}
              <span className="text-white font-medium">Entrepreneurship Cell (E-Cell)</span> and{" "}
              <span className="text-white font-medium">TBIF IIT Ropar</span>, held in April.
              <br />
              <br />
              It fosters{" "}
              <span className="text-blue-300 font-semibold">innovation</span>,
              <span className="text-blue-300 font-semibold"> networking</span>, and{" "}
              <span className="text-blue-300 font-semibold">startup growth</span> through keynote sessions, panel discussions, the Startup Expo,
              Investors Arena, and interactive workshops — connecting students with industry leaders, founders, and investors.
            </p>
          </div>

          {/* Events Section */}
          <section className="mb-24 mt-10">
            <h2 className={`${playfair.className} md:mt-10 font-extrabold mb-6 drop-shadow-lg`}>
              <span className="bg-gradient-to-r from-purple-100 to-blue-300 bg-clip-text text-transparent">
                <button className="relative inline-flex w-fit h-full overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 p-1">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

                  <span className={`inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3 text-3xl md:text-6xl font-medium text-white backdrop-blur-3xl`}>
                    Events
                  </span>

                </button>
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full mb-3" />
            <p className={` ${viga.className} text-center text-blue-200 mb-12 max-w-2xl mx-auto`}>
              Meet innovative startups and entrepreneurs from across the country
            </p>
            <div className="text-center justify-center flex justify-items-center">
              <EventCard events={allEvents.slice(0, 3)} />
            </div>

            <button
              className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-0.5 font-semibold leading-6 mt-7 text-white inline-block"
              onClick={() => router.push("/E-Summit/events")}
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-5 rounded-full bg-zinc-950 p-2 px-4 py-2 ring-1 ring-white/10">
                <span>Explore More Events</span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </section>

          {/* Past Speakers Section */}
          <h2 className={`${playfair.className} md:mt-10 font-extrabold mb-6 drop-shadow-lg`}>
            <span className="bg-gradient-to-r from-purple-100 to-blue-300 bg-clip-text text-transparent">
              <button className="relative inline-flex w-fit h-full overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 p-1">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

                <span className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3 text-3xl md:text-6xl font-medium text-white backdrop-blur-3xl">
                  Past Speakers
                </span>

              </button>
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full mb-12" />
          <SpeakersListCards
            items={pastSpeakers}
            direction="right"
            speed="slow"
          />

        </div>
      </div>
    </>
  );
}