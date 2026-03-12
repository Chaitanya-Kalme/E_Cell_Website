"use client";
import { useEffect, useRef } from "react";

// ─── TIMELINE (ms) ────────────────────────────────────────────────────────────
const T = {
  PROTON_TRAVEL: 800, // proton glides in
  COLLISION: 800, // collision at 0.8s
  EXPLOSION: 1000, // 0.2s flash
  GATHER: 1600, // 0.6s burst + gather
  HOLD: 2000, // 0.4s rocket assembled
  LAUNCH: 2200, // 0.2s ignition
  TEXT: 2600, // text burns in
  DONE: 3500, // done under 3.5s
};

/**
 * ProtonLoader
 * Props:
 *   onComplete — called when the animation finishes (parent unmounts this loader)
 */
export default function ProtonLoader({ onComplete }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // ── helpers ───────────────────────────────────────────────────────────────
    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    const easeOut3 = (t) => 1 - Math.pow(1 - t, 3);

    const ELECTRONS = [
      { a: 42, b: 18, tilt: 0, speed: 0.032, phase: 0 },
      { a: 42, b: 18, tilt: Math.PI / 3, speed: 0.025, phase: Math.PI / 2 },
      { a: 42, b: 18, tilt: -Math.PI / 3, speed: 0.028, phase: Math.PI },
    ];

    function getRocketScale() {
      return Math.min(canvas.height * 0.12, 70);
    }

    function getRocketShape(rs) {
      return [
        { x: 0, y: -1.0 },
        { x: 0.2, y: -0.68 },
        { x: 0.24, y: -0.18 },
        { x: 0.52, y: 0.55 },
        { x: 0.3, y: 0.44 },
        { x: 0.24, y: 1.0 },
        { x: 0.16, y: 1.06 },
        { x: -0.16, y: 1.06 },
        { x: -0.24, y: 1.0 },
        { x: -0.3, y: 0.44 },
        { x: -0.52, y: 0.55 },
        { x: -0.24, y: -0.18 },
        { x: -0.2, y: -0.68 },
      ].map((p) => ({ x: p.x * rs, y: p.y * rs }));
    }

    const TARGET_COUNT = 130;

    function getRocketTargets(cx, cy, shape) {
      const pts = [];
      const N = shape.length;
      for (let i = 0; i < TARGET_COUNT; i++) {
        const t = i / TARGET_COUNT;
        const seg = t * N;
        const si = Math.floor(seg) % N;
        const sf = seg - Math.floor(seg);
        const a = shape[si],
          b = shape[(si + 1) % N];
        pts.push({
          x: cx + lerp(a.x, b.x, sf) + (Math.random() - 0.5) * 3,
          y: cy + lerp(a.y, b.y, sf) + (Math.random() - 0.5) * 3,
        });
      }
      return pts;
    }

    // ── init ──────────────────────────────────────────────────────────────────
    function initState() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const W = canvas.width,
        H = canvas.height;
      const CX = W / 2,
        CY = H * 0.44;
      const rs = getRocketScale();
      const shape = getRocketShape(rs);
      const targets = getRocketTargets(CX, CY, shape);
      const groundY = H * 0.82;

      const expParticles = Array.from({ length: TARGET_COUNT }, (_, i) => {
        const angle = (i / TARGET_COUNT) * Math.PI * 2 + Math.random() * 0.4;
        const speed = 2.5 + Math.random() * 4;
        return {
          x: CX,
          y: CY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 2.5 + Math.random() * 3,
          hue: 20 + Math.random() * 60,
          alpha: 1,
          target: targets[i],
        };
      });
      for (let i = 0; i < 90; i++) {
        const angle = Math.random() * Math.PI * 2,
          speed = 1 + Math.random() * 6;
        expParticles.push({
          x: CX,
          y: CY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          r: 1 + Math.random() * 2.5,
          hue: 190 + Math.random() * 80,
          alpha: 1,
          target: null,
        });
      }

      stateRef.current = {
        W,
        H,
        CX,
        CY,
        rs,
        shape,
        targets,
        groundY,
        electronAngles: ELECTRONS.map((e) => e.phase),
        protonX: -50,
        protonY: CY + 15,
        expParticles,
        rocketY: 0,
        exhaustParts: [],
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
        loopScheduled: false,
      };
    }

    function spawnExhaust() {
      const s = stateRef.current;
      for (let i = 0; i < 5; i++) {
        s.exhaustParts.push({
          x: s.CX + (Math.random() - 0.5) * s.rs * 0.35,
          y: s.CY + s.rocketY + s.rs * 1.06,
          vx: (Math.random() - 0.5) * 1.3,
          vy: 1.8 + Math.random() * 3,
          r: 4 + Math.random() * 5,
          life: 1,
          hue: 10 + Math.random() * 50,
        });
      }
    }

    function initGroundText() {
      const s = stateRef.current;
      const text = "E-SUMMIT'26";
      const fs = Math.min(120, s.W * 0.13);
      const glyph = fs * 0.72;
      const total = text.length * glyph;
      const sx = s.CX - total / 2;
      const ty = s.H * 0.5;
      s.groundLetters = text.split("").map((ch, i) => ({
        ch,
        tx: sx + i * glyph + glyph / 2,
        ty,
        x: s.CX + (Math.random() - 0.5) * 30,
        y: s.groundY + (Math.random() - 0.5) * 20,
        alpha: 0,
        delay: i * 0.09,
        fs,
      }));
    }

    function drawProton(x, y, r, alpha) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.8);
      g.addColorStop(0, `rgba(120,210,255,${alpha * 0.45})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r * 2.8, 0, Math.PI * 2);
      ctx.fill();
      const c = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
      c.addColorStop(0, `rgba(230,245,255,${alpha})`);
      c.addColorStop(0.4, `rgba(80,190,255,${alpha})`);
      c.addColorStop(1, `rgba(0,90,210,${alpha * 0.8})`);
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.9})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(x - r * 0.45, y);
      ctx.lineTo(x + r * 0.45, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y - r * 0.45);
      ctx.lineTo(x, y + r * 0.45);
      ctx.stroke();
    }

    function drawAtom(x, y) {
      const s = stateRef.current;
      const ng = ctx.createRadialGradient(x, y, 0, x, y, 26);
      ng.addColorStop(0, "rgba(255,230,90,0.95)");
      ng.addColorStop(0.45, "rgba(255,140,25,0.65)");
      ng.addColorStop(1, "rgba(200,60,0,0)");
      ctx.fillStyle = ng;
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();
      const nb = ctx.createRadialGradient(x - 4, y - 4, 0, x, y, 14);
      nb.addColorStop(0, "rgba(255,248,180,1)");
      nb.addColorStop(0.5, "rgba(255,155,35,1)");
      nb.addColorStop(1, "rgba(180,55,10,1)");
      ctx.fillStyle = nb;
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.fill();
      ELECTRONS.forEach((e, i) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(e.tilt);
        ctx.beginPath();
        ctx.ellipse(0, 0, e.a, e.b, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(100,190,255,0.22)";
        ctx.lineWidth = 1;
        ctx.stroke();
        const ang = s.electronAngles[i];
        const ex = Math.cos(ang) * e.a,
          ey = Math.sin(ang) * e.b;
        const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 5.5);
        eg.addColorStop(0, "rgba(190,225,255,1)");
        eg.addColorStop(1, "rgba(0,110,255,0)");
        ctx.fillStyle = eg;
        ctx.beginPath();
        ctx.arc(ex, ey, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    function drawRocket(cx, cy, alpha) {
      const rs = stateRef.current.rs;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalAlpha = alpha;

      const BW = rs * 0.36;
      const BH = rs * 0.82;
      const NOSE = rs;

      // ambient glow
      let aura = ctx.createRadialGradient(0, 0, rs * 0.1, 0, 0, rs * 1.2);
      aura.addColorStop(0, "rgba(80,160,255,.14)");
      aura.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(0, 0, rs * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // nose cone
      ctx.beginPath();
      ctx.moveTo(0, -NOSE);
      ctx.bezierCurveTo(
        BW * 0.45,
        -NOSE * 0.5,
        BW,
        -NOSE * 0.05,
        BW,
        BH * 0.06,
      );
      ctx.lineTo(-BW, BH * 0.06);
      ctx.bezierCurveTo(-BW, -NOSE * 0.05, -BW * 0.45, -NOSE * 0.5, 0, -NOSE);
      let ng = ctx.createLinearGradient(-BW, -NOSE, BW, -NOSE * 0.1);
      ng.addColorStop(0, "#8ab8d8");
      ng.addColorStop(0.38, "#ddeeff");
      ng.addColorStop(0.65, "#b8d4ea");
      ng.addColorStop(1, "#6090b0");
      ctx.fillStyle = ng;
      ctx.fill();
      ctx.strokeStyle = "rgba(180,215,240,.55)";
      ctx.lineWidth = 0.9;
      ctx.stroke();

      // main body
      let bg = ctx.createLinearGradient(-BW, 0, BW, 0);
      bg.addColorStop(0, "#3a5570");
      bg.addColorStop(0.1, "#7aaabe");
      bg.addColorStop(0.32, "#c8e2f2");
      bg.addColorStop(0.5, "#ddeeff");
      bg.addColorStop(0.7, "#9abfd8");
      bg.addColorStop(0.9, "#527090");
      bg.addColorStop(1, "#2e4460");
      ctx.fillStyle = bg;
      ctx.fillRect(-BW, BH * 0.06, BW * 2, BH * 0.88);
      ctx.strokeStyle = "rgba(140,190,220,.3)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(-BW, BH * 0.06, BW * 2, BH * 0.88);

      // panel ribbing
      for (let i = 1; i <= 5; i++) {
        const py = BH * 0.06 + i * ((BH * 0.88) / 6);
        ctx.beginPath();
        ctx.moveTo(-BW, py);
        ctx.lineTo(BW, py);
        ctx.strokeStyle = `rgba(90,150,190,${0.1 + i * 0.018})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      // sheen
      ctx.beginPath();
      ctx.rect(-BW * 0.07, -NOSE, BW * 0.12, NOSE + BH * 0.94);
      let sh = ctx.createLinearGradient(-BW * 0.07, 0, BW * 0.05, 0);
      sh.addColorStop(0, "rgba(255,255,255,0)");
      sh.addColorStop(0.5, "rgba(255,255,255,.12)");
      sh.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = sh;
      ctx.fill();

      // logo band
      const bandY = BH * 0.38,
        bandH = BH * 0.22;
      ctx.fillStyle = "rgba(20,60,160,.55)";
      ctx.fillRect(-BW, bandY, BW * 2, bandH);
      ctx.save();
      ctx.font = `bold ${BW * 0.45}px 'Courier New',monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 7;
      ctx.shadowColor = "rgba(80,180,255,.8)";
      ctx.fillStyle = "rgba(190,230,255,.92)";
      ctx.fillText("E-SUMMIT'26", 0, bandY + bandH * 0.5);
      ctx.shadowBlur = 0;
      ctx.restore();

      // porthole windows
      [{ cy2: -NOSE * 0.32 }, { cy2: -NOSE * 0.02 }].forEach((w) => {
        ctx.beginPath();
        ctx.arc(0, w.cy2, BW * 0.19, 0, Math.PI * 2);
        ctx.fillStyle = "#1e2e40";
        ctx.fill();
        ctx.strokeStyle = "rgba(140,195,230,.5)";
        ctx.lineWidth = 1;
        ctx.stroke();
        let wg = ctx.createRadialGradient(
          -BW * 0.06,
          w.cy2 - BW * 0.06,
          0,
          0,
          w.cy2,
          BW * 0.17,
        );
        wg.addColorStop(0, "rgba(190,235,255,.92)");
        wg.addColorStop(0.4, "rgba(70,150,255,.65)");
        wg.addColorStop(1, "rgba(10,35,90,.85)");
        ctx.beginPath();
        ctx.arc(0, w.cy2, BW * 0.17, 0, Math.PI * 2);
        ctx.fillStyle = wg;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(-BW * 0.06, w.cy2 - BW * 0.07, BW * 0.05, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,.55)";
        ctx.fill();
      });

      // engine skirt
      const SKY = BH * 0.94;
      ctx.beginPath();
      ctx.moveTo(-BW, SKY);
      ctx.lineTo(-BW * 1.18, BH + rs * 0.04);
      ctx.lineTo(BW * 1.18, BH + rs * 0.04);
      ctx.lineTo(BW, SKY);
      ctx.closePath();
      let sk = ctx.createLinearGradient(-BW * 1.18, 0, BW * 1.18, 0);
      sk.addColorStop(0, "#2e3e52");
      sk.addColorStop(0.35, "#506a80");
      sk.addColorStop(0.65, "#607888");
      sk.addColorStop(1, "#2e3e52");
      ctx.fillStyle = sk;
      ctx.fill();
      ctx.strokeStyle = "rgba(90,140,180,.35)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // nozzle bell
      const NZ = BH + rs * 0.04;
      ctx.beginPath();
      ctx.moveTo(-BW * 0.36, NZ);
      ctx.bezierCurveTo(
        -BW * 0.36,
        NZ + rs * 0.04,
        -BW * 0.54,
        NZ + rs * 0.1,
        -BW * 0.56,
        NZ + rs * 0.15,
      );
      ctx.lineTo(BW * 0.56, NZ + rs * 0.15);
      ctx.bezierCurveTo(
        BW * 0.54,
        NZ + rs * 0.1,
        BW * 0.36,
        NZ + rs * 0.04,
        BW * 0.36,
        NZ,
      );
      ctx.closePath();
      let nz = ctx.createLinearGradient(-BW * 0.56, 0, BW * 0.56, 0);
      nz.addColorStop(0, "#1a2230");
      nz.addColorStop(0.3, "#445868");
      nz.addColorStop(0.5, "#607080");
      nz.addColorStop(0.7, "#445868");
      nz.addColorStop(1, "#1a2230");
      ctx.fillStyle = nz;
      ctx.fill();
      ctx.strokeStyle = "rgba(70,120,155,.45)";
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, NZ + rs * 0.14, BW * 0.34, BW * 0.07, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(4,8,14,.95)";
      ctx.fill();

      // grid fins x4
      [
        [-1, -0.75],
        [1, -0.75],
        [-1, 0.3],
        [1, 0.3],
      ].forEach(([sx, sy]) => {
        const fx = BW * (sx > 0 ? 1 : -1),
          fy = BH * sy;
        const fw = BW * 0.34,
          fh = BH * 0.2;
        ctx.save();
        ctx.translate(fx, fy);
        ctx.beginPath();
        ctx.rect(sx > 0 ? 0 : -fw, -fh * 0.5, fw, fh);
        let fg = ctx.createLinearGradient(
          sx > 0 ? 0 : -fw,
          0,
          sx > 0 ? fw : 0,
          0,
        );
        fg.addColorStop(
          0,
          sx > 0 ? "rgba(42,60,80,.9)" : "rgba(72,100,128,.9)",
        );
        fg.addColorStop(
          1,
          sx > 0 ? "rgba(72,100,128,.9)" : "rgba(42,60,80,.9)",
        );
        ctx.fillStyle = fg;
        ctx.fill();
        ctx.strokeStyle = "rgba(90,140,180,.3)";
        ctx.lineWidth = 0.55;
        ctx.stroke();
        for (let gi = 1; gi < 3; gi++) {
          const gx = sx > 0 ? gi * (fw / 3) : -fw + gi * (fw / 3);
          ctx.beginPath();
          ctx.moveTo(gx, -fh * 0.5);
          ctx.lineTo(gx, fh * 0.5);
          ctx.strokeStyle = "rgba(80,130,170,.22)";
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
        ctx.restore();
      });

      // antenna
      ctx.strokeStyle = "rgba(180,210,240,.6)";
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(0, -NOSE);
      ctx.lineTo(0, -NOSE - rs * 0.12);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -NOSE - rs * 0.12, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(200,230,255,.85)";
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(120,200,255,.7)";
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();
    }

    // ── main frame ────────────────────────────────────────────────────────────
    function frame(now) {
      const s = stateRef.current;
      const el = now - s.startTime;
      const { W, H, CX, CY, rs, groundY } = s;

      ctx.clearRect(0, 0, W, H);

      // bg
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#010408");
      bg.addColorStop(0.65, "#040b18");
      bg.addColorStop(1, "#080315");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // stars
      s.stars.forEach((st) => {
        st.a += 0.003 * (Math.random() < 0.5 ? 1 : -1);
        st.a = clamp(st.a, 0, 1);
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,235,255,${st.a})`;
        ctx.fill();
      });

      // ground line
      ctx.strokeStyle = "rgba(80,130,220,0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(W, groundY);
      ctx.stroke();
      const gg = ctx.createLinearGradient(0, groundY, 0, groundY + 30);
      gg.addColorStop(0, "rgba(60,120,255,0.06)");
      gg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gg;
      ctx.fillRect(0, groundY, W, 30);

      // PHASE 1 — proton travel in perfectly straight horizontal line
      if (el < T.COLLISION) {
        const t = clamp(el / T.PROTON_TRAVEL, 0, 1);
        const et = easeInOut(t);
        s.protonX = lerp(-50, CX, et);
        s.protonY = CY; // fixed Y — straight horizontal
        ELECTRONS.forEach((e, i) => {
          s.electronAngles[i] += e.speed;
        });
        drawAtom(CX, CY);
        // straight horizontal trail
        const tr = ctx.createLinearGradient(-50, CY, s.protonX, CY);
        tr.addColorStop(0, "rgba(0,110,255,0)");
        tr.addColorStop(1, "rgba(100,210,255,.55)");
        ctx.strokeStyle = tr;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(-50, CY);
        ctx.lineTo(s.protonX, CY);
        ctx.stroke();
        drawProton(s.protonX, s.protonY, 10, 1);
      }

      // PHASE 2 — collision flash
      if (el >= T.PROTON_TRAVEL && el < T.EXPLOSION) {
        const t = (el - T.PROTON_TRAVEL) / (T.EXPLOSION - T.PROTON_TRAVEL);
        const shockR = easeOut3(t) * W * 0.52;
        const shockA = (1 - t) * 0.7;
        const flashA = t < 0.15 ? t / 0.15 : Math.max(0, 1 - (t - 0.15) / 0.35);
        ctx.fillStyle = `rgba(255,255,255,${flashA * 0.5})`;
        ctx.fillRect(0, 0, W, H);
        [
          [1, "rgba(120,210,255"],
          [0.55, "rgba(255,185,70"],
          [0.25, "rgba(255,255,255"],
        ].forEach(([f, col], i) => {
          ctx.beginPath();
          ctx.arc(CX, CY, shockR * f, 0, Math.PI * 2);
          ctx.strokeStyle = `${col},${shockA * (0.7 - i * 0.15)})`;
          ctx.lineWidth = (3 - i) * (1 - t);
          ctx.stroke();
        });
      }

      // PHASE 3 — particles only (strictly capped at T.GATHER)
      if (el >= T.COLLISION && el < T.GATHER) {
        const t = clamp((el - T.COLLISION) / (T.GATHER - T.COLLISION), 0, 1);
        s.expParticles.forEach((p) => {
          if (t < 0.42) {
            p.x += p.vx * 1.05;
            p.y += p.vy * 1.05;
            p.vy += 0.07;
          } else {
            const gt = (t - 0.42) / 0.58;
            if (p.target) {
              p.x = lerp(p.x, p.target.x, easeInOut(gt));
              p.y = lerp(p.y, p.target.y, easeInOut(gt));
            } else {
              p.alpha = Math.max(0, 1 - gt * 1.5);
            }
          }
          if (p.alpha <= 0) return;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},90%,65%,${p.alpha})`;
          ctx.shadowBlur = 7;
          ctx.shadowColor = `hsla(${p.hue},100%,70%,.7)`;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // PHASE 4 — rocket appears, zero particles
      if (el >= T.GATHER && el < T.LAUNCH) {
        const t = clamp((el - T.GATHER) / (T.HOLD - T.GATHER), 0, 1);
        drawRocket(CX, CY, easeOut3(t));
      }

      // PHASE 5 — launch + exhaust + E-SUMMIT text
      if (el >= T.HOLD) {
        const launchT = clamp((el - T.LAUNCH) / (T.DONE - T.LAUNCH), 0, 1);
        s.rocketY = -easeOut3(launchT) * H * 0.68;
        const rCY = CY + s.rocketY;

        if (el >= T.LAUNCH) spawnExhaust();

        s.exhaustParts = s.exhaustParts.filter((p) => p.life > 0);
        s.exhaustParts.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.r *= 0.968;
          p.life -= 0.02;
          const a = Math.max(0, p.life);
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          g.addColorStop(0, `hsla(${p.hue},100%,82%,${a})`);
          g.addColorStop(0.5, `hsla(${p.hue + 20},90%,55%,${a * 0.65})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });

        drawRocket(CX, rCY, 1);

        // E-SUMMIT centred on screen
        if (el >= T.TEXT) {
          if (!s.groundTextFired) {
            s.groundTextFired = true;
            initGroundText();
          }
          const tText = clamp((el - T.TEXT) / (T.DONE - T.TEXT), 0, 1);

          // blast rings at pad
          const rs2 = easeOut3(tText) * 110;
          [1, 0.65, 0.35].forEach((f, i) => {
            ctx.beginPath();
            ctx.arc(CX, groundY, rs2 * f, Math.PI, Math.PI * 2);
            const cols = [
              "rgba(100,190,255",
              "rgba(255,140,60",
              "rgba(200,100,255",
            ];
            ctx.strokeStyle = `${cols[i]},${(0.38 - i * 0.08) * (1 - tText * 0.7)})`;
            ctx.lineWidth = 1.2 - i * 0.2;
            ctx.stroke();
          });

          ctx.save();
          s.groundLetters.forEach((gl) => {
            const lt = clamp((tText - gl.delay) / 0.38, 0, 1);
            gl.alpha = easeOut3(lt);
            gl.x = lerp(gl.x, gl.tx, easeOut3(Math.min(1, lt * 1.5)));
            gl.y = lerp(gl.y, gl.ty, easeOut3(Math.min(1, lt * 1.5)));
            if (gl.alpha <= 0) return;
            ctx.font = `bold ${gl.fs}px 'Courier New',monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.shadowBlur = 50;
            ctx.shadowColor = `rgba(0,100,255,${gl.alpha})`;
            ctx.fillStyle = `rgba(0,140,255,${gl.alpha})`;
            ctx.fillText(gl.ch, gl.x, gl.y);
            ctx.shadowBlur = 22;
            ctx.shadowColor = `rgba(60,180,255,${gl.alpha * 0.9})`;
            ctx.fillStyle = `rgba(20,160,255,${gl.alpha})`;
            ctx.fillText(gl.ch, gl.x, gl.y);
            ctx.shadowBlur = 7;
            ctx.shadowColor = `rgba(160,220,255,${gl.alpha * 0.7})`;
            ctx.fillStyle = `rgba(130,215,255,${gl.alpha})`;
            ctx.fillText(gl.ch, gl.x, gl.y);
            ctx.shadowBlur = 0;
          });
          ctx.restore();
        }
      }

      // animation done — notify parent after a short hold on the text
      if (el > T.DONE + 1200 && !s.doneCalled) {
        s.doneCalled = true;
        if (onComplete) onComplete();
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    initState();
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
