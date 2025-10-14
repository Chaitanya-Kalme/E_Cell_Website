import React from "react";

export default function HeroSection() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-6 text-purple-700 tracking-tight">
            E-Cell IIT ROPAR
          </h1>
          <p className="text-xl mb-8 text-black max-w-xl">
            The all-in-one platform for fostering <span className="text-purple-700 font-semibold">innovation</span>, <span className="text-yellow-400 font-semibold">entrepreneurship</span>, and growth among students. Join us to turn ideas into reality and connect with like-minded visionaries.
          </p>
          <button className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:from-purple-800 hover:to-yellow-500 transition-colors">
            Contact Us
          </button>
        </div>
        {/* Right Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/E-Cell Image.jpg"
            alt="E-Cell Hero"
            className="rounded-3xl shadow-2xl border-4 border-yellow-400 bg-white w-[400px] h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}