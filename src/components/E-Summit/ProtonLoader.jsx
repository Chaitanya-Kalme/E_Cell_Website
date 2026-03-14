"use client";
import { useEffect, useRef } from "react";

// ─── TIMELINE (ms) ────────────────────────────────────────────────────────────
const T = {
  PROTON_TRAVEL : 1800,   // proton glides in
  COLLISION     : 1800,   // collision at 1.8s
  EXPLOSION     : 2200,   // 0.4s flash
  GATHER        : 3600,   // 1.4s burst & scatter
  TEXT          : 3900,   // text burns in shortly after
  DONE          : 10000,  // extended text hold
};

export default function ProtonLoader({ onComplete }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const stateRef  = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const lerp      = (a, b, t) => a + (b - a) * t;
    const clamp     = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const easeInOut = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    const easeOut3  = t => 1 - Math.pow(1 - t, 3);

    const ELECTRONS = [
      { a: 42, b: 18, tilt: 0,            speed: 0.032, phase: 0           },
      { a: 42, b: 18, tilt:  Math.PI / 3, speed: 0.025, phase: Math.PI / 2 },
      { a: 42, b: 18, tilt: -Math.PI / 3, speed: 0.028, phase: Math.PI     },
    ];

    function initState() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const W = canvas.width, H = canvas.height;
      const CX = W / 2, CY = H * 0.44;
      const groundY = H * 0.82;

      // burst particles — just scatter, no rocket targets
      const expParticles = Array.from({ length: 160 }, (_, i) => {
        const angle = (i / 160) * Math.PI * 2 + Math.random() * 0.4;
        const speed = 4.5 + Math.random() * 6;
        return {
          x: CX, y: CY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 2.5 + Math.random() * 3,
          hue: 20 + Math.random() * 220,
          alpha: 1,
        };
      });

      stateRef.current = {
        W, H, CX, CY, groundY,
        electronAngles: ELECTRONS.map(e => e.phase),
        protonX: -50, protonY: CY,
        expParticles,
        groundLetters: [],
        collisionFired: false,
        groundTextFired: false,
        stars: Array.from({ length: 120 }, () => ({
          x: Math.random() * W,
          y: Math.random() * H * 0.85,
          r: Math.random() * 0.9 + 0.1,
          a: Math.random(),
        })),
        startTime: performance.now(),
        doneCalled: false,
      };
    }

    function initGroundText() {
      const s = stateRef.current;
      const text = "E-SUMMIT'26";
      const fs   = Math.min(120, s.W * 0.13);
      const glyph = fs * 0.72;
      const total = text.length * glyph;
      const sx = s.CX - total / 2;
      const ty = s.H * 0.44;   // centred vertically where atom was
      s.groundLetters = text.split("").map((ch, i) => ({
        ch,
        tx: sx + i * glyph + glyph / 2, ty,
        x:  s.CX + (Math.random() - 0.5) * 60,
        y:  s.CY  + (Math.random() - 0.5) * 60,
        alpha: 0, delay: i * 0.01, fs,
      }));
    }

    function drawProton(x, y, r, alpha) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.8);
      g.addColorStop(0, `rgba(120,210,255,${alpha * 0.45})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.8, 0, Math.PI * 2); ctx.fill();

      const c = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
      c.addColorStop(0, `rgba(230,245,255,${alpha})`);
      c.addColorStop(0.4, `rgba(80,190,255,${alpha})`);
      c.addColorStop(1, `rgba(0,90,210,${alpha * 0.8})`);
      ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.9})`; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(x - r * 0.45, y); ctx.lineTo(x + r * 0.45, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y - r * 0.45); ctx.lineTo(x, y + r * 0.45); ctx.stroke();
    }

    function drawAtom(x, y) {
      const s = stateRef.current;
      const ng = ctx.createRadialGradient(x, y, 0, x, y, 26);
      ng.addColorStop(0, "rgba(255,230,90,0.95)");
      ng.addColorStop(0.45, "rgba(255,140,25,0.65)");
      ng.addColorStop(1, "rgba(200,60,0,0)");
      ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(x, y, 26, 0, Math.PI * 2); ctx.fill();

      const nb = ctx.createRadialGradient(x - 4, y - 4, 0, x, y, 14);
      nb.addColorStop(0, "rgba(255,248,180,1)");
      nb.addColorStop(0.5, "rgba(255,155,35,1)");
      nb.addColorStop(1, "rgba(180,55,10,1)");
      ctx.fillStyle = nb; ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fill();

      ELECTRONS.forEach((e, i) => {
        ctx.save(); ctx.translate(x, y); ctx.rotate(e.tilt);
        ctx.beginPath(); ctx.ellipse(0, 0, e.a, e.b, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(100,190,255,0.22)"; ctx.lineWidth = 1; ctx.stroke();
        const ang = s.electronAngles[i];
        const ex = Math.cos(ang) * e.a, ey = Math.sin(ang) * e.b;
        const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 5.5);
        eg.addColorStop(0, "rgba(190,225,255,1)");
        eg.addColorStop(1, "rgba(0,110,255,0)");
        ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(ex, ey, 5.5, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
    }

    // ── main frame ────────────────────────────────────────────────────────────
    function frame(now) {
      const s = stateRef.current;
      const el = now - s.startTime;
      const { W, H, CX, CY, groundY } = s;

      ctx.clearRect(0, 0, W, H);

      // background
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#010408");
      bg.addColorStop(0.65, "#040b18");
      bg.addColorStop(1, "#080315");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      // stars
      s.stars.forEach(st => {
        st.a += 0.003 * (Math.random() < 0.5 ? 1 : -1);
        st.a = clamp(st.a, 0, 1);
        ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,235,255,${st.a})`; ctx.fill();
      });

      // ground line
      ctx.strokeStyle = "rgba(80,130,220,0.2)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(W, groundY); ctx.stroke();
      const gg = ctx.createLinearGradient(0, groundY, 0, groundY + 30);
      gg.addColorStop(0, "rgba(60,120,255,0.06)"); gg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gg; ctx.fillRect(0, groundY, W, 30);

      // PHASE 1 — proton travels straight to atom
      if (el < T.COLLISION) {
        const t  = clamp(el / T.PROTON_TRAVEL, 0, 1);
        const et = easeInOut(t);
        s.protonX = lerp(-50, CX, et);
        s.protonY = CY;
        ELECTRONS.forEach((e, i) => { s.electronAngles[i] += e.speed; });
        drawAtom(CX, CY);

        const tr = ctx.createLinearGradient(-50, CY, s.protonX, CY);
        tr.addColorStop(0, "rgba(0,110,255,0)");
        tr.addColorStop(1, "rgba(100,210,255,.55)");
        ctx.strokeStyle = tr; ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.moveTo(-50, CY); ctx.lineTo(s.protonX, CY); ctx.stroke();
        drawProton(s.protonX, s.protonY, 10, 1);
      }

      // PHASE 2 — collision flash + shockwave
      if (el >= T.PROTON_TRAVEL && el < T.EXPLOSION) {
        const t = (el - T.PROTON_TRAVEL) / (T.EXPLOSION - T.PROTON_TRAVEL);
        const shockR = easeOut3(t) * W * 0.52;
        const shockA = (1 - t) * 0.7;
        const flashA = t < 0.15 ? t / 0.15 : Math.max(0, 1 - (t - 0.15) / 0.35);
        ctx.fillStyle = `rgba(255,255,255,${flashA * 0.5})`; ctx.fillRect(0, 0, W, H);
        [[1, "rgba(120,210,255"], [0.55, "rgba(255,185,70"], [0.25, "rgba(255,255,255"]].forEach(([f, col], i) => {
          ctx.beginPath(); ctx.arc(CX, CY, shockR * f, 0, Math.PI * 2);
          ctx.strokeStyle = `${col},${shockA * (0.7 - i * 0.15)})`; ctx.lineWidth = (3 - i) * (1 - t); ctx.stroke();
        });
      }

      // PHASE 3 — particles burst and fade out (no gather)
      if (el >= T.COLLISION && el < T.TEXT) {
        const t = clamp((el - T.COLLISION) / (T.GATHER - T.COLLISION), 0, 1);
        s.expParticles.forEach(p => {
          p.x += p.vx * 1.65; p.y += p.vy * 1.65; p.vy += 0.11;
          p.alpha = Math.max(0, 1 - t * 1.2);
          if (p.alpha <= 0) return;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},90%,65%,${p.alpha})`;
          ctx.shadowBlur = 7; ctx.shadowColor = `hsla(${p.hue},100%,70%,.7)`;
          ctx.fill(); ctx.shadowBlur = 0;
        });
      }

      // PHASE 4 — E-SUMMIT'26 text burns in from the blast centre
      if (el >= T.TEXT) {
        if (!s.groundTextFired) { s.groundTextFired = true; initGroundText(); }
        const tText = clamp((el - T.TEXT) / (T.DONE - T.TEXT), 0, 1);

        // expanding ring at blast origin
        const rs2 = easeOut3(tText) * 140;
        [1, 0.65, 0.35].forEach((f, i) => {
          ctx.beginPath(); ctx.arc(CX, CY, rs2 * f, 0, Math.PI * 2);
          const cols = ["rgba(100,190,255", "rgba(255,140,60", "rgba(200,100,255"];
          ctx.strokeStyle = `${cols[i]},${(0.38 - i * 0.08) * (1 - tText * 0.7)})`;
          ctx.lineWidth = 1.4 - i * 0.2; ctx.stroke();
        });

        ctx.save();
        s.groundLetters.forEach(gl => {
          const lt = clamp((tText - gl.delay) / 0.08, 0, 1);
          gl.alpha = easeOut3(lt);
          gl.x = lerp(gl.x, gl.tx, easeOut3(Math.min(1, lt * 1.5)));
          gl.y = lerp(gl.y, gl.ty, easeOut3(Math.min(1, lt * 1.5)));
          if (gl.alpha <= 0) return;
          ctx.font = `bold ${gl.fs}px 'Courier New',monospace`;
          ctx.textAlign = "center"; ctx.textBaseline = "middle";

          // deep blue outer glow
          ctx.shadowBlur = 50; ctx.shadowColor = `rgba(0,100,255,${gl.alpha})`;
          ctx.fillStyle = `rgba(0,140,255,${gl.alpha})`;
          ctx.fillText(gl.ch, gl.x, gl.y);

          // mid glow
          ctx.shadowBlur = 22; ctx.shadowColor = `rgba(60,180,255,${gl.alpha * 0.9})`;
          ctx.fillStyle = `rgba(20,160,255,${gl.alpha})`;
          ctx.fillText(gl.ch, gl.x, gl.y);

          // bright top layer
          ctx.shadowBlur = 7; ctx.shadowColor = `rgba(160,220,255,${gl.alpha * 0.7})`;
          ctx.fillStyle = `rgba(130,215,255,${gl.alpha})`;
          ctx.fillText(gl.ch, gl.x, gl.y);
          ctx.shadowBlur = 0;
        });
        ctx.restore();
      }

      // done
      if (el > T.DONE + 1200 && !s.doneCalled) {
        s.doneCalled = true;
        if (onComplete) onComplete();
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    initState();
    rafRef.current = requestAnimationFrame(frame);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}