"use client";
import React from "react";
import FeedbackForm from "@/components/E-Summit/FeedbackForm";
import { motion } from "framer-motion";
import Image from "next/image";

const contact = () => {

  return (
    <main className="relative min-h-screen">
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
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <Image
                  src="/E-Cell Image.jpg"
                  alt="E-Summit Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_40px_rgba(34,211,238,0.6)]"
                  priority
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