"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Heart, Sparkles, Star, Gift } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import Counter from "@/components/Counter";
import LoveLetter from "@/components/LoveLetter";
import Timeline from "@/components/Timeline";
import PhotoGallery from "@/components/PhotoGallery";
import Promises from "@/components/Promises";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  useEffect(() => {
    // Initial welcome fireworks confetti
    const timer = setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ec4899", "#f43f5e", "#fb7185", "#ffd1dc"],
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const triggerBigLove = () => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#f43f5e", "#ec4899", "#be185d", "#ffffff", "#fda4af"],
    });
  };

  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,20,70,0.3),rgba(255,255,255,0))]">
      {/* Background Floating Hearts */}
      <FloatingHearts />

      {/* Background Audio Ambient Player */}
      <AudioPlayer />

      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-3/4 left-1/4 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative z-10 pt-20 pb-12 sm:pt-28 sm:pb-16 px-4 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border border-pink-400/30 text-pink-300 text-xs sm:text-sm font-medium mb-6 shadow-lg shadow-pink-500/10"
        >
          <Sparkles className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: "4s" }} />
          <span>২৬ নভেম্বর ২০২৬ • ১ম বিবাহবার্ষিকী</span>
          <Sparkles className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: "4s" }} />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4"
        >
          শুভ ১ম বিবাহবার্ষিকী,{" "}
          <span className="font-romantic text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500 drop-shadow-[0_4px_24px_rgba(244,63,94,0.4)]">
            রিয়া!
          </span>{" "}
          ❤️
        </motion.h1>

        {/* Romantic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-xl text-pink-100/90 max-w-2xl font-light leading-relaxed mb-8"
        >
          ৩৬৫ দিনের অবিরাম ভালোবাসা, খুনসুটি, আর একসাথে কাটানো মধুর স্মৃতি।
          তুমি আমার জীবনের শ্রেষ্ঠ প্রাপ্তি এবং সবচেয়ে সুন্দর গল্প।
        </motion.p>

        {/* Hero Interactive Heart Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={triggerBigLove}
            className="flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-semibold shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>আমি তোমাকে ভালোবাসি ❤️</span>
          </button>
        </motion.div>
      </section>

      {/* TIME COUNTER SECTION */}
      <section className="relative z-10">
        <Counter />
      </section>

      {/* LOVE LETTER SECTION */}
      <section className="relative z-10">
        <LoveLetter />
      </section>

      {/* TIMELINE SECTION */}
      <section className="relative z-10">
        <Timeline />
      </section>

      {/* MEMORY CARDS / GALLERY */}
      <section className="relative z-10">
        <PhotoGallery />
      </section>

      {/* PROMISES SECTION */}
      <section className="relative z-10">
        <Promises />
      </section>

      {/* FOOTER WISH */}
      <footer className="relative z-10 py-16 text-center border-t border-pink-500/20 bg-slate-950/70 backdrop-blur-md mt-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4 animate-glow">
            <Heart className="w-6 h-6 fill-pink-500 text-pink-500" />
          </div>
          <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-romantic">
            Happy 1st Anniversary, My Dear Riya
          </h4>
          <p className="text-sm text-pink-200/70 font-light mb-6">
            &ldquo;তুমি শুধু আমার সহধর্মিণী নও, তুমি আমার প্রতিটি প্রার্থনার উত্তর।&rdquo;
          </p>
          <div className="text-xs text-pink-300/40">
            Crafted with all my love ❤️ Forever & Always
          </div>
        </div>
      </footer>
    </main>
  );
}
