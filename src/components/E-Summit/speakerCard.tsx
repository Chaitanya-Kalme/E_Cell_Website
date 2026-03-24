"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

import { Montserrat, Playfair_Display } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const SpeakersListCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    imageSrc: string;
    alt?: string;
    name?: string;
    position?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) scrollerRef.current.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-svw overflow-visible",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap py-0 gap-x-10",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[250px] max-w-full shrink-0 rounded-2xl overflow-visible md:w-[350px]"
          >
            <div className="w-full rounded-2xl overflow-hidden shadow-xl bg-white hover:scale-105 transition-transform duration-300">

              {/* Image */}
              <div className="w-full h-[300px] md:h-[400px]">
                <img
                  src={item.imageSrc}
                  alt={item.alt || "Speaker Image"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Section */}
              <div className="py-5 px-4 text-center bg-blue-800">

                {item.name && (
                  <h3
                    className={`${playfair.className} text-xl md:text-2xl font-bold text-white tracking-wide`}
                  >
                    {item.name}
                  </h3>
                )}

                {item.position && (
                  <p
                    className={`${montserrat.className} text-sm md:text-base text-white mt-1 tracking-wide`}
                  >
                    {item.position}
                  </p>
                )}

              </div>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
