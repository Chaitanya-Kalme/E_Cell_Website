"use client";
import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let mouse = { x: null, y: null };

    const REPEL_RADIUS = 120;
    const REPEL_STRENGTH = 6;

    // ── Resize to parent ──────────────────────────────────────────────────────
    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      canvas.width  = p.offsetWidth;
      canvas.height = p.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // ── Mouse ─────────────────────────────────────────────────────────────────
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      if (cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom) {
        mouse.x = cx - rect.left;
        mouse.y = cy - rect.top;
      } else { mouse.x = null; mouse.y = null; }
    };
    const onLeave = () => { mouse.x = null; mouse.y = null; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onLeave);

    // ══════════════════════════════════════════════════════════════════════════
    // 1. TWINKLING STARS
    // ══════════════════════════════════════════════════════════════════════════
    class Star {
      constructor(forceBottom = false) { this.forceBottom = forceBottom; this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        if (this.forceBottom) {
          // Concentrate in the bottom 40% of the canvas
          this.y = canvas.height * (0.60 + Math.random() * 0.40);
          // Bottom stars are slightly brighter and more varied in size
          this.r = Math.random() * 1.4 + 0.2;
        } else {
          this.y = Math.random() * canvas.height;
          this.r = Math.random() * 1.1 + 0.15;
        }
        this.alpha  = Math.random();
        this.dA     = (Math.random() * 0.004 + 0.001) * (Math.random() < 0.5 ? 1 : -1);
      }
      update() {
        this.alpha += this.dA;
        if (this.alpha > 1 || this.alpha < 0) this.dA *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,235,255,${Math.max(0, Math.min(1, this.alpha))})`;
        ctx.fill();
      }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 2. REALISTIC GALAXY
    //    Each galaxy has:
    //    - A bright glowing nucleus (multi-stop radial gradient)
    //    - A dust-lane disk drawn once onto an offscreen canvas
    //    - Thousands of star-particles laid along logarithmic spiral arms
    //    - Faint outer halo
    // ══════════════════════════════════════════════════════════════════════════
    class Galaxy {
      constructor(cx, cy, opts = {}) {
        this.cx     = cx;
        this.cy     = cy;
        this.arms   = opts.arms   || 3;
        this.radius = opts.radius || Math.min(canvas.width, canvas.height) * 0.22;
        this.tilt   = opts.tilt   || 0.42;          // y-scale: <1 = elliptical
        this.rot    = opts.rot    || 0;              // current rotation angle
        this.speed  = opts.speed  || 0.00012;
        this.hue    = opts.hue    || 220;

        this.stars  = [];
        const N = opts.starCount || 900;
        for (let i = 0; i < N; i++) {
          const arm      = i % this.arms;
          const t        = (i / N);                 // 0‥1 along arm length
          // logarithmic spiral: r = a * e^(b*θ)
          const theta    = t * Math.PI * 4 + (arm / this.arms) * Math.PI * 2;
          const r        = this.radius * (0.05 + 0.95 * t);
          // Gaussian scatter perpendicular to arm
          const scatter  = (Math.random() + Math.random() - 1) * r * 0.18;
          this.stars.push({
            angle:   theta + scatter * 0.04,
            radius:  r + scatter,
            size:    Math.random() < 0.04
                       ? Math.random() * 1.8 + 0.9      // bright foreground star
                       : Math.random() * 0.9 + 0.2,
            alpha:   0.15 + Math.random() * 0.75,
            hue:     this.hue + (Math.random() - 0.5) * 55,
            light:   55 + Math.random() * 35,
            speed:   this.speed * (0.6 + Math.random() * 0.8),
          });
        }
      }

      update() {
        this.rot += this.speed;
      }

      draw() {
        ctx.save();
        ctx.translate(this.cx, this.cy);
        ctx.scale(1, this.tilt);
        ctx.rotate(this.rot);

        // --- Outer halo ---
        const halo = ctx.createRadialGradient(0, 0, this.radius * 0.3, 0, 0, this.radius * 1.1);
        halo.addColorStop(0,   `hsla(${this.hue},70%,70%,0.06)`);
        halo.addColorStop(0.6, `hsla(${this.hue},60%,50%,0.03)`);
        halo.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(0, 0, this.radius * 1.1, 0, Math.PI * 2); ctx.fill();

        // --- Star particles ---
        for (const s of this.stars) {
          const x = Math.cos(s.angle) * s.radius;
          const y = Math.sin(s.angle) * s.radius;
          ctx.beginPath();
          ctx.arc(x, y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${s.hue},85%,${s.light}%,${s.alpha})`;
          if (s.size > 1.2) {
            ctx.shadowBlur  = 4;
            ctx.shadowColor = `hsla(${s.hue},90%,80%,0.6)`;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // --- Bright nucleus ---
        const nuc = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius * 0.18);
        nuc.addColorStop(0,    `hsla(${this.hue + 30},100%,98%,0.95)`);
        nuc.addColorStop(0.15, `hsla(${this.hue + 15},95%,82%,0.75)`);
        nuc.addColorStop(0.5,  `hsla(${this.hue},80%,55%,0.35)`);
        nuc.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.fillStyle = nuc;
        ctx.beginPath(); ctx.arc(0, 0, this.radius * 0.18, 0, Math.PI * 2); ctx.fill();

        // --- Lens-flare spikes on nucleus ---
        ctx.save();
        ctx.globalAlpha = 0.18;
        for (let i = 0; i < 4; i++) {
          ctx.save();
          ctx.rotate((i / 4) * Math.PI);
          const spike = ctx.createLinearGradient(0, -this.radius * 0.28, 0, this.radius * 0.28);
          spike.addColorStop(0,   "rgba(255,255,255,0)");
          spike.addColorStop(0.5, `hsla(${this.hue + 20},100%,95%,0.85)`);
          spike.addColorStop(1,   "rgba(255,255,255,0)");
          ctx.fillStyle = spike;
          ctx.fillRect(-1.5, -this.radius * 0.28, 3, this.radius * 0.56);
          ctx.restore();
        }
        ctx.restore();

        ctx.restore(); // undo translate/scale/rotate
      }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 3. REALISTIC SATELLITES
    //    Each satellite is drawn as a small spacecraft:
    //    - Cylindrical body (rounded rect)
    //    - Two solar panels (thin blue-tinted rectangles with cell lines)
    //    - Antenna dish (arc + line)
    //    - Engine glow nozzle
    //    - Long photon-trail that fades and bends with orbit curvature
    // ══════════════════════════════════════════════════════════════════════════
    class Satellite {
      constructor(opts = {}) {
        this.cx       = opts.cx    || canvas.width  * (0.15 + Math.random() * 0.7);
        this.cy       = opts.cy    || canvas.height * (0.15 + Math.random() * 0.7);
        this.rx       = opts.rx    || 90  + Math.random() * 130;
        this.ry       = opts.ry    || 35  + Math.random() * 70;
        this.angle    = Math.random() * Math.PI * 2;
        this.speed    = (0.0025 + Math.random() * 0.003) * (Math.random() < 0.5 ? 1 : -1);
        this.tiltAngle = opts.tilt || (Math.random() - 0.5) * 0.5; // orbit plane tilt
        this.hue      = [180, 200, 220, 260, 300][Math.floor(Math.random() * 5)];
        this.scale    = 0.55 + Math.random() * 0.6;
        this.trail    = [];
        this.trailLen = 55 + Math.floor(Math.random() * 35);
      }

      _pos(angle) {
        const x = this.cx + Math.cos(angle) * this.rx;
        const y = this.cy + Math.sin(angle) * this.ry;
        return { x, y };
      }

      update() {
        this.angle += this.speed;
        const pos = this._pos(this.angle);
        this.trail.unshift({ x: pos.x, y: pos.y });
        if (this.trail.length > this.trailLen) this.trail.pop();
      }

      draw() {
        if (this.trail.length < 2) return;

        // ── Trail: tapered glowing line ──────────────────────────────────────
        for (let i = 1; i < this.trail.length; i++) {
          const frac  = 1 - i / this.trail.length;
          const alpha = frac * 0.65;
          const width = frac * 2.2 * this.scale;
          ctx.beginPath();
          ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y);
          ctx.lineTo(this.trail[i].x,     this.trail[i].y);
          ctx.strokeStyle = `hsla(${this.hue},90%,75%,${alpha})`;
          ctx.lineWidth   = Math.max(0.2, width);
          ctx.shadowBlur  = frac > 0.7 ? 6 : 0;
          ctx.shadowColor = `hsla(${this.hue},100%,80%,0.5)`;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // ── Draw spacecraft at head of trail ─────────────────────────────────
        const { x, y } = this.trail[0];

        // heading angle = tangent to orbit
        const heading = this.angle + (this.speed > 0 ? Math.PI / 2 : -Math.PI / 2);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(heading);
        ctx.scale(this.scale, this.scale);

        const H = this.hue;

        // Engine glow (behind body)
        const glow = ctx.createRadialGradient(0, 7, 0, 0, 7, 10);
        glow.addColorStop(0,   `hsla(${H},100%,85%,0.9)`);
        glow.addColorStop(0.4, `hsla(${H},90%,60%,0.5)`);
        glow.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(0, 9, 9, 0, Math.PI * 2); ctx.fill();

        // Solar panel — left
        ctx.save();
        ctx.translate(-13, 0);
        // Panel frame
        ctx.fillStyle = `hsla(210,70%,25%,0.9)`;
        ctx.fillRect(-14, -4, 14, 8);
        // Cell lines
        ctx.strokeStyle = `hsla(200,80%,55%,0.55)`;
        ctx.lineWidth = 0.7;
        for (let c = 1; c < 4; c++) {
          ctx.beginPath(); ctx.moveTo(-14 + c * 3.5, -4); ctx.lineTo(-14 + c * 3.5, 4); ctx.stroke();
        }
        ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(0, 0); ctx.stroke();
        // Panel sheen
        const shL = ctx.createLinearGradient(-14, -4, 0, 4);
        shL.addColorStop(0,   "rgba(180,220,255,0.18)");
        shL.addColorStop(0.5, "rgba(100,160,255,0.08)");
        shL.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = shL;
        ctx.fillRect(-14, -4, 14, 8);
        ctx.restore();

        // Solar panel — right
        ctx.save();
        ctx.translate(13, 0);
        ctx.fillStyle = `hsla(210,70%,25%,0.9)`;
        ctx.fillRect(0, -4, 14, 8);
        ctx.strokeStyle = `hsla(200,80%,55%,0.55)`;
        ctx.lineWidth = 0.7;
        for (let c = 1; c < 4; c++) {
          ctx.beginPath(); ctx.moveTo(c * 3.5, -4); ctx.lineTo(c * 3.5, 4); ctx.stroke();
        }
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(14, 0); ctx.stroke();
        const shR = ctx.createLinearGradient(0, -4, 14, 4);
        shR.addColorStop(0,   "rgba(180,220,255,0.18)");
        shR.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = shR;
        ctx.fillRect(0, -4, 14, 8);
        ctx.restore();

        // Main body (rounded rect)
        const bw = 9, bh = 16;
        ctx.beginPath();
        ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 2);
        const bodyGrad = ctx.createLinearGradient(-bw / 2, 0, bw / 2, 0);
        bodyGrad.addColorStop(0,   `hsla(${H},50%,28%,1)`);
        bodyGrad.addColorStop(0.4, `hsla(${H},60%,52%,1)`);
        bodyGrad.addColorStop(0.7, `hsla(${H},55%,38%,1)`);
        bodyGrad.addColorStop(1,   `hsla(${H},45%,22%,1)`);
        ctx.fillStyle = bodyGrad;
        ctx.fill();
        // Body highlight stripe
        ctx.beginPath(); ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 2);
        ctx.strokeStyle = `hsla(${H},80%,75%,0.4)`; ctx.lineWidth = 0.8; ctx.stroke();
        // Viewport window
        ctx.beginPath(); ctx.arc(0, -3, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${H + 30},90%,80%,0.85)`;
        ctx.shadowBlur = 5; ctx.shadowColor = `hsla(${H},100%,80%,0.8)`; ctx.fill();
        ctx.shadowBlur = 0;

        // Antenna dish
        ctx.save();
        ctx.translate(0, -bh / 2 - 1);
        ctx.strokeStyle = `rgba(200,220,255,0.7)`; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -5); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, -5, 3.5, Math.PI, Math.PI * 2);
        ctx.strokeStyle = `hsla(${H + 10},80%,75%,0.8)`; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.arc(0, -5, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${H},100%,88%,0.95)`; ctx.fill();
        ctx.restore();

        ctx.restore(); // undo satellite transform
      }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 4. INTERACTIVE PARTICLES (original behaviour: repel + spring back)
    // ══════════════════════════════════════════════════════════════════════════
    class Particle {
      constructor() { this.init(); }
      init() {
        this.originX = Math.random() * canvas.width;
        this.originY = Math.random() * canvas.height;
        this.x = this.originX; this.y = this.originY;
        this.vx = 0; this.vy = 0;
        this.size = Math.random() * 2.2 + 0.7;
        const hues = [200, 220, 240, 260, 280];
        const hue  = hues[Math.floor(Math.random() * hues.length)];
        this.color = `hsla(${hue},90%,${60 + Math.random() * 25}%,${0.55 + Math.random() * 0.35})`;
      }
      update() {
        this.vx += (this.originX - this.x) * 0.055;
        this.vy += (this.originY - this.y) * 0.055;
        if (mouse.x !== null) {
          const mdx = this.x - mouse.x, mdy = this.y - mouse.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (dist < REPEL_RADIUS && dist > 0) {
            const f = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
            this.vx += (mdx / dist) * f;
            this.vy += (mdy / dist) * f;
          }
        }
        this.vx *= 0.80; this.vy *= 0.80;
        this.x += this.vx; this.y += this.vy;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 5; ctx.shadowColor = this.color;
        ctx.fill(); ctx.shadowBlur = 0;
      }
    }

    // ── Build scene ───────────────────────────────────────────────────────────
    const W = canvas.width, H2 = canvas.height;

    // 200 evenly spread + 320 extra stars concentrated in the bottom 40%
    const stars = [
      ...Array.from({ length: 200 }, () => new Star(false)),
      ...Array.from({ length: 320 }, () => new Star(true)),
    ];

    // Two galaxies — one main large, one small distant
    const galaxies = [
      new Galaxy(W * 0.5,  H2 * 0.42, { arms: 3, radius: Math.min(W, H2) * 0.23, tilt: 0.40, hue: 225, starCount: 1100, speed: 0.00010 }),
      new Galaxy(W * 0.78, H2 * 0.22, { arms: 2, radius: Math.min(W, H2) * 0.09, tilt: 0.55, hue: 280, starCount: 380,  speed: 0.00018 }),
    ];

    // 4 satellites with hand-crafted orbits so they don't all pile up
    const satellites = [
      new Satellite({ cx: W*0.50, cy: H2*0.42, rx: 155, ry: 55,  tilt: 0.1  }),
      new Satellite({ cx: W*0.50, cy: H2*0.42, rx: 200, ry: 75,  tilt: -0.15 }),
      new Satellite({ cx: W*0.78, cy: H2*0.22, rx: 80,  ry: 28,  tilt: 0.2  }),
      new Satellite({ cx: W*0.30, cy: H2*0.65, rx: 110, ry: 45,  tilt: -0.1 }),
    ];

    const PCNT = Math.min(280, Math.floor((W * H2) / 6500));
    const particles = Array.from({ length: PCNT }, () => new Particle());

    const onResize = () => particles.forEach(p => p.init());
    window.addEventListener("resize", onResize);

    // Mesh lines
    const MAX_LINE = 82;
    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx*dx + dy*dy;
          if (d2 < MAX_LINE * MAX_LINE) {
            const a = (1 - Math.sqrt(d2) / MAX_LINE) * 0.12;
            ctx.strokeStyle = `rgba(160,180,255,${a})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // ── Animate ───────────────────────────────────────────────────────────────
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(s => { s.update(); s.draw(); });
      galaxies.forEach(g => { g.update(); g.draw(); });
      drawLines();
      particles.forEach(p => { p.update(); p.draw(); });
      satellites.forEach(s => { s.update(); s.draw(); });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position : "absolute",
        top      : 0,
        left     : 0,
        width    : "100%",
        height   : "100%",
        pointerEvents : "none",
        zIndex   : 1,        // BEHIND bg image (z-2) and everything else
        display  : "block",
      }}
    />
  );
}