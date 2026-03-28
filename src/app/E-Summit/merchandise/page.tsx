"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ParticleBackground from "@/components/E-Summit/ParticleBackground";
import {
  Calendar,
  ExternalLink,
  Package,
  Phone,
  Shirt,
} from "lucide-react";
import { IBM_Plex_Mono } from "next/font/google";
import { Viga } from "next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const viga = Viga({
  subsets: ["latin"],
  weight: "400",
});

const MERCH_ORDER_FORM_URL =
  "https://forms.gle/pWbQeqR6NTrMhzYt5";

export default function MerchandisePage() {
  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <section className="relative py-20 px-4 md:px-8 lg:px-12 pb-32">
        <ParticleBackground />
        <div className="max-w-[1600px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h1
              className={`${ibmPlexMono.className} font-extrabold mb-6 drop-shadow-lg`}
            >
              <span className="bg-gradient-to-r from-purple-100 to-blue-300 bg-clip-text text-transparent">
                <span className="relative inline-flex w-fit h-full overflow-hidden rounded-full p-1 mx-auto">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 sm:px-7 sm:py-3 text-xl sm:text-3xl md:text-5xl font-medium text-white backdrop-blur-3xl max-w-[95vw]">
                    E-SUMMIT&apos;26 IIT ROPAR MERCHANDISE
                  </span>
                </span>
              </span>
            </h1>
            <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto mb-14 md:mb-16 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-6 md:p-10 text-center md:text-left"
          >
            <p
              className={`${ibmPlexMono.className} text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-cyan-300/90 mb-4`}
            >
              Wear the summit. Own the moment.
            </p>
            <h2
              className={`${ibmPlexMono.className} text-2xl md:text-3xl font-bold text-white mb-5 leading-snug`}
            >
              Limited-drop tees for{" "}
              <span className="bg-gradient-to-r from-purple-200 to-cyan-300 bg-clip-text text-transparent">
                E-SUMMIT&apos;26
              </span>
            </h2>
            <p className={`${viga.className} text-gray-200 text-base md:text-lg leading-relaxed`}>
              IIT Ropar&apos;s flagship entrepreneurship summit is almost here —
              and this year you can carry the energy home. Our official
              T-shirts are built for founders, dreamers, and anyone ready to
              show up loud. Premium print, bold design, zero compromise: gear
              up and make E-SUMMIT&apos;26 unforgettable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid md:grid-cols-2 gap-6 lg:gap-10 mb-16 md:mb-20"
          >
            <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-xl">
              <Image
                src="/esummit_tshirt0.jpg"
                alt="E-SUMMIT'26 merchandise T-shirt — front design"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </figure>
            <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-xl">
              <Image
                src="/esummit_tshirt.jpg"
                alt="E-SUMMIT'26 merchandise T-shirt — back design"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </figure>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <Shirt className="text-cyan-400" size={36} />
              <h2
                className={`${ibmPlexMono.className} text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400`}
              >
                Unisex T-shirt
              </h2>
            </div>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-10" />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-2xl border border-white/15 bg-slate-950/60 backdrop-blur-md p-6 text-center"
            >
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
                Normal
              </p>
              <p className="text-3xl md:text-4xl font-bold text-white">₹299/-</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-white/15 bg-slate-950/60 backdrop-blur-md p-6 text-center"
            >
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
                Oversized
              </p>
              <p className="text-3xl md:text-4xl font-bold text-white">₹349/-</p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className={`${viga.className} text-center text-blue-200/95 text-lg mb-10`}
          >
            Quality: 200+ GSM (Premium Print Quality)
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="max-w-lg mx-auto text-center mb-16"
          >
            <a
              href={MERCH_ORDER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${ibmPlexMono.className} group inline-flex items-center justify-center gap-3 w-full sm:w-auto min-h-[52px] px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-500/25 border border-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`}
            >
              <ExternalLink
                className="shrink-0 opacity-90 group-hover:translate-x-0.5 transition-transform"
                size={22}
                aria-hidden
              />
              Order Now
            </a>
            <p className="mt-3 text-sm text-gray-500">
              Opens in a new tab
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="max-w-3xl mx-auto rounded-3xl border border-orange-500/25 bg-gradient-to-br from-orange-950/40 to-slate-950/80 backdrop-blur-xl p-6 md:p-10 mb-16"
          >
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <Package className="text-orange-400 shrink-0" size={28} />
              <h3
                className={`${ibmPlexMono.className} text-xl md:text-2xl font-bold text-orange-200`}
              >
                Order details
              </h3>
            </div>
            <ul className="space-y-6 text-gray-200">
              <li className="flex gap-4">
                <Calendar className="text-orange-400 shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-semibold text-white mb-1">Form deadline</p>
                  <p className={`${viga.className} text-gray-300 leading-relaxed`}>
                    Submit your purchase {" "}
                    <a
                      href={MERCH_ORDER_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-300 font-semibold underline underline-offset-2 hover:text-orange-200"
                    >
                      here
                    </a>
                    . The deadline is{" "}
                    <span className="text-orange-300 font-semibold">
                      29th March 2026
                    </span>{" "}
                    — strict and cannot be extended.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Package className="text-orange-400 shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-semibold text-white mb-1">
                    Expected delivery
                  </p>
                  <p className={`${viga.className} text-gray-300 leading-relaxed`}>
                    We anticipate delivering the T-shirts to you before{" "}
                    <span className="text-orange-300 font-semibold">
                      10th April
                    </span>
                    , just in time for you to showcase your E-SUMMIT spirit.
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-xl mx-auto text-center rounded-2xl border border-white/10 bg-slate-950/50 p-8"
          >
            <p
              className={`${ibmPlexMono.className} text-sm uppercase tracking-widest text-gray-400 mb-6`}
            >
              For any query, contact
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="tel:+918540087276"
                className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                <Phone size={18} className="shrink-0" />
                <span className={viga.className}>
                  <span className="text-gray-400 block text-xs">Garv</span>
                  85400 87276
                </span>
              </a>
              <a
                href="tel:+918278004569"
                className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                <Phone size={18} className="shrink-0" />
                <span className={viga.className}>
                  <span className="text-gray-400 block text-xs">Abhishek</span>
                  82780 04569
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

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
}
