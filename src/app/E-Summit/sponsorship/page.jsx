"use client";
import React from "react";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { sponsorCategories } from "@/context/E-Summit/sponsors";
import {
  Handshake,
  Star,
  Newspaper,
  BookOpen,
  Users,
  Sparkles,
} from "lucide-react";

const categoryIcons = {
  "Title Sponsors": Star,
  "Event Sponsors": Sparkles,
  "Media Partners": Newspaper,
  "Knowledge Partners": BookOpen,
  "Community Partners": Users,
};

const categoryColors = {
  "Title Sponsors": {
    from: "from-yellow-400",
    to: "to-orange-400",
    text: "text-yellow-400",
    shadow: "shadow-yellow-500/50",
    icon: "text-yellow-400",
    line: "from-yellow-500 to-orange-500",
  },
  "Event Sponsors": {
    from: "from-blue-400",
    to: "to-cyan-400",
    text: "text-blue-400",
    shadow: "shadow-blue-500/50",
    icon: "text-blue-400",
    line: "from-blue-500 to-cyan-500",
  },
  "Media Partners": {
    from: "from-purple-400",
    to: "to-pink-400",
    text: "text-purple-400",
    shadow: "shadow-purple-500/50",
    icon: "text-purple-400",
    line: "from-purple-500 to-pink-500",
  },
  "Knowledge Partners": {
    from: "from-green-400",
    to: "to-emerald-400",
    text: "text-green-400",
    shadow: "shadow-green-500/50",
    icon: "text-green-400",
    line: "from-green-500 to-emerald-500",
  },
  "Community Partners": {
    from: "from-orange-400",
    to: "to-red-400",
    text: "text-orange-400",
    shadow: "shadow-orange-500/50",
    icon: "text-orange-400",
    line: "from-orange-500 to-red-500",
  },
};

const Sponsorship = () => {
  return (
    <div className="min-h-screen bg-[#0a0e27]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Handshake className="text-cyan-400" size={40} />
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Our Sponsors
              </h2>
            </div>
            <p className="text-lg max-w-2xl mx-auto bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Powering E-Summit IIT Ropar 2026
            </p>
            <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full" />
            <p className="text-2xl text-blue-200 leading-relaxed max-w-3xl mx-auto mt-6">
              E-Summit IIT Ropar 2026 is made possible by the generous support
              of our sponsors and partners. Their belief in innovation and
              entrepreneurship fuels the experiences, conversations, and
              opportunities we create.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sponsor Category Sections */}
      {/* <div className="pb-20 space-y-20 px-4 md:px-8 lg:px-12">
        {sponsorCategories.map((category, catIdx) => {
          const colors =
            categoryColors[category.title] || categoryColors["Event Sponsors"];
          const IconComponent = categoryIcons[category.title] || Star;

          return (
            <motion.section
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <IconComponent className={colors.icon} size={32} />
                  <h3
                    className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${colors.from} ${colors.to}`}
                  >
                    {category.title}
                  </h3>
                </div>
                <div
                  className={`h-1 w-24 mx-auto bg-gradient-to-r ${colors.line} rounded-full`}
                />
              </div>

              <div className="rounded-md flex flex-col antialiased items-center justify-center relative">
                <InfiniteMovingCards
                  items={category.sponsors}
                  direction={catIdx % 2 === 0 ? "left" : "right"}
                  speed="normal"
                  pauseOnHover={true}
                />
              </div>
            </motion.section>
          );
        })}
      </div> */}

      <div className="pb-20 space-y-20 px-4 md:px-8 lg:px-12 text-white text-center text-5xl">
        Coming Soon...
      </div>

      {/* Become a Sponsor CTA */}
      <section className="relative py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-[#0a0e27] via-[#1a1f3f] to-[#0a0e27]">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="text-cyan-400" size={32} />
                <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Become a Sponsor
                </h3>
              </div>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-6" />
              <p className="text-blue-200 text-base leading-relaxed mb-8 max-w-2xl mx-auto">
                Partner with E-Summit IIT Ropar 2026 and connect with the
                brightest minds in entrepreneurship. Gain brand visibility,
                access to talent, and be part of an inspiring community of
                innovators.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:ecell@iitrpr.ac.in"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold rounded-full shadow-lg shadow-blue-500/50 transition-all duration-200"
              >
                <Handshake size={20} />
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
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

export default Sponsorship;
