
"use client";
import { motion, useScroll, useTransform, useViewportScroll } from "framer-motion";
import StartupExpoCard from "@/components/E-Summit/StartupExpoCard";
import EventCard from "@/components/E-Summit/EventCard";
import StartupExpoForm from "@/components/E-Summit/StartupExpoForm";
import { startupExpoData, allEvents } from "@/context/E-Summit/dataObjects";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { useEffect, useState } from "react";
import {
  Rocket,
  Calendar,
  Sparkles,
  Users,
  IndianRupee,
  Building2,
  Mic2,
  Target,
  Lightbulb,
} from "lucide-react";
import ParticleBackground from "@/components/E-Summit/ParticleBackground";

import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});


import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


import { Viga } from "next/font/google";

const viga = Viga({
  subsets: ["latin"],
  weight: "400", // Viga only has one weight
});


import { IBM_Plex_Mono } from "next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


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
    // <div className="min-h-screen bg-[#0a0e27]">
    <div className=" bg-[#0a0e27]">
      {/* Background Image */}
      {/* <motion.div
        style={{ scale }}
        className="fixed inset-0 bg-[url('/IIT_Ropar_Main_Gate.png')] bg-center bg-no-repeat bg-cover pointer-events-none z-0"
      /> */}

      {/* Overlay to improve text readability */}
      {/* <div className="fixed inset-0 bg-black/40 pointer-events-none z-10" /> */}





      {/* --- EVENTS SECTION --- */}
      <section className="relative py-20 px-4 md:px-8 lg:px-12">
        <ParticleBackground />
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`${ibmPlexMono.className} md:mt-10 font-extrabold mb-6 drop-shadow-lg`}>
              <span className="bg-gradient-to-r from-purple-100 to-blue-300 bg-clip-text text-transparent">
                <button className="relative inline-flex w-fit h-full overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 p-1">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

                  <span className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3 text-3xl md:text-6xl font-medium text-white backdrop-blur-3xl">
                    Major Events
                  </span>

                </button>
              </span>
            </h2>
            <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </motion.div>

          {/* Events Grid */}
          <EventCard events={allEvents} />
          {/* <h1 className="text-center font-bold text-4xl text-white z-96 relative">Coming Soon...</h1> */}
        </div>
      </section>


      {/* --- STARTUP EXPO & INVESTORS ARENA --- */}
      <section className="relative z-20 py-20 px-4 md:px-8 lg:px-12">
        <ParticleBackground />
        <div className="max-w-[1100px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-10 md:mb-14"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
              <Rocket className="text-orange-400 shrink-0" size={40} />
              <h2
                className={`${ibmPlexMono.className} text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400`}
              >
                Startup Expo &amp; Investors Arena
              </h2>
            </div>
            <p
              className={`${viga.className} text-orange-100/95 text-base md:text-lg max-w-3xl mx-auto leading-relaxed`}
            >
              A flagship track at{" "}
              <span className="text-orange-300 font-semibold">E-Summit 2026</span>{" "}
              · IIT Ropar — presented by the{" "}
              <span className="text-white/95">Entrepreneurship Cell (E-Cell)</span>{" "}
              &amp; <span className="text-white/95">TBIF</span>.
            </p>
            <div className="mt-5 h-1 w-32 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className={`${ibmPlexMono.className} text-center text-lg md:text-xl font-bold text-orange-200 mb-10 md:mb-12 max-w-4xl mx-auto leading-snug px-2`}
          >
            Your innovation deserves a stage as big as your ambition.
          </motion.p>

          {/* Key stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 md:mb-16"
          >
            {[
              {
                icon: Building2,
                label: "Startups on the floor",
                value: "30+",
              },
              {
                icon: Users,
                label: "Attendees",
                value: "3500+",
              },
              {
                icon: IndianRupee,
                label: "Investment discussions",
                value: "₹10 Cr+",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-orange-500/25 bg-orange-950/30 backdrop-blur-md px-5 py-6 text-center"
              >
                <Icon
                  className="mx-auto mb-2 text-orange-400"
                  size={28}
                  strokeWidth={1.75}
                />
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {value}
                </p>
                <p className="text-sm text-orange-200/80">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-9 mb-10 md:mb-12"
          >
            <h3
              className={`${ibmPlexMono.className} text-sm font-bold uppercase tracking-widest text-orange-400 mb-3`}
            >
              About the event
            </h3>
            <p className={`${viga.className} text-gray-200 text-base md:text-lg leading-relaxed`}>
              A large-scale entrepreneurship summit that brings together{" "}
              <span className="text-white font-medium">startups</span>,{" "}
              <span className="text-white font-medium">investors</span>,{" "}
              <span className="text-white font-medium">industry leaders</span>,{" "}
              <span className="text-white font-medium">creators</span>, and{" "}
              <span className="text-white font-medium">students</span> — one
              room, one ecosystem, endless collisions.
            </p>
          </motion.div>

          {/* Event components */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 md:mb-14">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-950/50 to-slate-950/80 p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-orange-400" size={22} />
                <h3
                  className={`${ibmPlexMono.className} text-xl font-bold text-white`}
                >
                  Startup Expo
                </h3>
              </div>
              <ul className={`${viga.className} space-y-2.5 text-orange-100/90`}>
                <li className="flex gap-2">
                  <span className="text-orange-400">▸</span>
                  Exhibition booths (10×10 ft)
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-400">▸</span>
                  Live product demos
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-400">▸</span>
                  Investor walk-through
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/40 to-slate-950/80 p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Mic2 className="text-red-400" size={22} />
                <h3
                  className={`${ibmPlexMono.className} text-xl font-bold text-white`}
                >
                  Investors Arena
                </h3>
              </div>
              <ul className={`${viga.className} space-y-2.5 text-red-100/90`}>
                <li className="flex gap-2">
                  <span className="text-red-400">▸</span>
                  Curated startup pitching
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">▸</span>
                  10 min pitch + 5 min Q&amp;A + feedback
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-14"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Calendar className="text-orange-400" size={24} />
              <h3
                className={`${ibmPlexMono.className} text-xl md:text-2xl font-bold text-white`}
              >
                Event timeline
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  day: "Day 1",
                  date: "11 April 2026",
                  slots: [
                    "09:30–10:30 — Registration & booth setup",
                    "10:30–11:00 — Opening ceremony",
                    "11:00–14:00 — Expo exhibition",
                    "14:00–15:00 — Networking lunch",
                    "15:00–17:30 — Investor walkthrough",
                    "17:30–18:30 — Networking",
                  ],
                },
                {
                  day: "Day 2",
                  date: "12 April 2026",
                  slots: [
                    "09:30–10:30 — Opening remarks",
                    "10:30–13:00 — Pitch sessions",
                    "13:00–14:00 — Lunch",
                    "14:00–16:30 — Investor meetings",
                    "17:30–18:00 — Closing ceremony",
                  ],
                },
              ].map((block) => (
                <div
                  key={block.day}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-md p-6"
                >
                  <p className="text-orange-400 font-semibold text-sm uppercase tracking-wide mb-1">
                    {block.day}
                  </p>
                  <p className={`${ibmPlexMono.className} text-white font-bold text-lg mb-4`}>
                    {block.date}
                  </p>
                  <ul className="space-y-2.5 text-sm md:text-base text-gray-300">
                    {block.slots.map((line) => (
                      <li key={line} className="leading-snug border-l-2 border-orange-500/40 pl-3">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-14"
          >
            <h3
              className={`${ibmPlexMono.className} text-center text-lg font-bold text-white mb-6`}
            >
              Packages
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { title: "Startup Expo", price: "₹6,999", hint: "Expo access" },
                {
                  title: "Expo + Investors Arena",
                  price: "₹11,999",
                  hint: "Expo + pitching track",
                },
                {
                  title: "Expo + Arena + Sponsorship",
                  price: "₹19,999",
                  hint: "Full stack visibility",
                },
              ].map((pkg) => (
                <div
                  key={pkg.title}
                  className="rounded-2xl border border-orange-500/30 bg-orange-950/25 p-5 text-center flex flex-col justify-between min-h-[140px]"
                >
                  <div>
                    <p className="text-xs text-orange-200/80 mb-1">{pkg.hint}</p>
                    <p className="text-white font-semibold text-sm leading-tight mb-2">
                      {pkg.title}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-orange-300">{pkg.price}</p>
                </div>
              ))}
            </div>
            <p className={`${viga.className} text-center text-orange-100/80 text-sm mt-5`}>
              Benefits include booths, branding, investor access &amp; networking —
              scale what fits your stage.
            </p>
          </motion.div>

          {/* Why exhibit — 3 pillars */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-5 mb-12 md:mb-14"
          >
            {[
              {
                icon: Target,
                title: "Investor access",
                text: "Meet VCs & angels hunting the next disruptor — curated conversations, not cold emails.",
              },
              {
                icon: Users,
                title: "The talent pool",
                text: "Collaborate & hire from IIT Ropar’s sharp builders, researchers, and operators.",
              },
              {
                icon: Lightbulb,
                title: "Market validation",
                text: "Real-time feedback from veterans and enthusiasts who’ve seen it all.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <Icon className="text-orange-400 mb-2" size={22} />
                <h4 className="text-white font-bold text-sm mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            );})}
          </motion.div>

          {/* Storytelling */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-orange-500/20 bg-gradient-to-b from-orange-950/30 to-transparent p-6 md:p-10 mb-12"
          >
            <p className={`${viga.className} text-gray-200 text-base md:text-lg leading-relaxed mb-5`}>
              The Startup Expo at{" "}
              <span className="text-orange-300 font-semibold">E-Summit &apos;26</span>,{" "}
              IIT Ropar is opening its doors — and we want the boldest founders on
              the floor. This isn&apos;t just a booth; it&apos;s a{" "}
              <span className="text-white font-medium">strategic interface</span>{" "}
              between your vision and the ecosystem.
            </p>
            <p className={`${viga.className} text-gray-300 text-base md:text-lg leading-relaxed mb-5`}>
              Early-stage teams get to showcase at one of India&apos;s premier
              technical hubs. If you&apos;re building the &quot;next big thing&quot;,
              this is where it meets the people who matter.
            </p>
            <p className={`${ibmPlexMono.className} text-orange-200/95 text-base md:text-lg font-semibold text-center`}>
              Don&apos;t just build in silence — show the ecosystem what you&apos;ve
              been shipping.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowStartupExpoForm(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold rounded-full shadow-lg shadow-orange-500/50 transition-all duration-200"
            >
              <Rocket size={20} />
              Register your startup
            </motion.button>
          </motion.div>

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