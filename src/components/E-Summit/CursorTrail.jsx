"use client";
import { useEffect, useRef, useState } from "react";

export default function CursorTrail() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const lastSpawn = useRef(0);
  const rafId = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Disable on mobile/touch devices - no cursor to trail
    const checkMobile = () => {
      const mobile =
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(max-width: 768px)").matches ||
        "ontouchstart" in window;
      setIsMobile(mobile);
      return mobile;
    };

    if (checkMobile()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use 2d context with performance hints
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    // Use half resolution for better performance
    const scale = 0.5;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * scale;
      canvas.height = height * scale;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.scale(scale, scale);
    };

    setupCanvas();

    const resize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before resize
      setupCanvas();
    };

    window.addEventListener("resize", resize, { passive: true });

    const addParticle = (x, y) => {
      // Stricter particle limit
      if (particles.current.length > 30) return;

      particles.current.push({
        x,
        y,
        size: Math.random() * 4 + 2,
        life: 1,
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: (Math.random() - 0.5) * 1.2,
      });
    };

    const handleMouseMove = (e) => {
      // Throttle: spawn particle only every 25ms (~40fps input)
      const now = performance.now();
      if (now - lastSpawn.current < 25) return;
      lastSpawn.current = now;

      addParticle(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      // Clear with faster method
      ctx.clearRect(0, 0, width, height);

      const len = particles.current.length;
      if (len === 0) {
        rafId.current = requestAnimationFrame(animate);
        return;
      }

      // Batch all particles with same fill style
      ctx.fillStyle = "rgba(255, 215, 0, 0.8)";

      let writeIdx = 0;
      for (let i = 0; i < len; i++) {
        const p = particles.current[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.06; // Even faster decay

        if (p.life > 0) {
          particles.current[writeIdx++] = p;
          ctx.globalAlpha = p.life;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      particles.current.length = writeIdx;
      ctx.globalAlpha = 1;

      rafId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Don't render canvas on mobile
  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "contents",
      }}
    />
  );
}
