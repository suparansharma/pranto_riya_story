"use client";

import { useEffect, useRef } from "react";

export default function HeartScene3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 320);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 320);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mathematical 3D Heart point generator:
    // x = 16 * sin^3(t)
    // y = -(13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t))
    // z = height modulation along curve
    interface Point3D {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      color: string;
      size: number;
      pulseOffset: number;
    }

    const points: Point3D[] = [];
    const NUM_POINTS = 520;
    const colors = ["#ff2d75", "#ff6b8b", "#ff9bb2", "#f43f5e", "#fda4af", "#ffffff"];

    for (let i = 0; i < NUM_POINTS; i++) {
      const t = Math.PI * 2 * Math.random();
      // Heart parametric equation
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      
      // Give it 3D thickness and slight interior jitter
      const thickness = (Math.random() - 0.5) * 14 * Math.sin(t);
      const interiorScale = 0.85 + Math.random() * 0.25;

      const scale = 8.5 * interiorScale;
      const x = hx * scale;
      const y = hy * scale;
      const z = thickness * scale;

      points.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2.2 + 1.2,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let angleY = 0;
    let angleX = 0.15;
    let time = 0;

    const render = () => {
      time += 0.035;
      angleY += 0.012; // Continuous smooth 3D rotation
      const heartbeat = 1 + Math.pow(Math.sin(time * 2), 6) * 0.12;

      ctx.clearRect(0, 0, width, height);

      // Center coordinates
      const cx = width / 2;
      const cy = height / 2;
      const fov = 350;

      // Project and sort points by Z depth for 3D realism
      const projected = points.map((p) => {
        // Heartbeat pulsation
        const px = p.baseX * heartbeat;
        const py = p.baseY * heartbeat;
        const pz = p.baseZ * heartbeat;

        // Rotation around Y
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = px * cosY - pz * sinY;
        const z1 = pz * cosY + px * sinY;

        // Rotation around X (slight tilt)
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = py * cosX - z1 * sinX;
        const z2 = z1 * cosX + py * sinX;

        // Perspective projection
        const depth = fov / (fov + z2 + 250);
        const screenX = cx + x1 * depth;
        const screenY = cy + y2 * depth;
        const currentSize = p.size * depth * (1 + Math.sin(time * 3 + p.pulseOffset) * 0.3);

        return {
          screenX,
          screenY,
          size: Math.max(0.6, currentSize),
          alpha: Math.min(1, Math.max(0.15, depth * 0.95)),
          z: z2,
          color: p.color,
        };
      });

      // Sort back-to-front
      projected.sort((a, b) => a.z - b.z);

      // Draw 3D glowing particle heart
      for (const p of projected) {
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto my-4 flex items-center justify-center">
      {/* Radiant ambient glow */}
      <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-2xl animate-pulse pointer-events-none" />
      <canvas ref={canvasRef} className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-1 text-[11px] uppercase tracking-widest text-pink-300/60 font-medium">
        3D Interactive Heart
      </div>
    </div>
  );
}
