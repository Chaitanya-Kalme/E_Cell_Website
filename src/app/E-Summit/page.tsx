"use client";

// Correct imports pointing to components and context folders
import StartupExpoCard from '@/components/E-Summit/StartupExpoCard';
import AccommodationForm from '@/components/E-Summit/AccommodationForm';
import { startupExpoData } from '@/context/E-Summit/dataObjects';

export default function ESummitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a] py-12 px-4">
      
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.9)]">
          E-Summit 2026
        </h1>
        <p className="text-xl text-cyan-200">
          Innovation • Entrepreneurship • Excellence
        </p>
      </div>

      {/* Startup Expo Section */}
      <section className="mb-24">
        <h2 className="text-4xl font-bold text-center text-white mb-4 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">
          Startup Expo
        </h2>
        <p className="text-center text-blue-200 mb-12 max-w-2xl mx-auto">
          Meet innovative startups and entrepreneurs from across the country
        </p>
        <StartupExpoCard startups={startupExpoData} />
      </section>

      {/* Accommodation Form Section */}
      <section className="mb-12">
        <AccommodationForm />
      </section>
      
    </div>
  );
}