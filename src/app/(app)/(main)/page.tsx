import React from "react";
import HeroSection from "@/components/ui/HeroSection";
import FeaturesSection from "@/components/ui/FeaturesSection";
import HomePageHeroSection from "@/components/HomePageHeroSection";
import HomePageDetailsSection from "@/components/HomePageDetailsSection";

export default function Home() {
  return (
    <div className="text-black dark:text-white">
      <HomePageHeroSection/>
      <HomePageDetailsSection/>
    </div>
  );
}