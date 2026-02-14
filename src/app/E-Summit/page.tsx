"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import StartupExpoCard from "@/components/E-Summit/StartupExpoCard";
import AccommodationForm from "@/components/E-Summit/AccommodationForm";
import { startupExpoData } from "@/context/E-Summit/dataObjects";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { useRef } from "react";
import { AtomicImpactEffect } from "@/components/ui/google-gemini-effect";



export default function ESummitPage() {

  // const containerRef = useRef<HTMLDivElement>(null);
  // // 1. Capture scroll progress within this container

  // const { scrollYProgress } = useScroll({

  //   target: containerRef,

  //   offset: ["start start", "end end"],

  // });



  // 2. Create 5 distinct path lengths, each slightly delayed

  // This makes the "explosion" look more organic

  // const pathLength1 = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  // const pathLength2 = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  // const pathLength3 = useTransform(scrollYProgress, [0.15, 0.9], [0, 1]);

  // const pathLength4 = useTransform(scrollYProgress, [0.2, 0.95], [0, 1]);

  // const pathLength5 = useTransform(scrollYProgress, [0.25, 1], [0, 1]);



  // const pathLengths = [pathLength1, pathLength2, pathLength3, pathLength4, pathLength5];

  return (

    <div className="min-h-screen bg-[#1a1f3f]">

      {/* --- TOP SECTION (Image + Clouds) --- */}

      <div className="relative w-full  overflow-hidden sky-header-container">

        {/* Layer 2: Animated Curly Clouds (Confined to top area) */}

        <div className="absolute inset-0 h-[300px] pointer-events-none z-10">

          <div className="cloud-curly cloud-slow top-[10%] left-[-5%] scale-125" />

          <div className="cloud-curly cloud-med top-[30%] left-[20%] opacity-80" />

          <div className="cloud-curly cloud-fast top-[15%] left-[60%] scale-75 opacity-50" />

          <div className="cloud-curly cloud-med top-[50%] left-[45%] scale-110" />

        </div>

        {/* Layer 3: Content (Logo) - Just below Navbar */}

        <div className="relative z-20 pb-10 flex flex-col items-center pt-5">

          <motion.div

            initial={{ y: 5, opacity: 0 }}

            animate={{ y: 0, opacity: 1 }}

            transition={{ duration: 0.8 }}

            className="flex flex-col items-center"

          >
            <h1 className="text-5xl md:text-7xl font-bold text-blue-800 italic">E-Summit'26</h1>
            <p className="md:text-sm font-black text-black mt-10 tracking-[0.5em] uppercase text-center">
              <EncryptedText
                text="Ideas • Innovation • Growth"
                encryptedClassName="text-black"
                revealedClassName="text-black text-sm"
                revealDelayMs={70}
              />

            </p>
          </motion.div>

        </div>

        {/* Layer 4: Fade transition into the dark body content */}

        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0a0e27] to-transparent z-30" />

      </div>

      {/* <main className="relative h-screen bg-black">

        <AtomicImpactEffect />



        <div className="absolute bottom-20 text-center w-full z-50">

          <h1 className="text-4xl font-bold text-white uppercase tracking-widest">

            Subatomic Collision

          </h1>

          <p className="text-neutral-500">

            Automatic Proton Acceleration

          </p>

        </div>

      </main> */}





      {/* --- REST OF PAGE CONTENT --- */}

      <div className="relative z-40 px-4 text-center mt-16">

        {/* Darker text to contrast with the bright sky image */}



      </div>

    </div>

  );

}

