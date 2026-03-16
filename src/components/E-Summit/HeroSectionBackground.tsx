'use client';
import { useEffect, useRef, useCallback } from 'react';

interface AtomBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
}

const AtomBackground = ({ className = '', style }: AtomBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);
  const lastRef = useRef(0);

  const orbitDefs = [
    { rx: 58, ry: 20, tilt: 10, speed: 0.35, phase: 0, eColor: '#00eeff' },
    { rx: 50, ry: 18, tilt: 70, speed: 0.50, phase: 2.1, eColor: '#80f0ff' },
    { rx: 55, ry: 22, tilt: -50, speed: 0.25, phase: 4.2, eColor: '#00aaff' },
  ];

  const noise = useCallback((x: number, s: number) =>
    (Math.sin(x * 127.1 + s * 311.7) * 43758.5453) % 1, []);

  const smoothNoise = useCallback((x: number, s: number) => {
    const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f);
    return noise(i, s) * (1 - u) + noise(i + 1, s) * u;
  }, [noise]);

  const fractalNoise = useCallback((x: number, s: number, octs: number) => {
    let v = 0, a = 0.5, fr = 1;
    for (let i = 0; i < octs; i++) { v += smoothNoise(x * fr, s + i) * a; a *= 0.5; fr *= 2; }
    return v * 2 - 1;
  }, [smoothNoise]);

  const electricPath = useCallback((
    x1: number, y1: number, x2: number, y2: number,
    seed: number, time: number, segments: number
  ) => {
    const pts: { x: number; y: number }[] = [{ x: x1, y: y1 }];
    for (let i = 1; i < segments; i++) {
      const p = i / segments;
      const bx = x1 + (x2 - x1) * p;
      const by = y1 + (y2 - y1) * p;
      const nx = fractalNoise(p * 4 + time * 0.22, seed * 10, 5);
      const ny = fractalNoise(p * 4 + time * 0.22, seed * 10 + 7, 5);
      const perp = { x: -(y2 - y1), y: x2 - x1 };
      const len = Math.sqrt(perp.x * perp.x + perp.y * perp.y) || 1;
      const dist = 55 * (1 - Math.abs(p * 2 - 1));
      pts.push({
        x: bx + nx * dist + ny * 18 * (perp.x / len),
        y: by + ny * dist + nx * 18 * (perp.y / len),
      });
    }
    pts.push({ x: x2, y: y2 });
    return pts;
  }, [fractalNoise]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sceneEl = sceneRef.current;
    const centerEl = centerRef.current;
    if (!canvas || !sceneEl || !centerEl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      p: Math.random() * Math.PI * 2,
      s: Math.random() * 0.008 + 0.002,
    }));

    function resize() {
      W = sceneEl!.offsetWidth;
      H = sceneEl!.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = W + 'px';
      canvas!.style.height = H + 'px';
      ctx!.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    const PAD = 90;
    const corners = () => [
      { x: PAD, y: PAD },
      { x: W - PAD, y: PAD },
      { x: W - PAD, y: H - PAD },
      { x: PAD, y: H - PAD },
    ];

    function drawStars() {
      stars.forEach(s => {
        s.p += s.s;
        const a = (Math.sin(s.p) * 0.4 + 0.5) * 0.7;
        ctx!.beginPath();
        ctx!.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(180,235,255,${a})`;
        ctx!.fill();
      });
    }

    function drawAtomAt(cx: number, cy: number, scale: number, time: number, idx: number) {
      orbitDefs.forEach(o => {
        const rad = (o.tilt * Math.PI) / 180;
        ctx!.save();
        ctx!.translate(cx, cy);
        ctx!.rotate(rad);
        ctx!.beginPath();
        ctx!.ellipse(0, 0, o.rx * scale, o.ry * scale, 0, 0, Math.PI * 2);
        ctx!.strokeStyle = 'rgba(0,180,220,0.35)';
        ctx!.lineWidth = 1;
        ctx!.stroke();
        ctx!.restore();

        const angle = o.phase + time * o.speed + idx * 1.3;
        const lx = Math.cos(angle) * o.rx * scale;
        const ly = Math.sin(angle) * o.ry * scale;
        const ex = cx + lx * Math.cos(rad) - ly * Math.sin(rad);
        const ey = cy + lx * Math.sin(rad) + ly * Math.cos(rad);

        const eg = ctx!.createRadialGradient(ex, ey, 0, ex, ey, 7 * scale);
        eg.addColorStop(0, 'rgba(220,255,255,0.9)');
        eg.addColorStop(0.4, o.eColor);
        eg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx!.beginPath();
        ctx!.arc(ex, ey, 7 * scale, 0, Math.PI * 2);
        ctx!.fillStyle = eg;
        ctx!.fill();
      });

      // Nucleus glow only — no filled sphere
      const pr = 1 + Math.sin(time * 2.5 + idx) * 0.07;
      const r = 14 * scale * pr;
      const ng = ctx!.createRadialGradient(cx - 3 * scale, cy - 3 * scale, 0.5, cx, cy, r);
      ng.addColorStop(0, '#d0faff');
      ng.addColorStop(0.3, '#00d4ff');
      ng.addColorStop(0.7, '#0055aa');
      ng.addColorStop(1, '#001530');
      ctx!.beginPath();
      ctx!.arc(cx, cy, r, 0, Math.PI * 2);
      ctx!.fillStyle = ng;
      ctx!.fill();

      ctx!.beginPath();
      ctx!.arc(cx, cy, r, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(0,220,255,${0.4 + Math.sin(time * 2 + idx) * 0.25})`;
      ctx!.lineWidth = 1;
      ctx!.stroke();

      const sg = ctx!.createRadialGradient(cx - 4 * scale, cy - 4 * scale, 0, cx - 4 * scale, cy - 4 * scale, r * 0.45);
      sg.addColorStop(0, 'rgba(255,255,255,0.7)');
      sg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx!.beginPath();
      ctx!.arc(cx - 4 * scale, cy - 4 * scale, r * 0.45, 0, Math.PI * 2);
      ctx!.fillStyle = sg;
      ctx!.fill();
    }

    function drawElectricLine(
      pts: { x: number; y: number }[],
      alpha: number, lineWidth: number,
      colorA: string, colorB: string
    ) {
      if (pts.length < 2) return;
      ctx!.beginPath();
      ctx!.moveTo(pts[0].x, pts[0].y);
      pts.slice(1).forEach(p => ctx!.lineTo(p.x, p.y));
      ctx!.strokeStyle = colorA.replace('1)', `${alpha})`);
      ctx!.lineWidth = lineWidth * 2;
      ctx!.stroke();

      ctx!.beginPath();
      ctx!.moveTo(pts[0].x, pts[0].y);
      pts.slice(1).forEach(p => ctx!.lineTo(p.x, p.y));
      ctx!.strokeStyle = colorB.replace('1)', `${alpha * 0.9})`);
      ctx!.lineWidth = lineWidth;
      ctx!.stroke();
    }

    function drawCenterGlow(lx: number, ly: number) {
      const g = ctx!.createRadialGradient(lx, ly, 0, lx, ly, 120);
      g.addColorStop(0, 'rgba(0,200,255,0.10)');
      g.addColorStop(0.5, 'rgba(0,100,200,0.05)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, W, H);
    }

    function frame(ts: number) {
      const dt = (ts - lastRef.current) / 1000;
      lastRef.current = ts;
      tRef.current += dt;
      const t = tRef.current;

      const dpr = window.devicePixelRatio || 1;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.scale(dpr, dpr);

      const bgGrad = ctx!.createRadialGradient(W / 2, H / 2, 10, W / 2, H / 2, Math.max(W, H) * 0.75);
      bgGrad.addColorStop(0, 'rgba(0,20,45,0.95)');
      bgGrad.addColorStop(1, 'rgba(0,5,15,0.98)');
      ctx!.fillStyle = bgGrad;
      ctx!.fillRect(0, 0, W, H);

      drawStars();

      const centerRect = centerEl!.getBoundingClientRect();
      const sceneRect = sceneEl!.getBoundingClientRect();
      const lx = centerRect.left - sceneRect.left + centerRect.width / 2;
      const ly = centerRect.top - sceneRect.top + centerRect.height / 2;

      drawCenterGlow(lx, ly);

      const cs = corners();

      cs.forEach((c, i) => {
        const seed = i * 3.7 + 1.2;
        const flicker = 0.55 + Math.sin(t * 0.7 + i * 1.7) * 0.25 + Math.random() * 0.08;

        for (let b = 0; b < 2; b++) {
          const bSeed = seed + b * 1.9 + t * 0.025;
          const pts = electricPath(c.x, c.y, lx, ly, bSeed, t + b * 0.8, 22);
          drawElectricLine(pts, flicker * (b === 0 ? 1 : 0.5), b === 0 ? 1.5 : 0.7,
            'rgba(0,230,255,1)', 'rgba(180,240,255,1)');
        }

        const sparkFlicker = 0.25 + Math.sin(t * 1.2 + i) * 0.2;
        for (let s = 0; s < 3; s++) {
          const sp = electricPath(
            c.x, c.y,
            lx + (Math.random() - 0.5) * 20,
            ly + (Math.random() - 0.5) * 20,
            seed + s * 7.3, t + s * 0.4, 10
          );
          drawElectricLine(sp, sparkFlicker * 0.28, 0.4, 'rgba(120,220,255,1)', 'rgba(200,245,255,1)');
        }
      });

      cs.forEach((c, i) => drawAtomAt(c.x, c.y, 0.7, t, i));

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(ts => { lastRef.current = ts; frame(ts); });

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electricPath, fractalNoise]);

  return (
    <div
      ref={sceneRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div
        ref={centerRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   flex items-center justify-center"
        aria-hidden="true"
      >
        {/* Soft glow ring around the logo */}
        <span
          className="absolute rounded-full"
          style={{
            width: 120, height: 120,
            background: 'radial-gradient(circle, rgba(0,200,255,0.18) 0%, rgba(0,100,200,0.08) 50%, transparent 75%)',
            animation: 'logoPulse 3s ease-in-out infinite',
          }}
        />

        <img
          src="E-Summit Logo.png"
          alt="Logo"
          width="600"
          height="600"
        />
        {/* <span
          id="atom-logo-slot"
          className="relative z-10 flex items-center justify-center"
          style={{ width: 72, height: 72 }}
        >
          <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72">
            <text x="36" y="52" textAnchor="middle" fontSize="48" fill="white" style={{filter:'drop-shadow(0 0 8px #00eeff)'}}>⚛</text>
          </svg>
        </span> */}
      </div>

      <style>{`
        @keyframes logoPulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1);   opacity: 0.7; }
          50%       { transform: translate(-50%,-50%) scale(1.15); opacity: 1;   }
        }
      `}</style>
    </div>
  );
};

export default AtomBackground;