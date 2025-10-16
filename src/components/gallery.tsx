import React from "react";
import { galleryImages1, galleryImages2 } from "@/context/galleryImages"
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const Gallery = () => (
  <div className="py-10 text-center mt-24">
    <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "#6f76bfff" }}>
      E-CELL MOMENTS
    </h1>
    <p className="text-lg md:text-xl max-w-2xl mx-auto my-6 dark:text-white">
      Relive the unforgettable journey of E-Cell through moments captured at our flagship events. From inspiring talks to vibrant gatherings, each picture tells a story of innovation and collaboration.
    </p>
    <div className=" rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] gap-y-10 items-center justify-center relative">
      <InfiniteMovingCards
        items={galleryImages1}
        direction="right"
        speed="normal"
      />
      <InfiniteMovingCards
        items={galleryImages2}
        direction="left"
        speed="normal"
      />
    </div>
  </div>
);

export default Gallery;