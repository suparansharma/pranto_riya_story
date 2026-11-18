"use client";

import { useEffect, useState } from "react";

interface FloatingHeart {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Generate static initial hearts on client mount only to prevent hydration mismatch
    const generated: FloatingHeart[] = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      duration: Math.random() * 8 + 7,
      delay: Math.random() * 5,
      size: Math.random() * 18 + 14,
      opacity: Math.random() * 0.45 + 0.25,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-[-40px] text-pink-400 select-none transition-transform"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `floatUp ${heart.duration}s linear ${heart.delay}s infinite`,
          }}
        >
          ❤️
        </div>
      ))}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          85% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-115vh) rotate(360deg) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
