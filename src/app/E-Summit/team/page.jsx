"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import ContactCard from "@/components/E-Summit/contactCards";
import { dataContext } from "@/context/E-Summit/dataContext";

const OurTeam = () => {
  const { coreTeam, teamMembers } = useContext(dataContext);

  return (
    <div className="min-h-screen bg-[#1a1f3f]">
      {/* Hero Section with Welcome Text + Core Team Side by Side */}
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {/* Welcome Text - Left Side */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col text-center lg:text-left lg:w-2/5 lg:sticky lg:top-28"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-blue-800 italic mb-4">
              Our Team
            </h1>
            <h2 className="text-lg md:text-xl font-semibold text-blue-600 tracking-wide mb-6">
              Meet the Team Behind E-Summit IIT Ropar 2026
            </h2>
            <p className="text-base text-gray-300 leading-relaxed mb-4">
              E-Summit IIT Ropar 2026 is powered by a dynamic team of
              innovators, leaders, and changemakers driven by a shared vision —
              to ignite the entrepreneurial spirit and foster a culture of bold
              ideas and impactful ventures.
            </p>
            <p className="text-base text-gray-300 leading-relaxed mb-4">
              Our team comprises passionate students, creative thinkers, and
              dedicated organizers who work tirelessly to bring together
              founders, investors, industry leaders, and aspiring entrepreneurs
              under one inspiring platform. With a commitment to excellence and
              innovation, they strive to create meaningful experiences, powerful
              conversations, and opportunities that transform ideas into action.
            </p>
            <p className="text-base text-gray-300 leading-relaxed">
              Together, we are building more than an event — we are building a
              thriving entrepreneurial ecosystem.
            </p>
          </motion.div>

          {/* Core Team Cards - Right Side (Pyramid Layout) */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-3/5 flex flex-col items-center gap-1"
          >
            {/* President (Top of Pyramid) */}
            {coreTeam[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <ContactCard member={coreTeam[0]} isOC={true} />
              </motion.div>
            )}

            {/* Vice President and Secretary (Bottom of Pyramid) */}
            <div className="flex gap-4 justify-center">
              {coreTeam.slice(1, 3).map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ContactCard member={member} isOC={true} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Section Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 italic text-center mb-12">
            Our Core Members
          </h2>

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
    </div>
  );
};

export default OurTeam;
