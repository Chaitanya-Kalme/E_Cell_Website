"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import FireCanvasLoader from "./FireCanvasLoader";
import type { PointerTarget } from "./FireCanvas";
import {
  BASE,
  EVENT_DATES,
  INSTITUTE_EN,
  INSTITUTE_HI,
  REGISTER_URL,
  VENUE,
  asset,
} from "@/context/E-Summit-27/constants";

/** Decide once, on the client, whether the WebGL canvas may run at all. */
function canRunCanvas(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if ((navigator.hardwareConcurrency ?? 4) <= 2) return false;
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext(); // free the probe context immediately
  } catch {
    return false;
  }
  return true;
}

const depth = (d: number) => ({ "--d": d }) as CSSProperties;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const pointer = useRef<PointerTarget>({ x: 0, y: 0 });
  const [canvasOn, setCanvasOn] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [mobile, setMobile] = useState(false);

  /* ---- mount the canvas after first paint, only if allowed ---- */
  useEffect(() => {
    if (!canRunCanvas()) return;
    setMobile(window.matchMedia("(pointer: coarse), (max-width: 767px)").matches);

    type IdleWin = Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const w = window as IdleWin;
    let idleId = 0;
    let timeoutId = 0;
    const mount = () => setCanvasOn(true);
    if (w.requestIdleCallback) idleId = w.requestIdleCallback(mount, { timeout: 2000 });
    else timeoutId = window.setTimeout(mount, 1200);
    return () => {
      if (idleId && w.cancelIdleCallback) w.cancelIdleCallback(idleId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  /* ---- pointer parallax → --px/--py CSS vars (rAF-throttled, lerped) ---- */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const cur = { x: 0, y: 0 };
    let raf = 0;
    let inView = true;

    const write = () => {
      hero.style.setProperty("--px", cur.x.toFixed(3));
      hero.style.setProperty("--py", cur.y.toFixed(3));
    };

    if (coarse) {
      // Touch: slow auto-drift, ~30 fps, only while the hero is visible.
      let t = 0;
      let frame = 0;
      const drift = () => {
        raf = requestAnimationFrame(drift);
        if (!inView || document.hidden || ++frame % 2) return;
        t += 0.033;
        cur.x = Math.sin(t * 0.35) * 0.5;
        cur.y = Math.cos(t * 0.27) * 0.35;
        pointer.current.x = cur.x;
        pointer.current.y = cur.y;
        write();
      };
      const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting));
      io.observe(hero);
      raf = requestAnimationFrame(drift);
      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
      };
    }

    // Mouse: the loop only runs until values settle, then sleeps.
    const step = () => {
      const tx = pointer.current.x;
      const ty = pointer.current.y;
      cur.x += (tx - cur.x) * 0.08;
      cur.y += (ty - cur.y) * 0.08;
      write();
      if (Math.abs(tx - cur.x) > 0.001 || Math.abs(ty - cur.y) > 0.001) {
        raf = requestAnimationFrame(step);
      } else {
        raf = 0;
      }
    };
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(step);
    };
    const onLeave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
      if (!raf) raf = requestAnimationFrame(step);
    };
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const handleReady = useCallback(() => setCanvasReady(true), []);
  const handleDisable = useCallback(() => {
    setCanvasReady(false);
    setCanvasOn(false); // unmount → full dispose; static poster remains
  }, []);

  return (
    <section ref={heroRef} className="e27-hero" aria-labelledby="e27-hero-title">
      {/* ---------- 3D stage (decorative) ---------- */}
      <div className="e27-stage" aria-hidden="true">
        <div className="e27-tilt">
          <div className="e27-glow" />

          <div className="e27-floor-wrap">
            <div className="e27-floor">
              <div className="e27-floor-track" />
            </div>
            <div className="e27-floor-fade" />
          </div>
          <div className="e27-horizon" />

          <div className="e27-canvas-layer" data-ready={canvasReady}>
            {canvasOn && (
              <FireCanvasLoader
                pointer={pointer}
                mobile={mobile}
                onReady={handleReady}
                onDisable={handleDisable}
              />
            )}
          </div>

          <div className="e27-bloom" />
        </div>
      </div>

      {/* ---------- corner logos (like the brochure cover) ---------- */}
      <div className="pointer-events-none absolute inset-x-0 top-20 z-10 mx-auto flex max-w-7xl items-start justify-between px-4 sm:px-6 lg:px-8">
        <img
          src={asset("ecell-logo.webp")}
          alt="E-Cell IIT Ropar"
          width={140}
          height={56}
          decoding="async"
          className="e27-rise h-9 w-auto opacity-90 sm:h-12"
        />
        <img
          src={asset("tbif-logo.webp")}
          alt="TBIF IIT Ropar"
          width={140}
          height={56}
          decoding="async"
          className="e27-rise h-9 w-auto opacity-90 sm:h-12"
        />
      </div>

      {/* ---------- content ---------- */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-4 pb-16 pt-32 text-center">
        <div className="e27-depth" style={depth(14)}>
          <div className="e27-ignite">
            <div className="e27-flame-glow">
              <img
                src={asset("flame-logo.webp")}
                alt=""
                width={347}
                height={551}
                fetchPriority="high"
                decoding="async"
                className="e27-flame-float h-[24vh] max-h-[280px] min-h-[150px] w-auto"
              />
            </div>
          </div>
        </div>

        <h1 id="e27-hero-title" className="sr-only">
          E-Summit&apos;27 — Igniting the Unwritten
        </h1>

        {/* The wordmark image already contains the "IGNITING THE UNWRITTEN" tagline. */}
        <div className="e27-depth mt-6" style={depth(8)}>
          <div className="e27-sweep e27-rise e27-delay-1">
            <img
              src={asset("esummit27-wordmark.webp")}
              alt="E-Summit 27 — Igniting the Unwritten"
              width={1218}
              height={219}
              fetchPriority="high"
              decoding="async"
              className="h-auto w-[min(88vw,620px)]"
            />
          </div>
        </div>

        <p className="e27-rise e27-delay-2 mt-6 text-[11px] font-medium tracking-[0.22em] text-white/70 sm:text-xs">
          {INSTITUTE_EN}
          <span className="mt-1 block tracking-[0.1em]">{INSTITUTE_HI}</span>
        </p>

        <div className="e27-rise e27-delay-3 mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-white/85">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--e27-line)] bg-[#050008]/60 px-4 py-2">
            <CalendarDays size={16} className="text-[var(--e27-magenta)]" aria-hidden="true" />
            {EVENT_DATES}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--e27-line)] bg-[#050008]/60 px-4 py-2">
            <MapPin size={16} className="text-[var(--e27-magenta)]" aria-hidden="true" />
            {VENUE}
          </span>
        </div>

        <div className="e27-rise e27-delay-4 mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href={REGISTER_URL} className="e27-btn e27-btn-primary">
            Register Now <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href={`${BASE}/events`} className="e27-btn e27-btn-ghost">
            Explore Events
          </Link>
        </div>
      </div>
    </section>
  );
}