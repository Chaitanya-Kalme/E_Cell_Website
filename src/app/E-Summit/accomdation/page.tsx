"use client";
import { motion } from "framer-motion";
import AccommodationForm from "@/components/E-Summit/AccommodationForm";
import { Home, MapPin, Calendar, Users } from "lucide-react";

export default function AccommodationPage() {
  return (
    <div className="min-h-screen bg-[#0a0e27]">
      {/* --- TOP SECTION (Hero) --- */}
      <div className="relative w-full bg-gradient-to-b from-sky-200 to-blue-100 py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-blue-800 italic mb-4">
              E-Summit'26
            </h1>
            <p className="text-sm font-black text-black tracking-[0.5em] uppercase">
              ACCOMMODATION
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- INFO SECTION --- */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-400/30 rounded-2xl p-6 text-center backdrop-blur-sm">
              <MapPin className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">On-Campus</h3>
              <p className="text-blue-200 text-sm">
                Comfortable accommodation within campus premises
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-400/30 rounded-2xl p-6 text-center backdrop-blur-sm">
              <Calendar className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Flexible Dates</h3>
              <p className="text-purple-200 text-sm">
                Book for the duration of the event (Feb 14-16, 2026)
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/30 to-red-900/30 border border-pink-400/30 rounded-2xl p-6 text-center backdrop-blur-sm">
              <Users className="w-10 h-10 text-pink-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Room Options</h3>
              <p className="text-pink-200 text-sm">
                Choose from shared or single rooms
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FORM SECTION --- */}
      <section className="relative py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Home className="text-purple-400" size={40} />
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Book Your Stay
              </h2>
            </div>
            <p className="text-purple-200 text-lg">
              Fill out the form below to request accommodation for E-Summit
            </p>
            <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          </motion.div>

          {/* THE FORM COMPONENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <AccommodationForm />
          </motion.div>
        </div>
      </section>

      {/* --- IMPORTANT INFO --- */}
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-400/30 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-blue-300 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Important Information
            </h3>
            
            <div className="space-y-4 text-blue-100">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <p>Accommodation is available from February 13 to February 17, 2026</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <p>Basic amenities including bedding, Wi-Fi, and meals will be provided</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <p>Accommodation requests must be submitted at least 7 days before check-in</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <p>For any queries, contact us at accommodation@esummit.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}