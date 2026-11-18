"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Calendar, HeartHandshake } from "lucide-react";

export default function Counter() {
  // Wedding Date: 26 November 2025 (1st Anniversary is 26 November 2026)
  // Let's compute time since marriage!
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isAnniversaryDay: false,
  });

  useEffect(() => {
    // 26 Nov 2025 at 00:00:00 (Wedding date since 26/11/2026 is 1 year)
    const weddingDate = new Date("2025-11-26T00:00:00");
    const anniversaryDate = new Date("2026-11-26T00:00:00");

    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - weddingDate.getTime();

      const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
      const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
      const seconds = Math.max(0, Math.floor((diff / 1000) % 60));

      // Check if today is the exact anniversary day (Nov 26, 2026)
      const isAnniversary =
        now.getFullYear() >= 2026 &&
        now.getMonth() === 10 && // November is 10 (0-indexed)
        now.getDate() === 26;

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isAnniversaryDay: isAnniversary,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerCelebration = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#ec4899", "#f43f5e", "#fb7185", "#ffd1dc", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="glass-card rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden border border-pink-500/20">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium mb-5">
          <Calendar className="w-4 h-4 text-pink-400" />
          <span>২৬ নভেম্বর ২০২৫ — অনন্তকালের শুরু</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
          আমাদের একসাথে কাটানো মিষ্টি সময়
        </h3>
        <p className="text-pink-200/80 text-sm sm:text-base max-w-lg mx-auto mb-8 font-light">
          প্রতিটি সেকেন্ড, প্রতিটি দিন তোমার পাশে থাকা আমার জীবনের শ্রেষ্ঠ উপহার, রিয়া ❤️
        </p>

        {/* Counter Units */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-8">
          <div className="bg-slate-900/60 border border-pink-500/20 rounded-2xl p-4 sm:p-6 transition-all hover:border-pink-400/40 hover:scale-[1.02]">
            <span className="block text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">
              {timeLeft.days}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-wider text-pink-200/70 mt-1 block">
              দিন (Days)
            </span>
          </div>

          <div className="bg-slate-900/60 border border-pink-500/20 rounded-2xl p-4 sm:p-6 transition-all hover:border-pink-400/40 hover:scale-[1.02]">
            <span className="block text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-wider text-pink-200/70 mt-1 block">
              ঘণ্টা (Hours)
            </span>
          </div>

          <div className="bg-slate-900/60 border border-pink-500/20 rounded-2xl p-4 sm:p-6 transition-all hover:border-pink-400/40 hover:scale-[1.02]">
            <span className="block text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-wider text-pink-200/70 mt-1 block">
              মিনিট (Minutes)
            </span>
          </div>

          <div className="bg-slate-900/60 border border-pink-500/20 rounded-2xl p-4 sm:p-6 transition-all hover:border-pink-400/40 hover:scale-[1.02]">
            <span className="block text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-wider text-pink-200/70 mt-1 block">
              সেকেন্ড (Seconds)
            </span>
          </div>
        </div>

        {/* Celebration button */}
        <button
          onClick={triggerCelebration}
          className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-medium text-sm sm:text-base shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: "3s" }} />
          <span>আমাদের ভালোবাসার উদযাপন 🎊</span>
        </button>
      </div>
    </div>
  );
}
