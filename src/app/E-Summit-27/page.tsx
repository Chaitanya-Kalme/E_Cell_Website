import Hero from "@/components/E-Summit-27/hero/Hero";
import WhatIs from "@/components/E-Summit-27/sections/WhatIs";
import Stats from "@/components/E-Summit-27/sections/Stats";
import AboutCards from "@/components/E-Summit-27/sections/AboutCards";
import Speakers from "@/components/E-Summit-27/sections/Speakers";
import HighlightedEvents from "@/components/E-Summit-27/sections/HighlightedEvents";
import Sponsors from "@/components/E-Summit-27/sections/Sponsors";
import Contact from "@/components/E-Summit-27/sections/Contact";

export default function ESummit27Home() {
  return (
    <main id="top">
      <Hero />
      <WhatIs />
      <Stats />
      <AboutCards />
      <Speakers />
      <HighlightedEvents />
      <Sponsors />
      <Contact />
    </main>
  );
}