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

    const REPEL_RADIUS = 130;
    const REPEL_STRENGTH = 7;

    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      canvas.width  = p.offsetWidth;
      canvas.height = p.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

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
    // 1. NEBULA CLOUDS — layered volumetric gas
    // ══════════════════════════════════════════════════════════════════════════
    class Nebula {
      constructor(opts = {}) {
        this.x     = opts.x     || Math.random() * canvas.width;
        this.y     = opts.y     || Math.random() * canvas.height;
        this.rx    = opts.rx    || 180 + Math.random() * 260;
        this.ry    = opts.ry    || 100 + Math.random() * 180;
        this.hue   = opts.hue   || [260, 200, 300, 180][Math.floor(Math.random() * 4)];
        this.alpha = opts.alpha || 0.07 + Math.random() * 0.10;
        this.rot   = Math.random() * Math.PI;
        this.drift = (Math.random() - 0.5) * 0.00008;
        this.layers = opts.layers || 5;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        this.rot += this.drift;
        for (let l = 0; l < this.layers; l++) {
          const f   = 1 - l / this.layers;
          const rx  = this.rx * (0.3 + 0.7 * f) * (0.85 + Math.random() * 0.3);
          const ry  = this.ry * (0.3 + 0.7 * f) * (0.85 + Math.random() * 0.3);
          const hue = this.hue + l * 15;
          const sat = 65 + l * 5;
          const lit = 40 + l * 8;
          const a   = this.alpha * f * (0.6 + Math.random() * 0.4);
          const g   = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, ry));
          g.addColorStop(0,   `hsla(${hue},${sat}%,${lit + 25}%,${a})`);
          g.addColorStop(0.4, `hsla(${hue},${sat}%,${lit}%,${a * 0.6})`);
          g.addColorStop(1,   `hsla(${hue},${sat}%,${lit}%,0)`);
          ctx.save();
          ctx.scale(1, ry / rx);
          ctx.beginPath();
          ctx.arc(0, 0, rx, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
          ctx.restore();
        }
        ctx.restore();
      }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 2. TWINKLING STARS — colored types (blue giants, yellow, red dwarfs)
    // ══════════════════════════════════════════════════════════════════════════
    class Star {
      constructor(forceBottom = false) { this.forceBottom = forceBottom; this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = this.forceBottom
          ? canvas.height * (0.60 + Math.random() * 0.40)
          : Math.random() * canvas.height;
        this.r = this.forceBottom
          ? Math.random() * 1.6 + 0.25
          : Math.random() * 1.2 + 0.15;
        this.alpha = Math.random();
        this.dA    = (Math.random() * 0.006 + 0.001) * (Math.random() < 0.5 ? 1 : -1);
        // Star color type
        const roll = Math.random();
        if      (roll < 0.55) { this.hue = 215; this.sat = 80; this.lit = 90; } // blue-white
        else if (roll < 0.75) { this.hue = 45;  this.sat = 90; this.lit = 95; } // yellow
        else if (roll < 0.90) { this.hue = 20;  this.sat = 80; this.lit = 80; } // orange
        else                  { this.hue = 0;   this.sat = 90; this.lit = 75; } // red dwarf
        // Rare bright star with cross-diffraction spike
        this.bright = this.r > 1.2 && Math.random() < 0.25;
      }
      update() {
        this.alpha += this.dA;
        if (this.alpha > 1 || this.alpha < 0) this.dA *= -1;
      }
      draw() {
        const a = Math.max(0, Math.min(1, this.alpha));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue},${this.sat}%,${this.lit}%,${a})`;
        if (this.bright) {
          ctx.shadowBlur  = 6;
          ctx.shadowColor = `hsla(${this.hue},${this.sat}%,${this.lit}%,0.8)`;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
        // Diffraction spikes on bright stars
        if (this.bright && a > 0.5) {
          const spikeLen = this.r * 5;
          ctx.save();
          ctx.globalAlpha = a * 0.35;
          for (let i = 0; i < 2; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x - (i === 0 ? spikeLen : 0), this.y - (i === 1 ? spikeLen : 0));
            ctx.lineTo(this.x + (i === 0 ? spikeLen : 0), this.y + (i === 1 ? spikeLen : 0));
            ctx.strokeStyle = `hsla(${this.hue},${this.sat}%,${this.lit}%,1)`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
          ctx.restore();
        }
      }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 3. SHOOTING STARS
    // ══════════════════════════════════════════════════════════════════════════
    class ShootingStar {
      constructor() { this.reset(); }
      reset() {
        this.x     = Math.random() * canvas.width * 0.7;
        this.y     = Math.random() * canvas.height * 0.5;
        this.len   = 80 + Math.random() * 160;
        this.speed = 8 + Math.random() * 14;
        this.angle = Math.PI / 6 + (Math.random() - 0.5) * 0.4;
        this.life  = 0;
        this.maxLife = 30 + Math.random() * 30;
        this.hue   = 200 + Math.random() * 60;
        this.active = false;
        this.nextSpawn = 120 + Math.floor(Math.random() * 400);
        this.timer = 0;
      }
      update() {
        this.timer++;
        if (!this.active && this.timer >= this.nextSpawn) {
          this.active = true;
          this.x    = Math.random() * canvas.width * 0.7;
          this.y    = Math.random() * canvas.height * 0.35;
          this.life = 0;
        }
        if (this.active) {
          this.x    += Math.cos(this.angle) * this.speed;
          this.y    += Math.sin(this.angle) * this.speed;
          this.life++;
          if (this.life >= this.maxLife) { this.active = false; this.timer = 0; this.nextSpawn = 120 + Math.floor(Math.random() * 400); }
        }
      }
      draw() {
        if (!this.active) return;
        const frac   = this.life / this.maxLife;
        const alpha  = frac < 0.2 ? frac / 0.2 : frac > 0.7 ? (1 - frac) / 0.3 : 1;
        const tailX  = this.x - Math.cos(this.angle) * this.len;
        const tailY  = this.y - Math.sin(this.angle) * this.len;
        const grad   = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(0.6, `hsla(${this.hue},90%,85%,${alpha * 0.3})`);
        grad.addColorStop(1,   `hsla(${this.hue},100%,98%,${alpha})`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.5;
        ctx.shadowBlur  = 8;
        ctx.shadowColor = `hsla(${this.hue},100%,90%,${alpha})`;
        ctx.stroke();
        ctx.shadowBlur = 0;
        // Head flash
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.9})`;
        ctx.fill();
      }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 4. REALISTIC GALAXY — richer arms, dual-color warm/cool gradient
    // ══════════════════════════════════════════════════════════════════════════
    class Galaxy {
      constructor(cx, cy, opts = {}) {
        this.cx     = cx;
        this.cy     = cy;
        this.arms   = opts.arms   || 3;
        this.radius = opts.radius || Math.min(canvas.width, canvas.height) * 0.22;
        this.tilt   = opts.tilt   || 0.42;
        this.rot    = opts.rot    || 0;
        this.speed  = opts.speed  || 0.00012;
        this.coreHue = opts.coreHue || 45;   // warm nucleus
        this.armHue  = opts.armHue  || 220;  // cool arms
        this.stars  = [];

        const N = opts.starCount || 1200;
        for (let i = 0; i < N; i++) {
          const arm    = i % this.arms;
          const t      = (i / N);
          const theta  = t * Math.PI * 5 + (arm / this.arms) * Math.PI * 2;
          const r      = this.radius * (0.04 + 0.96 * t);
          const scatter = (Math.random() + Math.random() - 1) * r * 0.15;
          // Color: warm near center, cool at arms
          const hue    = t < 0.25
            ? this.coreHue + (Math.random() - 0.5) * 30
            : this.armHue  + (Math.random() - 0.5) * 50;
          this.stars.push({
            angle:  theta + scatter * 0.035,
            radius: r + scatter,
            size:   Math.random() < 0.035
              ? Math.random() * 2.2 + 1.1
              : Math.random() * 0.95 + 0.15,
            alpha:  t < 0.15 ? 0.35 + Math.random() * 0.5 : 0.12 + Math.random() * 0.7,
            hue,
            light:  t < 0.15 ? 70 + Math.random() * 25 : 55 + Math.random() * 35,
            speed:  (opts.speed || 0.00012) * (0.5 + Math.random() * 1.0),
          });
        }
        // Dust lane particles
        this.dust = [];
        for (let i = 0; i < 180; i++) {
          const arm   = i % this.arms;
          const t     = 0.1 + Math.random() * 0.65;
          const theta = t * Math.PI * 4 + (arm / this.arms) * Math.PI * 2;
          const r     = this.radius * t;
          this.dust.push({
            angle:  theta + (Math.random() - 0.5) * 0.4,
            radius: r,
            size:   4 + Math.random() * 8,
            alpha:  0.04 + Math.random() * 0.10,
          });
        }
      }

      update() { this.rot += this.speed; }

      draw() {
        ctx.save();
        ctx.translate(this.cx, this.cy);
        ctx.scale(1, this.tilt);
        ctx.rotate(this.rot);

        // Outer halo (two-tone)
        const halo = ctx.createRadialGradient(0, 0, this.radius * 0.2, 0, 0, this.radius * 1.25);
        halo.addColorStop(0,   `hsla(${this.coreHue},80%,75%,0.10)`);
        halo.addColorStop(0.4, `hsla(${this.armHue},65%,55%,0.05)`);
        halo.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(0, 0, this.radius * 1.25, 0, Math.PI * 2); ctx.fill();

        // Dust lanes (dark absorption)
        for (const d of this.dust) {
          const x = Math.cos(d.angle) * d.radius;
          const y = Math.sin(d.angle) * d.radius;
          const g = ctx.createRadialGradient(x, y, 0, x, y, d.size);
          g.addColorStop(0, `rgba(0,0,8,${d.alpha * 1.5})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(x, y, d.size, 0, Math.PI * 2); ctx.fill();
        }

        // Star particles
        for (const s of this.stars) {
          const x = Math.cos(s.angle) * s.radius;
          const y = Math.sin(s.angle) * s.radius;
          ctx.beginPath();
          ctx.arc(x, y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${s.hue},88%,${s.light}%,${s.alpha})`;
          if (s.size > 1.4) {
            ctx.shadowBlur  = 7;
            ctx.shadowColor = `hsla(${s.hue},100%,88%,0.75)`;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Bright nucleus glow (multi-stop)
        const nuc = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius * 0.22);
        nuc.addColorStop(0,    `hsla(${this.coreHue + 30},100%,99%,0.98)`);
        nuc.addColorStop(0.08, `hsla(${this.coreHue + 15},100%,92%,0.88)`);
        nuc.addColorStop(0.25, `hsla(${this.coreHue},90%,72%,0.60)`);
        nuc.addColorStop(0.55, `hsla(${this.armHue},70%,45%,0.25)`);
        nuc.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.fillStyle = nuc;
        ctx.beginPath(); ctx.arc(0, 0, this.radius * 0.22, 0, Math.PI * 2); ctx.fill();

        // Airy diffraction ring
        ctx.save();
        ctx.globalAlpha = 0.12;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.08, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${this.coreHue + 20},100%,95%,1)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        // Lens-flare spikes
        ctx.save();
        ctx.globalAlpha = 0.22;
        for (let i = 0; i < 4; i++) {
          ctx.save();
          ctx.rotate((i / 4) * Math.PI);
          const spike = ctx.createLinearGradient(0, -this.radius * 0.32, 0, this.radius * 0.32);
          spike.addColorStop(0,   "rgba(255,255,255,0)");
          spike.addColorStop(0.5, `hsla(${this.coreHue + 20},100%,97%,0.9)`);
          spike.addColorStop(1,   "rgba(255,255,255,0)");
          ctx.fillStyle = spike;
          ctx.fillRect(-1.2, -this.radius * 0.32, 2.4, this.radius * 0.64);
          ctx.restore();
        }
        ctx.restore();

        ctx.restore();
      }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 5. REALISTIC SATELLITES — brighter plumes, detailed panels
    // ══════════════════════════════════════════════════════════════════════════
    class Satellite {
      constructor(opts = {}) {
        this.cx        = opts.cx  || canvas.width  * (0.15 + Math.random() * 0.7);
        this.cy        = opts.cy  || canvas.height * (0.15 + Math.random() * 0.7);
        this.rx        = opts.rx  || 90  + Math.random() * 130;
        this.ry        = opts.ry  || 35  + Math.random() * 70;
        this.angle     = Math.random() * Math.PI * 2;
        this.speed     = (0.0025 + Math.random() * 0.003) * (Math.random() < 0.5 ? 1 : -1);
        this.tiltAngle = opts.tilt || (Math.random() - 0.5) * 0.5;
        this.hue       = [180, 200, 220, 260, 300][Math.floor(Math.random() * 5)];
        this.scale     = 0.55 + Math.random() * 0.6;
        this.trail     = [];
        this.trailLen  = 60 + Math.floor(Math.random() * 40);
        this.plumePulse = Math.random() * Math.PI * 2;
      }

      _pos(angle) {
        return {
          x: this.cx + Math.cos(angle) * this.rx,
          y: this.cy + Math.sin(angle) * this.ry,
        };
      }

      update() {
        this.angle += this.speed;
        this.plumePulse += 0.15;
        const pos = this._pos(this.angle);
        this.trail.unshift({ x: pos.x, y: pos.y });
        if (this.trail.length > this.trailLen) this.trail.pop();
      }

      draw() {
        if (this.trail.length < 2) return;

        // Trail
        for (let i = 1; i < this.trail.length; i++) {
          const frac  = 1 - i / this.trail.length;
          const alpha = frac * 0.75;
          const width = frac * 2.6 * this.scale;
          ctx.beginPath();
          ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y);
          ctx.lineTo(this.trail[i].x,     this.trail[i].y);
          ctx.strokeStyle = `hsla(${this.hue},95%,80%,${alpha})`;
          ctx.lineWidth   = Math.max(0.2, width);
          ctx.shadowBlur  = frac > 0.6 ? 8 : 0;
          ctx.shadowColor = `hsla(${this.hue},100%,85%,0.6)`;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        const { x, y } = this.trail[0];
        const heading  = this.angle + (this.speed > 0 ? Math.PI / 2 : -Math.PI / 2);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(heading);
        ctx.scale(this.scale, this.scale);

        const H = this.hue;
        const pulse = 0.7 + 0.3 * Math.sin(this.plumePulse);

        // Engine plume (animated)
        const glow = ctx.createRadialGradient(0, 8, 0, 0, 10, 16 * pulse);
        glow.addColorStop(0,   `hsla(${H + 30},100%,95%,0.95)`);
        glow.addColorStop(0.3, `hsla(${H},100%,70%,0.70)`);
        glow.addColorStop(0.7, `hsla(${H - 20},90%,50%,0.35)`);
        glow.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(0, 10, 16 * pulse, 0, Math.PI * 2); ctx.fill();

        // Solar panel left
        ctx.save();
        ctx.translate(-14, 0);
        ctx.fillStyle = `hsla(215,70%,20%,0.95)`;
        ctx.fillRect(-15, -4.5, 15, 9);
        ctx.strokeStyle = `hsla(200,85%,60%,0.65)`;
        ctx.lineWidth = 0.7;
        for (let c = 1; c < 5; c++) { ctx.beginPath(); ctx.moveTo(-15 + c * 3, -4.5); ctx.lineTo(-15 + c * 3, 4.5); ctx.stroke(); }
        ctx.beginPath(); ctx.moveTo(-15, 0); ctx.lineTo(0, 0); ctx.stroke();
        const shL = ctx.createLinearGradient(-15, -4.5, 0, 4.5);
        shL.addColorStop(0,   "rgba(140,200,255,0.22)");
        shL.addColorStop(0.5, "rgba(80,140,255,0.10)");
        shL.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = shL; ctx.fillRect(-15, -4.5, 15, 9);
        ctx.restore();

        // Solar panel right
        ctx.save();
        ctx.translate(14, 0);
        ctx.fillStyle = `hsla(215,70%,20%,0.95)`;
        ctx.fillRect(0, -4.5, 15, 9);
        ctx.strokeStyle = `hsla(200,85%,60%,0.65)`;
        ctx.lineWidth = 0.7;
        for (let c = 1; c < 5; c++) { ctx.beginPath(); ctx.moveTo(c * 3, -4.5); ctx.lineTo(c * 3, 4.5); ctx.stroke(); }
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(15, 0); ctx.stroke();
        const shR = ctx.createLinearGradient(0, -4.5, 15, 4.5);
        shR.addColorStop(0,   "rgba(140,200,255,0.22)");
        shR.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = shR; ctx.fillRect(0, -4.5, 15, 9);
        ctx.restore();

        // Main body
        const bw = 9, bh = 16;
        ctx.beginPath();
        ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 2.5);
        const bodyGrad = ctx.createLinearGradient(-bw / 2, 0, bw / 2, 0);
        bodyGrad.addColorStop(0,   `hsla(${H},50%,22%,1)`);
        bodyGrad.addColorStop(0.35,`hsla(${H},65%,55%,1)`);
        bodyGrad.addColorStop(0.65,`hsla(${H},60%,42%,1)`);
        bodyGrad.addColorStop(1,   `hsla(${H},45%,18%,1)`);
        ctx.fillStyle = bodyGrad; ctx.fill();
        ctx.beginPath(); ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 2.5);
        ctx.strokeStyle = `hsla(${H},90%,78%,0.5)`; ctx.lineWidth = 0.9; ctx.stroke();

        // Viewport
        ctx.beginPath(); ctx.arc(0, -3, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${H + 30},100%,82%,0.92)`;
        ctx.shadowBlur = 7; ctx.shadowColor = `hsla(${H},100%,82%,0.9)`; ctx.fill();
        ctx.shadowBlur = 0;

        // Antenna
        ctx.save();
        ctx.translate(0, -bh / 2 - 1);
        ctx.strokeStyle = `rgba(210,228,255,0.8)`; ctx.lineWidth = 0.9;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -5.5); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, -5.5, 3.8, Math.PI, Math.PI * 2);
        ctx.strokeStyle = `hsla(${H + 10},85%,80%,0.85)`; ctx.lineWidth = 1.1; ctx.stroke();
        ctx.beginPath(); ctx.arc(0, -5.5, 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${H},100%,92%,1)`; ctx.fill();
        ctx.restore();

        ctx.restore();
      }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 6. INTERACTIVE PARTICLES
    // ══════════════════════════════════════════════════════════════════════════
    class Particle {
      constructor() { this.init(); }
      init() {
        this.originX = Math.random() * canvas.width;
        this.originY = Math.random() * canvas.height;
        this.x = this.originX; this.y = this.originY;
        this.vx = 0; this.vy = 0;
        this.size = Math.random() * 2.4 + 0.7;
        const hues = [195, 215, 235, 255, 275, 300];
        const hue  = hues[Math.floor(Math.random() * hues.length)];
        this.color = `hsla(${hue},92%,${65 + Math.random() * 25}%,${0.50 + Math.random() * 0.40})`;
        this.glowColor = `hsla(${hue},100%,80%,0.4)`;
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
        ctx.shadowBlur  = 8;
        ctx.shadowColor = this.glowColor;
        ctx.fill(); ctx.shadowBlur = 0;
      }
    }

    // ── Build scene ───────────────────────────────────────────────────────────
    const W = canvas.width, H2 = canvas.height;

    // Nebulae — placed around galaxies and edges
    const nebulae = [
      new Nebula({ x: W * 0.50, y: H2 * 0.42, rx: 280, ry: 160, hue: 255, alpha: 0.10, layers: 6 }),
      new Nebula({ x: W * 0.78, y: H2 * 0.22, rx: 140, ry: 90,  hue: 290, alpha: 0.09, layers: 4 }),
      new Nebula({ x: W * 0.15, y: H2 * 0.70, rx: 200, ry: 120, hue: 195, alpha: 0.08, layers: 5 }),
      new Nebula({ x: W * 0.88, y: H2 * 0.75, rx: 170, ry: 100, hue: 220, alpha: 0.07, layers: 4 }),
    ];

    const stars = [
      ...Array.from({ length: 250 }, () => new Star(false)),
      ...Array.from({ length: 380 }, () => new Star(true)),
    ];

    const galaxies = [
      new Galaxy(W * 0.50, H2 * 0.42, { arms: 3, radius: Math.min(W, H2) * 0.24, tilt: 0.40, coreHue: 45, armHue: 220, starCount: 1300, speed: 0.000095 }),
      new Galaxy(W * 0.78, H2 * 0.22, { arms: 2, radius: Math.min(W, H2) * 0.095, tilt: 0.55, coreHue: 35, armHue: 280, starCount: 440,  speed: 0.00017 }),
    ];

    const satellites = [
      new Satellite({ cx: W*0.50, cy: H2*0.42, rx: 160, ry: 58,  tilt:  0.1  }),
      new Satellite({ cx: W*0.50, cy: H2*0.42, rx: 208, ry: 78,  tilt: -0.15 }),
      new Satellite({ cx: W*0.78, cy: H2*0.22, rx: 82,  ry: 30,  tilt:  0.2  }),
      new Satellite({ cx: W*0.30, cy: H2*0.65, rx: 115, ry: 48,  tilt: -0.1  }),
    ];

    const shootingStars = Array.from({ length: 3 }, () => new ShootingStar());

    const PCNT = Math.min(300, Math.floor((W * H2) / 6200));
    const particles = Array.from({ length: PCNT }, () => new Particle());

    const onResize = () => particles.forEach(p => p.init());
    window.addEventListener("resize", onResize);

    // Mesh lines
    const MAX_LINE = 88;
    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx*dx + dy*dy;
          if (d2 < MAX_LINE * MAX_LINE) {
            const a = (1 - Math.sqrt(d2) / MAX_LINE) * 0.14;
            ctx.strokeStyle = `rgba(140,170,255,${a})`;
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

      nebulae.forEach(n => n.draw());
      stars.forEach(s => { s.update(); s.draw(); });
      shootingStars.forEach(s => { s.update(); s.draw(); });
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
        position     : "absolute",
        top          : 0,
        left         : 0,
        width        : "100%",
        height       : "100%",
        pointerEvents: "none",
        zIndex       : 1,
        display      : "block",
      }}
    />
  );
}