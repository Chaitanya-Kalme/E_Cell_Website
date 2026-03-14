"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import ContactCard from "@/components/E-Summit/contactCards";
import { dataContext } from "@/context/E-Summit/dataContext";
import { Crown, Shield } from "lucide-react";

const OurTeam = () => {
  const { coreTeam, teamMembers } = useContext(dataContext);

  return (
    <div className="min-h-screen bg-[#0a0e27]">

      {/* ── 1. HEADING + INTRO TEXT ── */}
      <section className="relative py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-[800px] mx-auto text-center">
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
              E-Summit IIT Ropar 2026 is powered by a dynamic team of
              innovators, leaders, and changemakers driven by a shared vision —
              to ignite the entrepreneurial spirit and foster a culture of bold
              ideas and impactful ventures.
            </p>
            <p className="text-base text-blue-200/80 leading-relaxed mb-4">
              Our team comprises passionate students, creative thinkers, and
              dedicated organizers who work tirelessly to bring together
              founders, investors, industry leaders, and aspiring entrepreneurs
              under one inspiring platform. With a commitment to excellence and
              innovation, they strive to create meaningful experiences, powerful
              conversations, and opportunities that transform ideas into action.
            </p>
            <p className="text-base text-blue-200/80 leading-relaxed">
              Together, we are building more than an event — we are building a
              thriving entrepreneurial ecosystem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. OC SECTION: President + VP + Secretary ── */}
      <section className="relative py-16 px-4 md:px-8 lg:px-12">
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
              <Crown className="text-blue-400" size={32} />
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
      <section className="relative py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-[#0a0e27] via-[#1a1f3f] to-[#0a0e27]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="text-purple-400" size={40} />
                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Our Core Members
                </h2>
              </div>
              <p className="text-purple-200 text-lg max-w-2xl mx-auto">
                The dedicated team driving every initiative forward
              </p>
              <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </div>

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

      {/* Decorative background blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
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