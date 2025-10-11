import React from "react";
import {galleryImages} from "@/context/galleryImages"

const Gallery = () => (
  <div className="py-10 text-center mt-24">
    <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "#6f76bfff" }}>
      E-CELL MOMENTS
    </h1>
    <p className="text-lg md:text-xl max-w-2xl mx-auto my-6" style={{ color: "#222" }}>
      Relive the unforgettable journey of E-Cell through moments captured at our flagship events. From inspiring talks to vibrant gatherings, each picture tells a story of innovation and collaboration.
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
      {galleryImages.map((img, idx) => (
        <div key={idx} className="rounded-lg shadow-lg overflow-hidden bg-white">
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
  </div>
);

export default Gallery;