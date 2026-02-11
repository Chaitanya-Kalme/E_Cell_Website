"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const AtomicImpactEffect = ({ className }: { className?: string }) => {
  const centerX = 720;
  const centerY = 500;
  const spiralX = 1100;

  return (
    <div className={cn("relative h-screen w-full overflow-hidden bg-black", className)}>
      
      {/* CENTER ATOM */}
      <div className="absolute inset-0 flex items-center justify-center z-40">
        <motion.div
          className="w-6 h-6 rounded-full bg-blue-500 shadow-[0_0_60px_rgba(59,130,246,0.9)]"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.6, 1] }}
          transition={{ delay: 4, duration: 1 }}
        />
      </div>

      <svg
        width="1440"
        height="1000"
        viewBox="0 0 1440 1000"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Spiral Metallic Gradient */}
          <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#8B5A00" />
          </linearGradient>
        </defs>

        {/* SLOW PROTON */}
        <motion.circle
          cx={0}
          cy={centerY}
          r="6"
          fill="#ffffff"
          filter="url(#strongGlow)"
          initial={{ cx: 0 }}
          animate={{ cx: centerX }}
          transition={{
            duration: 4,
            ease: "easeInOut",
          }}
        />

        {/* VERTICAL LIGHT WAVE FROM RIGHT */}
        <motion.rect
          x={spiralX - 5}
          y="0"
          width="10"
          height="1000"
          fill="url(#metalGrad)"
          filter="url(#strongGlow)"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{
            delay: 4,
            duration: 1.5,
            ease: "easeOut",
          }}
          style={{ originY: 0 }}
        />

        {/* SPIRAL RIBBON FORMATION */}
        <motion.path
          d={`
            M ${spiralX} 200
            C ${spiralX + 80} 300, ${spiralX - 80} 400, ${spiralX} 500
            C ${spiralX + 80} 600, ${spiralX - 80} 700, ${spiralX} 800
          `}
          stroke="url(#metalGrad)"
          strokeWidth="40"
          fill="none"
          filter="url(#strongGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            delay: 5.5,
            duration: 2.5,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
};
