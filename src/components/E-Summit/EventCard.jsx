"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Calendar, Clock, MapPin, Users, Trophy, Info, X, ArrowRight } from "lucide-react";
import EventRegistrationForm from "./EventRegistrationForm";

// ─── Accent color map ──────────────────────────────────────────────────────────
// Each event.color maps to a key here. You can still pass Tailwind gradient strings
// in event.color for the expanded modal; the card grid uses these CSS values.
const COLOR_MAP = {
  blue:  { glow: "rgba(56,139,253,0.4)",  accent: "#58a6ff", header: "linear-gradient(135deg,#0f2042 0%,#1a4080 50%,#1d6bb5 100%)", fee: "rgba(56,139,253,0.12)",  feeBorder: "rgba(88,166,255,0.35)",  feeText: "#58a6ff",  btn: "#58a6ff",  corner: "rgba(88,166,255,0.4)",  stripe: "linear-gradient(90deg,#388bfd,#58a6ff,#79c0ff)" },
  amber: { glow: "rgba(245,158,11,0.4)",  accent: "#fbbf24", header: "linear-gradient(135deg,#1c1005 0%,#6b380d 50%,#a35c12 100%)", fee: "rgba(245,158,11,0.12)",  feeBorder: "rgba(251,191,36,0.35)",  feeText: "#fbbf24", btn: "#fbbf24", corner: "rgba(251,191,36,0.4)", stripe: "linear-gradient(90deg,#d97706,#f59e0b,#fbbf24)" },
  green: { glow: "rgba(34,197,94,0.4)",   accent: "#34d399", header: "linear-gradient(135deg,#021a09 0%,#0a4a1c 50%,#0f7a2e 100%)", fee: "rgba(52,211,153,0.12)",  feeBorder: "rgba(52,211,153,0.35)",  feeText: "#34d399", btn: "#34d399", corner: "rgba(52,211,153,0.4)", stripe: "linear-gradient(90deg,#059669,#10b981,#34d399)" },
  rose:  { glow: "rgba(244,63,94,0.4)",   accent: "#fb7185", header: "linear-gradient(135deg,#1a0511 0%,#6b0f2e 50%,#a31446 100%)", fee: "rgba(251,113,133,0.12)", feeBorder: "rgba(251,113,133,0.35)", feeText: "#fb7185", btn: "#fb7185", corner: "rgba(251,113,133,0.4)", stripe: "linear-gradient(90deg,#e11d48,#f43f5e,#fb7185)" },
  purple:{ glow: "rgba(139,92,246,0.4)",  accent: "#a78bfa", header: "linear-gradient(135deg,#130d2e 0%,#3b1f6e 50%,#5b33a8 100%)", fee: "rgba(167,139,250,0.12)", feeBorder: "rgba(167,139,250,0.35)", feeText: "#a78bfa", btn: "#a78bfa", corner: "rgba(167,139,250,0.4)", stripe: "linear-gradient(90deg,#7c3aed,#8b5cf6,#a78bfa)" },
  cyan:  { glow: "rgba(6,182,212,0.4)",   accent: "#22d3ee", header: "linear-gradient(135deg,#021a20 0%,#0a4a5c 50%,#0e7a8c 100%)", fee: "rgba(34,211,238,0.12)",  feeBorder: "rgba(34,211,238,0.35)",  feeText: "#22d3ee", btn: "#22d3ee", corner: "rgba(34,211,238,0.4)",  stripe: "linear-gradient(90deg,#0891b2,#06b6d4,#22d3ee)" },
};

// Derive a color key from the event.color string (Tailwind gradient or plain key)
function resolveColorKey(colorStr = "") {
  if (COLOR_MAP[colorStr]) return colorStr;
  if (colorStr.includes("blue"))   return "blue";
  if (colorStr.includes("amber") || colorStr.includes("yellow") || colorStr.includes("orange")) return "amber";
  if (colorStr.includes("green") || colorStr.includes("emerald") || colorStr.includes("teal"))  return "green";
  if (colorStr.includes("rose") || colorStr.includes("pink") || colorStr.includes("red"))       return "rose";
  if (colorStr.includes("purple") || colorStr.includes("violet") || colorStr.includes("indigo")) return "purple";
  if (colorStr.includes("cyan") || colorStr.includes("sky")) return "cyan";
  return "blue";
}

// ─── Noise texture (inline SVG data-uri, no external assets needed) ───────────
const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

// ─── Global card styles (injected once) ───────────────────────────────────────
const CARD_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  .ec-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    background: #0d1220;
    border: 1px solid rgba(255,255,255,0.07);
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
    font-family: 'DM Sans', sans-serif;
  }
  .ec-card:hover { transform: translateY(-8px) scale(1.016); }

  /* ticket perforation */
  .ec-card::after {
    content: '';
    position: absolute;
    left: 0; right: 0; top: 180px;
    height: 1px;
    background: repeating-linear-gradient(to right,transparent 0,transparent 6px,rgba(255,255,255,0.07) 6px,rgba(255,255,255,0.07) 12px);
    pointer-events: none;
    z-index: 2;
  }

  /* light-sweep shimmer */
  .ec-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.09) 50%,transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.65s ease;
    z-index: 4;
  }
  .ec-card:hover .ec-header::before { transform: translateX(100%); }

  .ec-header {
    position: relative;
    height: 180px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .ec-header-noise {
    position: absolute;
    inset: 0;
    opacity: 0.32;
    background-image: ${NOISE_BG};
    background-size: 180px 180px;
    z-index: 1;
  }

  .ec-status {
    position: absolute;
    top: 13px; left: 13px;
    display: flex; align-items: center; gap: 5px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    z-index: 5; backdrop-filter: blur(8px);
  }
  .ec-status-open  { background: rgba(34,197,94,0.18); color: #4ade80; border: 1px solid rgba(74,222,128,0.3); }
  .ec-status-closed{ background: rgba(244,63,94,0.18);  color: #fb7185; border: 1px solid rgba(251,113,133,0.3); }
  .ec-dot { width: 5px; height: 5px; border-radius: 50%; }
  .ec-dot-open  { background: #4ade80; box-shadow: 0 0 6px #4ade80; animation: ec-pulse 2s infinite; }
  .ec-dot-closed{ background: #fb7185; }
  @keyframes ec-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

  .ec-category {
    position: absolute;
    top: 14px; right: 14px;
    font-size: 9px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(255,255,255,0.5); z-index: 5;
  }
  .ec-icon {
    position: absolute;
    bottom: 14px; left: 16px;
    font-size: 44px; line-height: 1;
    filter: drop-shadow(0 4px 16px rgba(0,0,0,0.5));
    z-index: 5;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
    user-select: none;
  }
  .ec-card:hover .ec-icon { transform: scale(1.15) rotate(-5deg); }

  .ec-prize {
    position: absolute;
    bottom: 18px; right: 13px; z-index: 5;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 13px; letter-spacing: 0.08em;
    color: rgba(255,255,255,0.9);
    background: rgba(0,0,0,0.38);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 6px; padding: 3px 9px;
    backdrop-filter: blur(4px);
  }

  .ec-accent { height: 2px; flex-shrink: 0; }

  /* corner brackets */
  .ec-corner-tl, .ec-corner-br {
    position: absolute;
    width: 16px; height: 16px;
    z-index: 6; pointer-events: none;
  }
  .ec-corner-tl { top: 0; left: 0; border-top: 2px solid; border-left: 2px solid; border-radius: 0 0 4px 0; }
  .ec-corner-br { bottom: 0; right: 0; border-bottom: 2px solid; border-right: 2px solid; border-radius: 4px 0 0 0; }

  .ec-body {
    padding: 18px 18px 20px;
    display: flex; flex-direction: column;
    flex: 1;
  }
  .ec-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px; letter-spacing: 0.04em;
    color: #f0f4ff; line-height: 1.1;
    margin-bottom: 6px;
  }
  .ec-desc {
    font-size: 12px; color: rgba(180,192,220,0.72);
    line-height: 1.55; margin-bottom: 14px; flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .ec-meta { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
  .ec-meta-row {
    display: flex; align-items: center; gap: 7px;
    font-size: 11.5px; color: rgba(180,192,220,0.68);
  }
  .ec-divider {
    height: 1px; background: rgba(255,255,255,0.05);
    margin-bottom: 14px;
  }
  .ec-footer { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .ec-fee {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 15px; letter-spacing: 0.06em;
    padding: 6px 14px; border-radius: 999px; border: 1px solid;
  }
  .ec-btn {
    font-size: 11px; font-weight: 500; letter-spacing: 0.04em;
    padding: 7px 13px; border-radius: 8px; border: none;
    cursor: pointer; color: #080c14;
    display: flex; align-items: center; gap: 5px;
    transition: opacity 0.2s, transform 0.15s;
    white-space: nowrap;
  }
  .ec-btn:hover { opacity: 0.85; transform: scale(0.97); }
  .ec-btn-disabled { opacity: 0.45 !important; cursor: not-allowed !important; transform: none !important; }
  .ec-btn svg { transition: transform 0.2s; }
  .ec-btn:not(.ec-btn-disabled):hover svg { transform: translateX(3px); }
`;

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.textContent = CARD_STYLES;
  document.head.appendChild(style);
  stylesInjected = true;
}

// ─── Close icon for modal ──────────────────────────────────────────────────────
const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="h-4 w-4 text-white"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" /><path d="M6 6l12 12" />
  </motion.svg>
);

// ─── Meta icon helpers ─────────────────────────────────────────────────────────
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(140,160,200,0.8)" strokeWidth="1.4">
    <rect x="2" y="3" width="12" height="11" rx="2"/><path d="M5 1v4M11 1v4M2 7h12"/>
  </svg>
);
const ClockIconSm = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(140,160,200,0.8)" strokeWidth="1.4">
    <circle cx="8" cy="8" r="6"/><path d="M8 5v3.5l2 2"/>
  </svg>
);
const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(140,160,200,0.8)" strokeWidth="1.4">
    <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.5-2-4.5-4.5-4.5z"/>
    <circle cx="8" cy="6" r="1.5"/>
  </svg>
);
const UsersIconSm = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(140,160,200,0.8)" strokeWidth="1.4">
    <circle cx="6" cy="5" r="2.5"/><path d="M1.5 13.5a4.5 4.5 0 019 0"/>
    <circle cx="12" cy="5.5" r="2"/><path d="M14.5 13.5a3 3 0 00-4.5-2.6"/>
  </svg>
);
const ArrowRightSm = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 6h8M6 2l4 4-4 4"/>
  </svg>
);

// ─── Unstop links ──────────────────────────────────────────────────────────────
const UNSTOP_LINKS = {
  "gtm-war":       "https://unstop.com/competitions/gtm-go-to-market-strategy-war-e-summit-2026-indian-institute-of-technology-iit-ropar-1654640",
  "startup-sprint": "https://unstop.com/competitions/startup-sprint-e-summit-2026-indian-institute-of-technology-iit-ropar-1654591",
  "pitch-120":     "https://unstop.com/competitions/pitch-120-e-summit-2026-indian-institute-of-technology-iit-ropar-1654618",
  "mun":         "https://unstop.com/p/lok-sabha-mun-e-summit-2026-indian-institute-of-technology-iit-ropar-1656192",
   "ipl-auction": "https://unstop.com/p/ipl-auction-house-e-summit-2026-indian-institute-of-technology-iit-ropar-1657501",
 "pitch-120": "https://unstop.com/competitions/pitch-120-e-summit-2026-indian-institute-of-technology-iit-ropar-1654618",
  "consulting-case-competition": "https://unstop.com/p/consulting-case-competition-e-summit-2026-indian-institute-of-technology-iit-ropar-1656808",
   "ccb-mun": "https://unstop.com/competitions/corporations-crisis-board-mun-e-summit-2026-indian-institute-of-technology-iit-ropar-1664002",


};

// ─── Team size label helper ────────────────────────────────────────────────────



function teamLabel({ min, max }) {
  if (min === max) return `${min} member${min > 1 ? "s" : ""}`;
  return `${min}–${max} members`;
}

// ─── Main component ────────────────────────────────────────────────────────────
export function ExpandableEventCards({ events }) {
  const [active, setActive]               = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const id  = useId();
  const ref = useRef(null);

  // Inject global card styles once on mount
  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { setShowRegistration(false); setActive(false); }
    };
    document.body.style.overflow = active && typeof active === "object" ? "hidden" : "auto";
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  useOutsideClick(ref, () => { if (!showRegistration) setActive(null); });

  const handleRegisterClick = (e) => {
    e.stopPropagation();
    if (active?.id && UNSTOP_LINKS[active.id]) {
      window.open(UNSTOP_LINKS[active.id], "_blank");
    } else {
      setShowRegistration(true);
    }
  };

  return (
    <div className="relative z-10">
      {/* ── Backdrop ── */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm h-full w-full z-[100]"
          />
        )}
      </AnimatePresence>

      {/* ── Expanded modal ── */}
      <AnimatePresence>
        {active && typeof active === "object" && !showRegistration && (() => {
          const ck  = resolveColorKey(active.color);
          const col = COLOR_MAP[ck];
          return (
            <div className="fixed inset-0 grid place-items-center z-[110] p-4 mt-16">
              {/* Mobile close */}
              <motion.button
                key={`btn-${active.title}-${id}`} layout
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-6 right-6 lg:hidden items-center justify-center bg-gray-800/90 backdrop-blur-sm rounded-full h-10 w-10 z-10 hover:bg-gray-700 transition-colors"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>

              <motion.div
                layoutId={`card-${active.id}-${id}`} ref={ref}
                className="w-full max-w-[900px] max-h-[90vh] flex flex-col rounded-3xl overflow-hidden m-4 shadow-2xl"
                style={{
                  background: "linear-gradient(135deg,#0a0f1e 0%,#111827 60%,#0a0f1e 100%)",
                  border: `1px solid ${col.accent}40`,
                  boxShadow: `0 30px 80px ${col.glow}`,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Modal header */}
                <motion.div
                  layoutId={`header-${active.id}-${id}`}
                  className="flex-none p-6 relative overflow-hidden"
                  style={{ background: col.header, minHeight: 160 }}
                >
                  {/* noise */}
                  <div style={{
                    position:"absolute", inset:0, opacity:0.3,
                    backgroundImage: NOISE_BG, backgroundSize:"180px 180px",
                  }}/>
                  <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.15)" }}/>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span style={{ fontSize:52, lineHeight:1, filter:"drop-shadow(0 4px 16px rgba(0,0,0,0.5))" }}>
                          {active.icon}
                        </span>
                        <span style={{
                          padding:"4px 12px", borderRadius:999,
                          background:"rgba(255,255,255,0.18)", backdropFilter:"blur(8px)",
                          fontSize:11, fontWeight:600, color:"#fff",
                          letterSpacing:"0.08em", textTransform:"uppercase",
                        }}>
                          {active.category}
                        </span>
                      </div>
                      <button
                        onClick={() => setActive(null)}
                        className="hidden lg:flex p-2 rounded-lg transition-colors hover:bg-white/20"
                      >
                        <X className="w-6 h-6 text-white" />
                      </button>
                    </div>
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      style={{
                        fontFamily:"'Bebas Neue',sans-serif",
                        fontSize:36, letterSpacing:"0.04em",
                        color:"#fff", marginBottom:8, lineHeight:1.1,
                      }}
                    >
                      {active.title}
                    </motion.h3>
                    <p style={{ color:"rgba(255,255,255,0.85)", fontSize:14, lineHeight:1.6 }}>
                      {active.description}
                    </p>
                  </div>
                  {/* accent stripe bottom of header */}
                  <div style={{
                    position:"absolute", bottom:0, left:0, right:0,
                    height:3, background:col.stripe,
                  }}/>
                </motion.div>

                {/* Modal content */}
                <div className="p-6 flex-1 flex flex-col min-h-0 overflow-y-auto">
                  <motion.div
                    layout initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                    transition={{ duration:0.15 }}
                    className="space-y-4"
                  >
                    {/* Details grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { icon: <Calendar size={18} style={{ color: col.accent, flexShrink:0 }}/>, label:"Date",  value: active.date,  bg:"rgba(255,255,255,0.04)", border:`${col.accent}25` },
                        { icon: <Clock     size={18} style={{ color: col.accent, flexShrink:0 }}/>, label:"Time",  value: active.time,  bg:"rgba(255,255,255,0.04)", border:`${col.accent}25` },
                        { icon: <MapPin    size={18} style={{ color: col.accent, flexShrink:0 }}/>, label:"Venue", value: active.venue, bg:"rgba(255,255,255,0.04)", border:`${col.accent}25`, span:true },
                      ].map(({ icon, label, value, bg, border, span }) => (
                        <div
                          key={label}
                          className={`flex items-center gap-2 p-3 rounded-xl${span ? " col-span-2 md:col-span-1" : ""}`}
                          style={{ background:bg, border:`1px solid ${border}` }}
                        >
                          {icon}
                          <div>
                            <div style={{ fontSize:11, color:"rgba(180,192,220,0.55)", marginBottom:2 }}>{label}</div>
                            <div style={{ fontSize:13, color:"#e8edf8", fontWeight:500 }}>{value}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Team & fee */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl p-4" style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${col.accent}20` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <Users size={18} style={{ color: col.accent }}/>
                          <span style={{ fontSize:12, fontWeight:500, color: col.accent }}>Team Size</span>
                        </div>
                        <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:"#f0f4ff", letterSpacing:"0.04em" }}>
                          {teamLabel(active.teamSize)}
                        </p>
                      </div>
                      <div className="rounded-xl p-4" style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${col.accent}20` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy size={18} style={{ color: col.accent }}/>
                          <span style={{ fontSize:12, fontWeight:500, color: col.accent }}>Registration</span>
                        </div>
                        <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:"#f0f4ff", letterSpacing:"0.04em" }}>
                          {active.registrationFee}
                        </p>
                      </div>
                    </div>

                    {/* Prizes */}
                    <div className="rounded-xl p-4" style={{ background:"rgba(251,191,36,0.06)", border:"1px solid rgba(251,191,36,0.2)" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy size={18} style={{ color:"#fbbf24" }}/>
                        <span style={{ fontSize:13, fontWeight:500, color:"#fbbf24" }}>Prizes & Rewards</span>
                      </div>
                      <p style={{ fontSize:13, color:"rgba(220,230,255,0.85)", lineHeight:1.6 }}>{active.prizes}</p>
                    </div>

                    {/* Highlights */}
                    {active.highlights?.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Info size={18} style={{ color: col.accent }}/>
                          <span style={{ fontSize:13, fontWeight:500, color: col.accent }}>Event Highlights</span>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {active.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 p-2 rounded-lg"
                              style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", fontSize:13, color:"rgba(200,215,245,0.85)" }}
                            >
                              <span style={{ color: col.accent, marginTop:2 }}>✓</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Register CTA */}
                    {active.isRegistrationOpen && (
                      <div className="pt-2">
                        <button
                          onClick={handleRegisterClick}
                          className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-opacity hover:opacity-90"
                          style={{
                            background: col.stripe,
                            color: "#fff",
                            fontFamily:"'DM Sans',sans-serif",
                            letterSpacing:"0.02em",
                            boxShadow:`0 8px 30px ${col.glow}`,
                          }}
                        >
                          Register Now
                          <ArrowRight size={20}/>
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* ── Registration form ── */}
      <AnimatePresence>
        {showRegistration && active && (
          <EventRegistrationForm
            event={active}
            isOpen={showRegistration}
            onClose={() => setShowRegistration(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Card grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event, index) => {
          const ck  = resolveColorKey(event.color);
          const col = COLOR_MAP[ck];
          return (
            <motion.div
              layoutId={`card-${event.id}-${id}`}
              key={`card-${event.id}-${id}`}
              onClick={() => setActive(event)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="ec-card"
              style={{ "--glow": col.glow }}
              onMouseEnter={e => {
                (e.currentTarget ).style.boxShadow = `0 20px 60px ${col.glow}`;
              }}
              onMouseLeave={e => {
                (e.currentTarget).style.boxShadow = "none";
              }}
            >
              {/* Corner brackets */}
              <div className="ec-corner-tl" style={{ borderColor: col.corner }}/>
              <div className="ec-corner-br" style={{ borderColor: col.corner }}/>

              {/* ── Header ── */}
              <motion.div
                layoutId={`header-${event.id}-${id}`}
                className="ec-header"
                style={{ background: col.header }}
              >
                <div className="ec-header-noise"/>
                <div className="ec-status" style={
                  event.isRegistrationOpen
                    ? { background:"rgba(34,197,94,0.18)", color:"#4ade80", border:"1px solid rgba(74,222,128,0.3)" }
                    : { background:"rgba(244,63,94,0.18)",  color:"#fb7185", border:"1px solid rgba(251,113,133,0.3)" }
                }>
                  <span
                    className="ec-dot"
                    style={
                      event.isRegistrationOpen
                        ? { background:"#4ade80", boxShadow:"0 0 6px #4ade80", animation:"ec-pulse 2s infinite" }
                        : { background:"#fb7185" }
                    }
                  />
                  {event.isRegistrationOpen ? "Open" : "Closed"}
                </div>
                <div className="ec-category">{event.category}</div>
                <motion.div layoutId={`title-icon-${event.id}-${id}`} className="ec-icon">
                  {event.icon}
                </motion.div>
                <div className="ec-prize">{event.prizes?.split(" ")[0] ?? "Prizes"}</div>
                {/* accent stripe */}
                <div style={{
                  position:"absolute", bottom:0, left:0, right:0,
                  height:3, background:col.stripe, zIndex:3,
                }}/>
              </motion.div>

              {/* ── Accent divider ── */}
              <div className="ec-accent" style={{ background: col.stripe }}/>

              {/* ── Body ── */}
              <div className="ec-body">
                <motion.h3
                  layoutId={`title-${event.id}-${id}`}
                  className="ec-title"
                >
                  {event.title}
                </motion.h3>
                <p className="ec-desc">{event.description}</p>

                <div className="ec-meta">
                  <div className="ec-meta-row"><CalendarIcon/>{event.date}</div>
                  <div className="ec-meta-row"><ClockIconSm/>{event.time}</div>
                  <div className="ec-meta-row"><UsersIconSm/>{teamLabel(event.teamSize)}</div>
                </div>

                <div className="ec-divider"/>

                <div className="ec-footer">
                  <div
                    className="ec-fee"
                    style={{ background:col.fee, borderColor:col.feeBorder, color:col.feeText }}
                  >
                    {event.registrationFee}
                  </div>
                  <button
                    className={`ec-btn${!event.isRegistrationOpen ? " ec-btn-disabled" : ""}`}
                    style={{ background: event.isRegistrationOpen ? col.btn : "rgba(255,255,255,0.12)", color: event.isRegistrationOpen ? "#080c14" : "rgba(200,200,200,0.5)" }}
                    onClick={e => { e.stopPropagation(); if (event.isRegistrationOpen) setActive(event); }}
                    disabled={!event.isRegistrationOpen}
                  >
                    {event.isRegistrationOpen ? "Explore" : "Closed"}
                    {event.isRegistrationOpen && <ArrowRightSm/>}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const EventCard = ({ events }) => <ExpandableEventCards events={events} />;
export default EventCard;