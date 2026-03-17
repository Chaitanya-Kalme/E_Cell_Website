"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import ContactCard from "@/components/E-Summit/contactCards";
import { dataContext } from "@/context/E-Summit/dataContext";
import { Crown, Shield } from "lucide-react";
import Hyperspeed from "@/components/Hyperspeed";

const OurTeam = () => {
  const { coreTeam, teamMembers } = useContext(dataContext);

  return (
    <div className="relative min-h-screen bg-[#0a0e27]">

      {/* ── FULLSCREEN HYPERSPEED BACKGROUND ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <Hyperspeed
          effectOptions={{
            distortion: "turbulentDistortion",
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 3,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [12, 80],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 526344,
              islandColor: 657930,
              background: 0,
              shoulderLines: 1250072,
              brokenLines: 1250072,
              leftCars: [14177983, 6770850, 12732332],
              rightCars: [242627, 941733, 3294549],
              sticks: 242627,
            },
          }}
        />
      </div>

      {/* ── Dark overlay so text stays readable over the animation ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(10,14,39,0.55) 0%, rgba(10,14,39,0.45) 50%, rgba(10,14,39,0.65) 100%)",
        }}
      />

      {/* ── ALL PAGE CONTENT sits above background + overlay ── */}
      <div className="relative" style={{ zIndex: 5 }}>

        {/* ── 1. HEADING + INTRO TEXT ── */}
        <section className="relative py-10 px-4 md:px-8 lg:px-12">
          <div className=" mx-auto text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Crown className="text-blue-400" size={40} />
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Our Team
                </h1>
              </div>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6" />
              <p className="text-blue-200 text-lg mb-4">
                Meet the Team Behind E-Summit IIT Ropar 2026
              </p>
              <p className="text-base text-blue-200/80 leading-relaxed mb-4">
                E-Summit IIT Ropar 2026 is driven by a dynamic team of innovators, leaders, and changemakers united by a shared vision, to ignite entrepreneurial spirit and foster bold ideas.
              </p>
              <p className="text-base text-blue-200/80 leading-relaxed mb-4">
                Our team of passionate students, creative thinkers, and dedicated organizers works tirelessly to bring together founders, investors, and aspiring entrepreneurs on one platform. Committed to excellence, they create meaningful experiences and opportunities that turn ideas into action.
              </p>
              <p className="text-base text-blue-200/80 leading-relaxed">
                Together, we are building not just an event, but a thriving entrepreneurial ecosystem.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 2. OC SECTION: President + VP + Secretary ── */}
        <section className="relative py-5 px-4 md:px-8 lg:px-12">
          <div className="max-w-[900px] mx-auto">

            {/* OC Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Organising Committee
                </h2>
              </div>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            </motion.div>

            {/* All 3 OCs in a single row */}
            <div className="flex flex-wrap justify-center gap-6">
              {coreTeam.slice(0, 3).map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ContactCard member={member} isOC={true} />
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ── 3. HEADS / CORE MEMBERS ── */}
        <section className="relative py-5 px-4 md:px-8 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-items-center">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <ContactCard member={member} isOC={false} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Bottom padding so last cards don't touch viewport edge ── */}
        <div className="h-20" />

      </div>{/* end z-index content wrapper */}

      {/* ── Decorative ambient blobs (above overlay, below content) ── */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

    </div>
  );
};

export default OurTeam;