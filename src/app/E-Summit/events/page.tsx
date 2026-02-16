
"use client";
import { motion } from "framer-motion";
import StartupExpoCard from "@/components/E-Summit/StartupExpoCard";
import EventCard from "@/components/E-Summit/EventCard";
import StartupExpoForm from "@/components/E-Summit/StartupExpoForm";
import { startupExpoData, allEvents } from "@/context/E-Summit/dataObjects";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { useState } from "react";
import { Rocket, Calendar } from "lucide-react";

export default function ESummitPage() {
  const [showStartupExpoForm, setShowStartupExpoForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      {/* --- TOP SECTION (Hero with Clouds) --- */}
      <div className="relative w-full overflow-hidden sky-header-container">
        {/* Layer 2: Animated Curly Clouds */}
        <div className="absolute inset-0 h-[300px] pointer-events-none z-10">
          <div className="cloud-curly cloud-slow top-[10%] left-[-5%] scale-125" />
          <div className="cloud-curly cloud-med top-[30%] left-[20%] opacity-80" />
          <div className="cloud-curly cloud-fast top-[15%] left-[60%] scale-75 opacity-50" />
          <div className="cloud-curly cloud-med top-[50%] left-[45%] scale-110" />
        </div>

        {/* Layer 3: Content (Logo) */}
        <div className="relative z-20 pb-10 flex flex-col items-center pt-5">
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-blue-800 italic">
              E-Summit'26
            </h1>
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

        {/* Layer 4: Fade transition */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0a0e27] to-transparent z-30" />
      </div>

      {/* --- EVENTS SECTION --- */}
      <section className="relative py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="text-blue-400" size={40} />
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Major Events
              </h2>
            </div>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Explore our diverse range of competitions, workshops, and networking opportunities
            </p>
            <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </motion.div>

          {/* Events Grid */}
          <EventCard events={allEvents} />
        </div>
      </section>

      {/* --- STARTUP EXPO SECTION --- */}
      <section className="relative py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-[#0a0e27] via-[#1a1f3f] to-[#0a0e27]">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Rocket className="text-orange-400" size={40} />
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                Startup Expo
              </h2>
            </div>
            <p className="text-orange-200 text-lg max-w-2xl mx-auto mb-6">
              Meet innovative startups and explore groundbreaking products
            </p>
            <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-8" />

            {/* Register Your Startup Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowStartupExpoForm(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold rounded-full shadow-lg shadow-orange-500/50 transition-all duration-200"
            >
              <Rocket size={20} />
              Register Your Startup for Expo
            </motion.button>
          </motion.div>

          {/* Startup Cards Grid */}
          <StartupExpoCard startups={startupExpoData} />
        </div>
      </section>

  

      {/* Startup Expo Form Modal */}
      {showStartupExpoForm && (
        <StartupExpoForm onClose={() => setShowStartupExpoForm(false)} />
      )}

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}