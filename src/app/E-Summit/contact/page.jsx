"use client";
import React from "react";
import FeedbackForm from "@/components/E-Summit/FeedbackForm";
import { motion } from "framer-motion";
import Image from "next/image";

const contact = () => {

  return (
    <main className="relative min-h-screen bg-[#0a0e27]">
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
      <div className="relative z-10">
        <div className="container mx-auto py-8 min-h-screen pt-24 px-4">
          {/* Two Column Layout */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)] py-12">
            
            {/* Left Side - Logo and Theme */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <div className="relative">
                <Image
                  src="/E-Summit Logo.png"
                  alt="E-Summit Logo"
                  // fill
                  className="object-contain drop-shadow-[0_0_40px_rgba(34,211,238,0.6)]"
                  priority
                  width={600} height={600}
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_40px_rgba(34,211,238,0.8)]">
                  Pioneering The Possible
                </span>
              </h2>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <FeedbackForm />
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default contact;