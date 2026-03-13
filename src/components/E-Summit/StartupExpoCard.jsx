"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Building2, Users, MapPin, Star, Award, Globe, X } from "lucide-react";

// ─── Color map ────────────────────────────────────────────────────────────────
const COLOR_MAP = {
  orange: {
    glow: "rgba(251,146,60,0.4)",
    accent: "#fb923c",
    header: "linear-gradient(135deg,#1c0f05 0%,#7c2d12 50%,#c2410c 100%)",
    fee: "rgba(251,146,60,0.12)",
    feeBorder: "rgba(251,146,60,0.35)",
    feeText: "#fb923c",
    btn: "#fb923c",
    corner: "rgba(251,146,60,0.4)",
    stripe: "linear-gradient(90deg,#ea580c,#f97316,#fb923c)",
    dot: "#fb923c",
    statusBg: "rgba(251,146,60,0.18)",
    statusBorder: "rgba(251,146,60,0.3)",
    locationBg: "rgba(251,146,60,0.12)",
    locationBorder: "rgba(251,146,60,0.35)",
    industryColor: "rgba(251,146,60,0.85)",
    iconBg: "rgba(251,146,60,0.15)",
    iconGlyph: "🌱",
  },
  blue: {
    glow: "rgba(56,189,248,0.4)",
    accent: "#38bdf8",
    header: "linear-gradient(135deg,#020e1c 0%,#0c4a6e 50%,#0369a1 100%)",
    fee: "rgba(56,189,248,0.12)",
    feeBorder: "rgba(56,189,248,0.35)",
    feeText: "#38bdf8",
    btn: "#38bdf8",
    corner: "rgba(56,189,248,0.4)",
    stripe: "linear-gradient(90deg,#0284c7,#0ea5e9,#38bdf8)",
    dot: "#38bdf8",
    statusBg: "rgba(56,189,248,0.18)",
    statusBorder: "rgba(56,189,248,0.3)",
    locationBg: "rgba(56,189,248,0.12)",
    locationBorder: "rgba(56,189,248,0.35)",
    industryColor: "rgba(56,189,248,0.85)",
    iconBg: "rgba(56,189,248,0.15)",
    iconGlyph: "🏥",
  },
  purple: {
    glow: "rgba(167,139,250,0.4)",
    accent: "#a78bfa",
    header: "linear-gradient(135deg,#0d0520 0%,#4c1d95 50%,#6d28d9 100%)",
    fee: "rgba(167,139,250,0.12)",
    feeBorder: "rgba(167,139,250,0.35)",
    feeText: "#a78bfa",
    btn: "#a78bfa",
    corner: "rgba(167,139,250,0.4)",
    stripe: "linear-gradient(90deg,#7c3aed,#8b5cf6,#a78bfa)",
    dot: "#a78bfa",
    statusBg: "rgba(167,139,250,0.18)",
    statusBorder: "rgba(167,139,250,0.3)",
    locationBg: "rgba(167,139,250,0.12)",
    locationBorder: "rgba(167,139,250,0.35)",
    industryColor: "rgba(167,139,250,0.85)",
    iconBg: "rgba(167,139,250,0.15)",
    iconGlyph: "🤖",
  },
  green: {
    glow: "rgba(52,211,153,0.4)",
    accent: "#34d399",
    header: "linear-gradient(135deg,#021207 0%,#064e3b 50%,#047857 100%)",
    fee: "rgba(52,211,153,0.12)",
    feeBorder: "rgba(52,211,153,0.35)",
    feeText: "#34d399",
    btn: "#34d399",
    corner: "rgba(52,211,153,0.4)",
    stripe: "linear-gradient(90deg,#059669,#10b981,#34d399)",
    dot: "#34d399",
    statusBg: "rgba(52,211,153,0.18)",
    statusBorder: "rgba(52,211,153,0.3)",
    locationBg: "rgba(52,211,153,0.12)",
    locationBorder: "rgba(52,211,153,0.35)",
    industryColor: "rgba(52,211,153,0.85)",
    iconBg: "rgba(52,211,153,0.15)",
    iconGlyph: "💰",
  },
};

// ─── Noise texture ────────────────────────────────────────────────────────────
const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

// ─── Global styles ─────────────────────────────────────────────────────────────
const STARTUP_CARD_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  .sc-card {
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
  .sc-card:hover { transform: translateY(-8px) scale(1.016); }

  .sc-card::after {
    content: '';
    position: absolute;
    left: 0; right: 0; top: 180px;
    height: 1px;
    background: repeating-linear-gradient(to right,transparent 0,transparent 6px,rgba(255,255,255,0.07) 6px,rgba(255,255,255,0.07) 12px);
    pointer-events: none;
    z-index: 2;
  }

  .sc-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.09) 50%,transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.65s ease;
    z-index: 4;
  }
  .sc-card:hover .sc-header::before { transform: translateX(100%); }

  .sc-header {
    position: relative;
    height: 180px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .sc-header-noise {
    position: absolute;
    inset: 0;
    opacity: 0.32;
    background-image: ${NOISE_BG};
    background-size: 180px 180px;
    z-index: 1;
  }

  /* Geometric pattern overlay for visual interest */
  .sc-header-pattern {
    position: absolute;
    inset: 0;
    z-index: 2;
    overflow: hidden;
  }

  /* Logo icon container - no broken img */
  .sc-logo-icon {
    position: absolute;
    bottom: 14px; left: 16px;
    width: 50px; height: 50px;
    border-radius: 10px;
    overflow: hidden;
    z-index: 5;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
    border: 2px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    backdrop-filter: blur(8px);
  }
  .sc-card:hover .sc-logo-icon { transform: scale(1.1) rotate(-3deg); }

  .sc-status {
    position: absolute;
    top: 13px; left: 13px;
    display: flex; align-items: center; gap: 5px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    z-index: 5; backdrop-filter: blur(8px);
  }
  .sc-dot { width: 5px; height: 5px; border-radius: 50%; animation: pulse-dot 2s infinite; }
  @keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 4px currentColor; }
    50% { box-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
  }

  .sc-category {
    position: absolute;
    top: 14px; right: 14px;
    font-size: 9px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(255,255,255,0.5); z-index: 5;
  }

  .sc-year {
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

  .sc-accent { height: 2px; flex-shrink: 0; }

  .sc-corner-tl, .sc-corner-br {
    position: absolute;
    width: 16px; height: 16px;
    z-index: 6; pointer-events: none;
  }
  .sc-corner-tl { top: 0; left: 0; border-top: 2px solid; border-left: 2px solid; border-radius: 0 0 4px 0; }
  .sc-corner-br { bottom: 0; right: 0; border-bottom: 2px solid; border-right: 2px solid; border-radius: 4px 0 0 0; }

  .sc-body {
    padding: 18px 18px 20px;
    display: flex; flex-direction: column;
    flex: 1;
  }
  .sc-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px; letter-spacing: 0.04em;
    color: #f0f4ff; line-height: 1.1;
    margin-bottom: 6px;
  }
  .sc-industry {
    font-size: 12px;
    font-weight: 500; margin-bottom: 14px;
  }
  .sc-meta { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; flex: 1; }
  .sc-meta-row {
    display: flex; align-items: center; gap: 7px;
    font-size: 11.5px; color: rgba(180,192,220,0.68);
  }
  .sc-divider {
    height: 1px; background: rgba(255,255,255,0.05);
    margin-bottom: 14px;
  }
  .sc-footer { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .sc-location {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 15px; letter-spacing: 0.06em;
    padding: 6px 14px; border-radius: 999px; border: 1px solid;
  }
  .sc-btn {
    font-size: 11px; font-weight: 500; letter-spacing: 0.04em;
    padding: 7px 13px; border-radius: 8px; border: none;
    cursor: pointer; color: #080c14;
    display: flex; align-items: center; gap: 5px;
    transition: opacity 0.2s, transform 0.15s;
    white-space: nowrap;
  }
  .sc-btn:hover { opacity: 0.85; transform: scale(0.97); }
  .sc-btn svg { transition: transform 0.2s; }
  .sc-btn:hover svg { transform: translateX(3px); }
`;

let startupStylesInjected = false;
function injectStartupStyles() {
  if (startupStylesInjected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.textContent = STARTUP_CARD_STYLES;
  document.head.appendChild(style);
  startupStylesInjected = true;
}

// ─── SVG pattern for header background ────────────────────────────────────────
function HeaderPattern({ color }) {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}
      viewBox="0 0 400 180"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={`grid-${color}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={color} strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="400" height="180" fill={`url(#grid-${color})`}/>
      <circle cx="320" cy="40" r="60" fill={color} opacity="0.15"/>
      <circle cx="60" cy="150" r="80" fill={color} opacity="0.1"/>
      <path d="M0 90 Q100 40 200 90 T400 90" stroke={color} strokeWidth="1" fill="none" opacity="0.4"/>
    </svg>
  );
}

// ─── Close icon ───────────────────────────────────────────────────────────────
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

// ─── Meta icons ───────────────────────────────────────────────────────────────
const BuildingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(140,160,200,0.8)" strokeWidth="1.4">
    <rect x="2" y="2" width="12" height="12" rx="1"/><path d="M2 6h12M6 2v12M10 2v12"/>
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

// ─── Modal header (no broken image) ──────────────────────────────────────────
function ModalHeader({ startup, col, id, onClose }) {
  return (
    <motion.div
      layoutId={`header-${startup.startupName}-${id}`}
      className="flex-none relative overflow-hidden"
      style={{ minHeight: 220 }}
    >
      {/* Rich gradient background */}
      <div style={{ position: "absolute", inset: 0, background: col.header }}/>
      {/* Noise */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.2,
        backgroundImage: NOISE_BG, backgroundSize: "180px 180px",
      }}/>
      {/* Pattern */}
      <HeaderPattern color={col.accent}/>
      {/* Big glyph watermark */}
      <div style={{
        position: "absolute", right: 24, bottom: 0,
        fontSize: 120, opacity: 0.07, lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
      }}>
        {col.iconGlyph}
      </div>

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <span style={{
            padding: "4px 12px", borderRadius: 999,
            background: col.statusBg, backdropFilter: "blur(8px)",
            fontSize: 11, fontWeight: 600, color: col.accent,
            letterSpacing: "0.08em", textTransform: "uppercase",
            border: `1px solid ${col.statusBorder}`,
          }}>
            {startup.industry}
          </span>
          <button
            onClick={onClose}
            className="hidden lg:flex p-2 rounded-lg transition-colors hover:bg-white/20"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <motion.h3
          layoutId={`title-${startup.startupName}-${id}`}
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 42, letterSpacing: "0.04em",
            color: "#fff", marginBottom: 12, lineHeight: 1.1,
            textShadow: `0 0 20px ${col.glow}`,
          }}
        >
          {startup.startupName}
        </motion.h3>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 15, lineHeight: 1.6 }}>
          {startup.description}
        </p>
      </div>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 3, background: col.stripe,
      }}/>
    </motion.div>
  );
}

// ─── Auto color assignment (cycles through palette if no color field set) ─────
const COLOR_KEYS = ["orange", "blue", "purple", "green"];

// ─── Main component ───────────────────────────────────────────────────────────
export function ExpandableStartupExpoCards({ startups }) {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => { injectStartupStyles(); }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setActive(false); };
    document.body.style.overflow = active && typeof active === "object" ? "hidden" : "auto";
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

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
        {active && typeof active === "object" && (() => {
          const activeIndex = startups.findIndex(s => s.startupName === active.startupName);
          const col = COLOR_MAP[active.color || COLOR_KEYS[activeIndex % COLOR_KEYS.length]];
          return (
            <div className="fixed inset-0 grid place-items-center z-[110] p-4 mt-16">
              <motion.button
                key={`btn-${active.startupName}-${id}`} layout
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-6 right-6 lg:hidden items-center justify-center bg-gray-800/90 backdrop-blur-sm rounded-full h-10 w-10 z-10 hover:bg-gray-700 transition-colors"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>

              <motion.div
                layoutId={`card-${active.startupName}-${id}`} ref={ref}
                className="w-full max-w-[900px] max-h-[90vh] flex flex-col rounded-3xl overflow-hidden m-4 shadow-2xl"
                style={{
                  background: "linear-gradient(135deg,#0a0f1e 0%,#111827 60%,#0a0f1e 100%)",
                  border: `1px solid ${col.accent}40`,
                  boxShadow: `0 30px 80px ${col.glow}`,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <ModalHeader startup={active} col={col} id={id} onClose={() => setActive(null)} />

                <div className="p-6 flex-1 flex flex-col min-h-0 overflow-y-auto">
                  <motion.div
                    layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { icon: <Building2 size={18} style={{ color: col.accent, flexShrink: 0 }}/>, label: "Founded", value: active.foundedYear },
                        { icon: <Users size={18} style={{ color: col.accent, flexShrink: 0 }}/>, label: "Team Size", value: active.teamSize },
                        { icon: <MapPin size={18} style={{ color: col.accent, flexShrink: 0 }}/>, label: "Location", value: active.location, span: true },
                      ].map(({ icon, label, value, span }) => (
                        <div
                          key={label}
                          className={`flex items-center gap-2 p-3 rounded-xl${span ? " col-span-2 md:col-span-1" : ""}`}
                          style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${col.accent}25` }}
                        >
                          {icon}
                          <div>
                            <div style={{ fontSize: 11, color: "rgba(180,192,220,0.55)", marginBottom: 2 }}>{label}</div>
                            <div style={{ fontSize: 13, color: "#e8edf8", fontWeight: 500 }}>{value}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {active.achievements?.length > 0 && (
                      <div className="rounded-xl p-4" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)" }}>
                        <div className="flex items-center gap-2 mb-3">
                          <Award size={18} style={{ color: "#fbbf24" }}/>
                          <span style={{ fontSize: 13, fontWeight: 500, color: "#fbbf24" }}>Achievements & Awards</span>
                        </div>
                        <ul className="space-y-2">
                          {active.achievements.map((h, i) => (
                            <li key={i} className="flex items-start gap-2" style={{ fontSize: 13, color: "rgba(200,215,245,0.85)" }}>
                              <span style={{ color: col.accent, marginTop: 2 }}>✓</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {active.contact && (
                        <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${col.accent}20` }}>
                          <div className="flex items-center gap-2 mb-2">
                            <Star size={18} style={{ color: col.accent }}/>
                            <span style={{ fontSize: 12, fontWeight: 500, color: col.accent }}>Contact</span>
                          </div>
                          <p style={{ fontSize: 13, color: "#f0f4ff" }}>{active.contact}</p>
                        </div>
                      )}
                      {active.website && (
                        <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${col.accent}20` }}>
                          <div className="flex items-center gap-2 mb-2">
                            <Globe size={18} style={{ color: col.accent }}/>
                            <span style={{ fontSize: 12, fontWeight: 500, color: col.accent }}>Website</span>
                          </div>
                          <a href={active.website} target="_blank" rel="noopener noreferrer"
                            style={{ fontSize: 13, color: col.accent, textDecoration: "underline" }}>
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>

                    {active.website && (
                      <div className="pt-2">
                        <button
                          onClick={() => window.open(active.website, "_blank")}
                          className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-opacity hover:opacity-90"
                          style={{
                            background: col.stripe,
                            color: "#fff",
                            fontFamily: "'DM Sans',sans-serif",
                            letterSpacing: "0.02em",
                            boxShadow: `0 8px 30px ${col.glow}`,
                          }}
                        >
                          Visit Website
                          <Globe size={20}/>
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

      {/* ── Card grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {startups.map((startup, index) => {
          const col = COLOR_MAP[startup.color || COLOR_KEYS[index % COLOR_KEYS.length]];
          return (
            <motion.div
              layoutId={`card-${startup.startupName}-${id}`}
              key={`card-${startup.startupName}-${id}`}
              onClick={() => setActive(startup)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="sc-card"
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 20px 60px ${col.glow}`; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Corner brackets */}
              <div className="sc-corner-tl" style={{ borderColor: col.corner }}/>
              <div className="sc-corner-br" style={{ borderColor: col.corner }}/>

              {/* ── Header ── */}
              <motion.div
                layoutId={`header-${startup.startupName}-${id}`}
                className="sc-header"
                style={{ background: col.header }}
              >
                <div className="sc-header-noise"/>
                <HeaderPattern color={col.accent}/>

                {/* Watermark glyph */}
                <div style={{
                  position: "absolute", right: 12, top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 80, opacity: 0.08, lineHeight: 1,
                  userSelect: "none", pointerEvents: "none", zIndex: 1,
                }}>
                  {col.iconGlyph}
                </div>

                <div className="sc-status" style={{
                  background: col.statusBg,
                  color: col.accent,
                  border: `1px solid ${col.statusBorder}`,
                }}>
                  <span className="sc-dot" style={{ background: col.dot, color: col.dot }}/>
                  Startup
                </div>
                <div className="sc-category">{startup.industry}</div>

                {/* Icon badge instead of broken image */}
                <div className="sc-logo-icon" style={{
                  background: col.iconBg,
                  borderColor: `${col.accent}40`,
                }}>
                  {col.iconGlyph}
                </div>

                <div className="sc-year">{startup.foundedYear}</div>
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  height: 3, background: col.stripe, zIndex: 3,
                }}/>
              </motion.div>

              {/* ── Accent divider ── */}
              <div className="sc-accent" style={{ background: col.stripe }}/>

              {/* ── Body ── */}
              <div className="sc-body">
                <motion.h3
                  layoutId={`title-${startup.startupName}-${id}`}
                  className="sc-title"
                >
                  {startup.startupName}
                </motion.h3>
                <p className="sc-industry" style={{ color: col.industryColor }}>{startup.industry}</p>

                <div className="sc-meta">
                  <div className="sc-meta-row"><BuildingIcon/>Founded {startup.foundedYear}</div>
                  <div className="sc-meta-row"><UsersIconSm/>{startup.teamSize} team</div>
                  <div className="sc-meta-row"><PinIcon/>{startup.location}</div>
                </div>

                <div className="sc-divider"/>

                <div className="sc-footer">
                  <div className="sc-location" style={{
                    background: col.locationBg,
                    borderColor: col.locationBorder,
                    color: col.accent,
                  }}>
                    {startup.location.split(",")[0]}
                  </div>
                  <button
                    className="sc-btn"
                    style={{ background: col.btn }}
                    onClick={e => { e.stopPropagation(); setActive(startup); }}
                  >
                    Explore
                    <ArrowRightSm/>
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

const StartupExpoCard = ({ startups }) => <ExpandableStartupExpoCards startups={startups} />;
export default StartupExpoCard;

