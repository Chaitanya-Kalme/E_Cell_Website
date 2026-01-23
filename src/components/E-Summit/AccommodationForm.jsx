"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Phone, Mail, Calendar, Users, MapPin, CheckCircle } from "lucide-react";

const AccommodationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    gender: "",
    checkIn: "",
    checkOut: "",
    roomType: "",
    numberOfPeople: "",
    specialRequests: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form Data:", formData);
      setLoading(false);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          college: "",
          gender: "",
          checkIn: "",
          checkOut: "",
          roomType: "",
          numberOfPeople: "",
          specialRequests: "",
        });
      }, 3000);
    }, 2000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-8"
      >
        <div className="bg-gradient-to-br from-[#0a1628] to-[#1e3a5f] border-2 border-green-400/50 rounded-3xl p-12 text-center shadow-2xl shadow-green-500/20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="mx-auto text-green-400 mb-6" size={80} />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">
            Accommodation Request Submitted!
          </h2>
          <p className="text-blue-200 text-lg">
            We'll get back to you shortly with confirmation details.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-4 sm:p-8"
    >
      <div className="bg-gradient-to-br from-[#0a1628] to-[#1e3a5f] backdrop-blur-lg border-2 border-blue-400/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-blue-500/20">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Home className="text-cyan-400" size={40} />
            <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.9)]">
              Accommodation Request
            </h2>
          </div>
          <p className="text-blue-200 text-sm sm:text-base">
            Fill out the form below to request accommodation for E-Summit
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-black/30 rounded-2xl p-6 border border-cyan-400/20">
            <h3 className="text-cyan-300 font-semibold text-lg mb-4 flex items-center gap-2">
              <User size={20} />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-blue-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-blue-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-blue-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  College/University *
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-blue-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="Your institution name"
                />
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Accommodation Details */}
          <div className="bg-black/30 rounded-2xl p-6 border border-purple-400/20">
            <h3 className="text-purple-300 font-semibold text-lg mb-4 flex items-center gap-2">
              <Home size={20} />
              Accommodation Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  Check-in Date *
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  Check-out Date *
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  Room Type *
                </label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                >
                  <option value="">Select Room Type</option>
                  <option value="shared">Shared Room (4-6 people)</option>
                  <option value="double">Double Sharing</option>
                  <option value="single">Single Room</option>
                </select>
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  Number of People *
                </label>
                <input
                  type="number"
                  name="numberOfPeople"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  required
                  min="1"
                  max="10"
                  className="w-full px-4 py-3 bg-black/40 border border-blue-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="1"
                />
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="bg-black/30 rounded-2xl p-6 border border-green-400/20">
            <h3 className="text-green-300 font-semibold text-lg mb-4">
              Special Requests (Optional)
            </h3>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 bg-black/40 border border-blue-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
              placeholder="Any dietary restrictions, accessibility needs, or other special requirements..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Accommodation Request"
            )}
          </motion.button>

          <p className="text-center text-blue-300 text-sm">
            * Required fields
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default AccommodationForm;