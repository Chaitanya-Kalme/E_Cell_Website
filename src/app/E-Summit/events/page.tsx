
"use client";
import { motion, useScroll, useTransform, useViewportScroll } from "framer-motion";
import StartupExpoCard from "@/components/E-Summit/StartupExpoCard";
import EventCard from "@/components/E-Summit/EventCard";
import StartupExpoForm from "@/components/E-Summit/StartupExpoForm";
import { startupExpoData, allEvents } from "@/context/E-Summit/dataObjects";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { useEffect, useState } from "react";
import { Rocket, Calendar } from "lucide-react";

export default function ESummitPage() {
  const [showStartupExpoForm, setShowStartupExpoForm] = useState(false);

  const { scrollY } = useScroll();
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
    <div className="min-h-screen bg-[#0a0e27]">

      {/* Background Image */}
      <motion.div
        style={{ scale }}
        className="fixed inset-0 bg-[url('/IIT_Ropar_Main_Gate.png')] bg-center bg-no-repeat bg-cover pointer-events-none z-0"
      />

      {/* Overlay to improve text readability */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none z-10" />


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
              <Calendar className="text-blue-900" size={40} />
              <h2 className="text-4xl text-blue-900 md:text-5xl font-bold pb-2 bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Major Events
              </h2>
            </div>
            <p className="text-blue-600 text-lg max-w-2xl mx-auto">
              Explore our diverse range of competitions, workshops, and networking opportunities
            </p>
            <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </motion.div>

          {/* Events Grid */}
          <EventCard events={allEvents} />
        </div>
      </section>

      {/* --- STARTUP EXPO SECTION --- */}
      <section className="relative py-20 px-4 md:px-8 lg:px-12">
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