"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

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
        "scroller relative z-20 max-w-svw overflow-visible", // overflow-visible instead of hidden
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
        style={{ background: "transparent" }} // fully transparent
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[250px] max-w-full shrink-0 rounded-2xl overflow-visible border border-transparent md:w-[350px] bg-transparent shadow-none"
          >
            <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-white">

              {/* Upper Section - Image */}
              <div className="w-full h-[300px] md:h-[400px]">
                <img
                  src={item.imageSrc}
                  alt={item.alt || "Speaker Image"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lower Section - Text */}
              <div className="py-4 px-3 text-center bg-yellow-100">
                {item.name && (
                  <h3 className="text-lg md:text-2xl font-bold text-gray-900">
                    {item.name}
                  </h3>
                )}
                {item.position && (
                  <p className="text-sm md:text-base text-gray-600 mt-1">
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
