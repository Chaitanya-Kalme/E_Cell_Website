'use client';
import { useRef, useEffect, useCallback } from 'react';
// import './BlobCursor.css';

export default function BlobCursor({
  fillColor = '#5227FF',
  trailLifetime = 700,
  trailWidth = 5.5,
  dotSize = 8,
  minDist = 4,
  zIndex = 100,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const pointsRef = useRef([]);
  const rafRef = useRef(null);

  const hexToRgb = useCallback((hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
  }, []);

  const getCatmullRomPoint = (p0, p1, p2, p3, t) => {
    const t2 = t * t, t3 = t2 * t;
    return {
      x: 0.5 * ((2*p1.x) + (-p0.x+p2.x)*t + (2*p0.x-5*p1.x+4*p2.x-p3.x)*t2 + (-p0.x+3*p1.x-3*p2.x+p3.x)*t3),
      y: 0.5 * ((2*p1.y) + (-p0.y+p2.y)*t + (2*p0.y-5*p1.y+4*p2.y-p3.y)*t2 + (-p0.y+3*p1.y-3*p2.y+p3.y)*t3),
    };
  };

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const now = Date.now();
    const rgb = hexToRgb(fillColor);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pointsRef.current = pointsRef.current.filter(p => now - p.t < trailLifetime);
    const pts = pointsRef.current;
    if (pts.length < 2) {
      rafRef.current = requestAnimationFrame(draw);
      return;
    }

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[Math.min(pts.length - 1, i + 1)];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];

      const steps = 8;
      for (let s = 0; s < steps; s++) {
        const a = getCatmullRomPoint(p0, p1, p2, p3, s / steps);
        const b = getCatmullRomPoint(p0, p1, p2, p3, (s + 1) / steps);

        const age = now - p1.t;
        const frac = 1 - age / trailLifetime;
        if (frac <= 0) continue;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${rgb},${(frac * 0.88).toFixed(3)})`;
        ctx.lineWidth = Math.max(0.5, frac * trailWidth);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [fillColor, trailLifetime, trailWidth, hexToRgb]);

  const handleMove = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;
    const cx = x - rect.left;
    const cy = y - rect.top;

    // Minimum distance gate — prevents point clusters when moving slowly
    const pts = pointsRef.current;
    const last = pts[pts.length - 1];
    if (last) {
      const dx = cx - last.x, dy = cy - last.y;
      if (Math.sqrt(dx * dx + dy * dy) < minDist) return;
    }

    pointsRef.current.push({ x: cx, y: cy, t: Date.now() });

    if (dotRef.current) {
      dotRef.current.style.left = `${cx}px`;
      dotRef.current.style.top = `${cy}px`;
    }
  }, [minDist]);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [resize, draw]);

  return (
    <div
      ref={containerRef}
      className="blob-container"
      style={{ zIndex, cursor: 'none' }}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <canvas ref={canvasRef} className="blob-canvas" />
      <div
        ref={dotRef}
        className="blob-dot"
        style={{
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          backgroundColor: fillColor,
        }}
      />
    </div>
  );
}