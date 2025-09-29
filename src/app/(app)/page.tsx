import React from "react";
import HeroSection from "@/components/ui/HeroSection";
import FeaturesSection from "@/components/ui/FeaturesSection";
import NavbarMenu from "@/components/ui/navbar-menu";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}