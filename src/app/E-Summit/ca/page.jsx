"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Users,
  Target,
  Megaphone,
  Award,
  Gift,
  MessageSquare,
  Share2,
  Trophy,
  Calendar,
  MapPin,
  Sparkles,
} from "lucide-react";
import ParticleBackground from "@/components/E-Summit/ParticleBackground";

const CA_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeLUGqtnbOGiqHrztp2jvSkEu_GwJmwTHdln8r6tFWQPqcOlw/viewform?usp=dialog";

const CampusAmbassador = () => {
  const { scrollY } = useScroll();
  const [scrollRange, setScrollRange] = useState(1);

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

  const scrollProgress = useTransform(scrollY, [0, scrollRange], [0, 1], {
    clamp: true,
  });

  const scale = useTransform(scrollProgress, [0, 1], [1, 1.5]);

  const hoverCard = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.08,
      y: -6,
      transition: { type: "spring", stiffness: 300, damping: 18 },
    },
  };
  const responsibilities = [
    {
      icon: Megaphone,
      title: "Promote Events",
      desc: "Share speaker announcements, startup competitions, and workshops across your campus.",
      color: "blue",
    },
    {
      icon: Share2,
      title: "Drive Registrations",
      desc: "Use your unique referral code to get students to register for E-Summit events on Unstop/Google Forms.",
      color: "cyan",
    },
    {
      icon: MessageSquare,
      title: "Spread the Word",
      desc: "Leverage WhatsApp groups, LinkedIn, and Instagram to maximize reach and engagement.",
      color: "purple",
    },
    {
      icon: Users,
      title: "Build Community",
      desc: "Connect with fellow ambassadors and be part of an exclusive WhatsApp community with support and motivation.",
      color: "pink",
    },
  ];

  const offlineIncentives = [
    { range: "10-40", rewards: ["Website Mention", "Certificate"] },
    {
      range: "40-70",
      rewards: ["Instagram Mention", "Website Mention", "Certificate"],
    },
    {
      range: "70-100",
      rewards: [
        "E-Summit T-Shirt",
        "Instagram Mention",
        "Website Mention",
        "Certificate",
      ],
    },
    {
      range: "100+",
      rewards: [
        "T-Shirt",
        "Free E-Summit Pass",
        "Instagram Mention",
        "Website Mention",
        "Certificate",
      ],
    },
  ];

  const onlineIncentives = [
    { range: "Below 75", rewards: ["Website Mention", "Certificate"] },
    {
      range: "75-150",
      rewards: ["Instagram Mention", "Website Mention", "Certificate"],
    },
    {
      range: "150-200",
      rewards: [
        "E-Summit T-Shirt",
        "Instagram Mention",
        "Website Mention",
        "Certificate",
      ],
    },
    {
      range: "200+",
      rewards: [
        "T-Shirt",
        "Free E-Summit Pass",
        "Instagram Mention",
        "Website Mention",
        "Certificate",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <div className="relative h-screen" style={{ minHeight: "100vh" }}>
        {/* Background Image with Scroll Effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-[url('/IIT_Ropar_Main_Gate.png')] bg-center bg-no-repeat bg-cover pointer-events-none z-0"
          style={{ scale }}
        />

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 pointer-events-none z-10" />

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Title */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <Users className="text-cyan-400" size={64} />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Campus Ambassador
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-white/90">
                Program
              </h2>
            </div>

            <div className="h-1 w-48 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-8" />

            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
              Become the face of E-Summit IIT Ropar at your campus! Join our
              ambassador program and help us build a thriving entrepreneurial
              community while earning exciting rewards.
            </p>

            {/* Info Badges */}
            <motion.div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
              {[
                {
                  icon: Calendar,
                  text: "E-Summit April 2026",
                  color: "orange",
                },
                { icon: MapPin, text: "IIT Ropar", color: "purple" },
                { icon: Sparkles, text: "Exclusive Rewards", color: "cyan" },
              ].map(({ icon: Icon, text, color }) => (
                <motion.div
                  key={text}
                  variants={hoverCard}
                  initial="initial"
                  whileHover="hover"
                  className={`group flex items-center space-x-3 bg-black/60 backdrop-blur-md px-5 py-3 rounded-full cursor-default border border-${color}-400/40 hover:bg-black/80 transition-colors duration-300`}
                >
                  <span className={`text-${color}-300`}>
                    <Icon size={24} />
                  </span>
                  <span
                    className={`text-base md:text-lg font-semibold text-${color}-200`}
                  >
                    {text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <a href={CA_FORM_URL} target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold text-lg rounded-full shadow-lg shadow-cyan-500/30 transition-all duration-200"
              >
                <Users size={24} />
                Apply Now
              </motion.button>
            </a>
          </motion.div>
        </div>
      </div>

      <div className="relative bg-black">
        {/* Particle Background for rest of page */}
        <ParticleBackground />

        {/* Target Scale Section */}
        <section className="relative z-20 py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Target className="text-orange-400" size={36} />
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Our Target Scale
                </h2>
              </div>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "15-25", label: "Partner Colleges" },
                { number: "3-4", label: "Ambassadors per College" },
                { number: "5K+", label: "Hackathon Registrations" },
                { number: "1K+", label: "Offline Event Registrations" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md border border-orange-500/20 rounded-2xl p-6 text-center hover:border-orange-500/40 transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-orange-200 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Responsibilities Section */}
        <section className="relative z-20 py-16 px-4 md:px-8 bg-gradient-to-b from-transparent via-[#1a1f3f]/50 to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Megaphone className="text-blue-400" size={36} />
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Your Responsibilities
                </h2>
              </div>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {responsibilities.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white/5 backdrop-blur-md border border-${item.color}-500/20 rounded-2xl p-6 hover:border-${item.color}-500/40 transition-all duration-300 group`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className={`text-${item.color}-400`} size={28} />
                  </div>
                  <h3
                    className={`text-xl font-bold text-${item.color}-300 mb-3`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-blue-200/80 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Incentives Section */}
        <section className="relative z-20 py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="text-yellow-400" size={36} />
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Incentives & Rewards
                </h2>
              </div>
              <p className="text-yellow-200 text-lg max-w-2xl mx-auto mb-2">
                Earn exciting rewards based on your performance!
              </p>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Offline Events */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md border border-green-500/20 rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
                  <Award size={24} />
                  Offline Events Registrations
                </h3>
                <div className="space-y-4">
                  {offlineIncentives.map((tier, index) => (
                    <div
                      key={tier.range}
                      className="bg-green-500/5 border border-green-500/10 rounded-xl p-4 hover:border-green-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-green-300">
                          {tier.range}
                        </span>
                        <span className="text-green-400 text-sm">
                          Registrations
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tier.rewards.map((reward) => (
                          <span
                            key={reward}
                            className="px-3 py-1 bg-green-500/10 text-green-200 text-xs rounded-full border border-green-500/20"
                          >
                            {reward}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Online Hackathon */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md border border-purple-500/20 rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                  <Gift size={24} />
                  Online Hackathon Registrations
                </h3>
                <div className="space-y-4">
                  {onlineIncentives.map((tier, index) => (
                    <div
                      key={tier.range}
                      className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-4 hover:border-purple-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-purple-300">
                          {tier.range}
                        </span>
                        <span className="text-purple-400 text-sm">
                          Registrations
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tier.rewards.map((reward) => (
                          <span
                            key={reward}
                            className="px-3 py-1 bg-purple-500/10 text-purple-200 text-xs rounded-full border border-purple-500/20"
                          >
                            {reward}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Community & Support Section */}
        <section className="relative z-20 py-16 px-4 md:px-8 bg-gradient-to-b from-transparent via-[#1a1f3f]/50 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <MessageSquare className="text-pink-400" size={36} />
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Ambassador Community
                </h2>
              </div>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-8" />

              <div className="bg-white/5 backdrop-blur-md border border-pink-500/20 rounded-2xl p-8">
                <p className="text-lg text-blue-200/90 leading-relaxed mb-6">
                  Join our exclusive WhatsApp community (created 3 weeks before
                  the summit) where you'll receive:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Motivation & Support",
                      desc: "Regular encouragement from the E-Summit team",
                    },
                    {
                      title: "Live Leaderboard",
                      desc: "Track your performance and compete with others",
                    },
                    {
                      title: "Ready-to-Share Content",
                      desc: "All promotional materials provided to you",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="bg-pink-500/5 border border-pink-500/10 rounded-xl p-4"
                    >
                      <h4 className="text-pink-300 font-semibold mb-2">
                        {item.title}
                      </h4>
                      <p className="text-blue-200/70 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-20 py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-md border border-cyan-500/20 rounded-3xl p-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
                Ready to Lead?
              </h2>
              <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                Top ambassadors will receive a complimentary E-Summit pass after
                performance verification. Apply now and start your journey!
              </p>
              <a href={CA_FORM_URL} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold text-lg rounded-full shadow-lg shadow-purple-500/30 transition-all duration-200"
                >
                  <Users size={22} />
                  Apply to Become a Campus Ambassador
                </motion.button>
              </a>
            </motion.div>
          </div>
        </section>
      </div>
      {/* End of Rest of Page with Particle Background */}
    </div>
  );
};

export default CampusAmbassador;
