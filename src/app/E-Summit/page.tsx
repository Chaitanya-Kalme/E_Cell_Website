"use client";
import { useEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { galleryImages1 } from "@/context/galleryImages";
import { SpeakersListCards } from "@/components/E-Summit/speakerCard";
import { pastSpeakers } from "@/context/E-Summit/speakersData"

import StartupExpoCard from '@/components/E-Summit/StartupExpoCard';
import AccommodationForm from '@/components/E-Summit/AccommodationForm';
import { startupExpoData } from '@/context/E-Summit/dataObjects';

export default function ESummitPage() {
  const { scrollY } = useViewportScroll();
  const [scrollRange, setScrollRange] = useState(1); // avoid division by zero

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

  // Map scroll progress 0 → 1 to scale 1 → 1.15
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.15]);

  return (
    <div
      className="relative min-h-screen bg-[#6BB0E7] overflow-x-hidden"
      style={{ minHeight: "200vh" }} // enough height for scrolling
    >
      {/* Background Image */}
      <motion.div
        style={{ scale }}
        className="fixed inset-0 bg-[url('/IIT_Ropar_Main_Gate.png')] bg-center bg-no-repeat bg-cover pointer-events-none z-0"
      />

      {/* Overlay to improve text readability */}
      <div className="fixed inset-0 bg-black/25 pointer-events-none z-10" />

      <motion.div
        className="absolute top-0 left-0 w-full pointer-events-none z-20"
        style={{
          // Use window.innerWidth to determine mobile or desktop
          height: window.innerWidth < 768 ? 150 : 300, // 150px for mobile, 300px for desktop
          opacity: useTransform(
            scrollY,
            window.innerWidth < 768 ? [0, 150] : [0, 300],
            [1, 0]
          ),
          y: useTransform(
            scrollY,
            window.innerWidth < 768 ? [0, 150] : [0, 300],
            [0, -30]
          ),
        }}
      >
        <div className="cloud-curly cloud-slow top-[10%] left-[-5%] scale-125" />
        <div className="cloud-curly cloud-med top-[30%] left-[20%] opacity-80" />
        <div className="cloud-curly cloud-fast top-[15%] left-[60%] scale-75 opacity-50" />
        {/* <div className="cloud-curly cloud-med top-[50%] left-[45%] scale-110" /> */}
      </motion.div>




      {/* Content */}
      <div className="relative z-30 px-6 pt-20 pb-40 max-w-7xl mx-auto text-center text-white">
        {/* Hero Section */}
        <h1
          className="
    text-5xl md:text-7xl font-bold italic mb-10 
    bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500
    bg-clip-text text-transparent
    drop-shadow-[0_0_15px_rgba(255,234,0,0.8)]
  "
        >
          E-Summit'26
        </h1>

        <p className="md:text-sm font-black tracking-[0.5em] uppercase mb-20 drop-shadow-md">
          <EncryptedText
            text="Ideas • Innovation • Growth"
            encryptedClassName="text-white"
            revealedClassName="text-white text-sm"
            revealDelayMs={70}
          />
        </p>

        {/* About Section */}
        <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 
                   bg-clip-text text-transparent 
                   drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            About E-Summit
          </span>
        </h2>

        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full mb-12" />

        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center gap-10 text-gray-200">
          <div className="flex-shrink-0">
            <img
              src="/spiral.jpg"
              alt="IIT Ropar Spiral"
              className="w-64 md:w-80 lg:w-96 rounded-2xl shadow-xl hover:scale-105 transition duration-500 ease-in-out"
            />
          </div>

          <p className="text-lg md:text-xl leading-relaxed text-left">
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

        <section className="mb-24 mt-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 
                   bg-clip-text text-transparent 
                   drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              Events 
            </span>
          </h2>
          <p className="text-center text-blue-200 mb-12 max-w-2xl mx-auto">
            Meet innovative startups and entrepreneurs from across the country
          </p>
          <StartupExpoCard startups={startupExpoData} />
        </section>



        <h2 className="text-4xl mt-5 md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Past Speakers
          </span>
        </h2>

        <SpeakersListCards
          items={pastSpeakers}
          direction="right"
          speed="slow"
        />


      </div>
    </div>
  );
}

