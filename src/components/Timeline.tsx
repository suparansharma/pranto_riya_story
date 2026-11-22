"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Calendar,
} from "lucide-react";
import confetti from "canvas-confetti";

interface SlideItem {
  id: number;
  tag: string;
  badge: string;
  title: string;
  date: string;
  location: string;
  image: string;
  quote: string;
}

const slides: SlideItem[] = [
  {
    id: 1,
    tag: "The Beginning",
    badge: "প্রথম স্মৃতি",
    title: "পারিবারিকভাবে প্রথম দেখা ও কথা চূড়ান্ত",
    date: "শুভ সূচনা",
    location: "বাসায় ঘরোয়া পরিবেশ",
    image: "/images/poribar_goto_vabe_first_dekha.jpeg",
    quote:
      "পরিবারের বড়দের মাঝে প্রথম যখন তোমাকে দেখেছিলাম, মিষ্টি সেই লজ্জা আর স্নিগ্ধ চাহনিতেই নিশ্চিত হয়েছিলাম—তুমিই আমার জীবনের সেই কাঙ্ক্ষিত মানুষ।",
  },
  {
    id: 2,
    tag: "Official Date",
    badge: "বিয়ের কথা ফাইনাল",
    title: "সব ঠিক হওয়ার পর আমাদের ১ম দেখা",
    date: "নতুন আশা",
    location: "মিষ্টি এক বিকেল",
    image: "/images/1st_meet_biyer_kotha_final er_pore.jpeg",
    quote:
      "বিয়ে চূড়ান্ত হওয়ার পর প্রথম মুখোমুখি হওয়া। চোখের কোণে জমে থাকা আনন্দ আর একে অপরকে চিরদিনের জন্য পাওয়ার নিশ্চিত অনুভূতি।",
  },
  {
    id: 3,
    tag: "Twin Souls",
    badge: "ম্যাচিং ড্রেস",
    title: "একই রঙের পোশাকে হৃদয়ের মেলবন্ধন",
    date: "বিয়ের আগের দেখা",
    location: "স্মৃতির রাজপথ",
    image: "/images/biyer_age_5th_dekha_matching_matching_dress.jpeg",
    quote:
      "ম্যাচিং রঙের পোশাকে মনের মিল যেন আরও স্পষ্ট হয়ে উঠেছিল! অকারণ হাসাহাসি আর সময় দ্রুত ফুরিয়ে যাওয়ার মধুর অভিযোগ।",
  },
  {
    id: 4,
    tag: "Sacred Vows",
    badge: "শুভ বিবাহ লগ্ন",
    title: "অগ্নিসাক্ষী রেখে আজীবন তোমার হাত ধরা",
    date: "২৬ নভেম্বর ২০২৫",
    location: "বিবাহ আসর",
    image: "/images/biyer.JPG",
    quote:
      "সিঁদুরদান ও মালাবদলের সেই অলৌকিক মুহূর্ত। মন্ত্রোচ্চারণের মাঝে শপথ নিয়েছিলাম—আমার প্রতিটি নিঃশ্বাসে আজীবন তোমাকেই ভালোবেসে যাব।",
  },
  {
    id: 5,
    tag: "Royal Gala",
    badge: "সংবর্ধনা রাত",
    title: "আমাদের রাজকীয় রিসেপশন নাইট",
    date: "বিবাহ সংবর্ধনা",
    location: "আলোর মেলা",
    image: "/images/biyer_reception.JPG",
    quote:
      "উৎসবের আলো আর সবার শুভকামনার মাঝে তুমি ছিলে একমাত্র মধ্যমণি। রাজকীয় সাজে তুমি আমার স্বপ্নকন্যা।",
  },
  {
    id: 6,
    tag: "Beach Romance",
    badge: "কক্সবাজার ট্যুর",
    title: "সমুদ্রের গর্জন আর গোধূলির সৈকতে আমরা",
    date: "মধুর ভ্রমণ",
    location: "কক্সবাজার সমুদ্র সৈকত",
    image: "/images/coxs_bazar_tour.jpg",
    quote:
      "উত্তাল ঢেউয়ের পাশে নরম বালুকাবেলায় তোমার হাত শক্ত করে ধরে হাঁটা। সূর্যাস্তের আলোয় তোমার মুখের রূপ চিরকাল হৃদয়ে আঁকা থাকবে।",
  },
  {
    id: 7,
    tag: "Tea Garden Vows",
    badge: "সিলেট ট্যুর",
    title: "চিরসবুজ চা বাগানে শান্ত প্রেমের পরশ",
    date: "প্রকৃতির কোলে",
    location: "সিলেটের চা বাগান",
    image: "/images/sylhet_tour.jpg",
    quote:
      "সবুজের সতেজতায় তোমার সাথে কাটানো নির্জন, স্নিগ্ধ মুহূর্তগুলো যেন কবিতার এক একটি ছন্দের মতো মধুর ছিল।",
  },
  {
    id: 8,
    tag: "Queen's Day",
    badge: "শার্মা জির জন্মদিন",
    title: "আমার প্রিয়তমার প্রথম জন্মদিন উদযাপন",
    date: "স্পেশাল দিন",
    location: "ভালোবাসার ঘরে",
    image: "/images/first_birth_day_sharma_ji_er.jpg",
    quote:
      "আমার রানীর জন্মদিন! তোমার জীবনের প্রতিটি বছর যেন এভাবেই সুখ, হাসি আর অফুরন্ত ভালোবাসায় ভরিয়ে রাখতে পারি।",
  },
];

const AUTOPLAY_INTERVAL = 4500; // 4.5 seconds per slide

export default function Timeline() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Auto sliding timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, current]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const triggerLove = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ec4899", "#f43f5e", "#fda4af"],
    });
  };

  const activeSlide = slides[current];

  // Motion animation variants for sliding
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: "easeOut" as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.45, ease: "easeIn" as const },
    }),
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="story-slider">
      {/* Section Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium mb-3"
        >
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>Cinematic Auto Memory Reel</span>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight"
        >
          আমাদের রঙিন মুহূর্তের সিনেমা 🎞️✨
        </motion.h3>
        <p className="text-pink-200/75 text-sm sm:text-base max-w-md mx-auto">
          প্রতিটি সুন্দর স্মৃতি স্বয়ংক্রিয়ভাবে একের পর এক আপনার চোখের সামনে ভেসে উঠবে
        </p>
      </div>

      {/* Main Slider Container */}
      <div
        className="relative mx-auto rounded-3xl overflow-hidden glass-card border border-pink-500/30 bg-slate-950/90 shadow-[0_20px_80px_rgba(244,63,94,0.25)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Top Progress Bar for Autoplay */}
        <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/10">
          <motion.div
            key={current + (isPaused ? "-paused" : "-playing")}
            initial={{ width: "0%" }}
            animate={{ width: isPaused ? undefined : "100%" }}
            transition={{
              duration: AUTOPLAY_INTERVAL / 1000,
              ease: "linear",
            }}
            className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500"
          />
        </div>

        {/* Ambient Glow behind active slide */}
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-600/20 via-rose-500/10 to-purple-600/20 rounded-3xl blur-3xl pointer-events-none" />

        {/* Slider Body */}
        <div className="relative min-h-[500px] sm:min-h-[460px] flex items-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-10 md:p-12 items-center"
            >
              {/* Photo Box (Left - 5 Cols on Desktop) */}
              <div className="md:col-span-5 relative flex justify-center">
                <div className="relative aspect-[4/5] w-full max-w-[340px] rounded-2xl overflow-hidden border-2 border-pink-500/40 shadow-2xl group">
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                  />

                  {/* Gradient bottom shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Location & Date Badge */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-pink-200 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-xl border border-pink-500/30">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-pink-400" />
                      {activeSlide.date}
                    </span>
                    <span className="text-[11px] text-pink-300/80 truncate max-w-[120px]">
                      {activeSlide.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Story Content (Right - 7 Cols on Desktop) */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-5 text-left">
                <div>
                  {/* Badge & Tag */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500/25 to-rose-500/25 text-pink-300 border border-pink-500/40">
                      {activeSlide.badge}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-pink-400/80 font-medium">
                      {activeSlide.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                    {activeSlide.title}
                  </h4>

                  {/* Quote Box */}
                  <div className="relative p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-pink-500/20 shadow-inner">
                    <Heart className="w-6 h-6 text-pink-500/20 absolute top-4 right-4 fill-pink-500/20" />
                    <p className="text-sm sm:text-base text-pink-100/90 font-light leading-relaxed italic">
                      &ldquo;{activeSlide.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Heart React Button */}
                <div className="pt-2">
                  <button
                    onClick={triggerLove}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 hover:to-rose-500/30 border border-pink-500/35 text-pink-200 text-xs sm:text-sm font-medium transition-all active:scale-95 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
                    <span>ভালোবাসি ❤️</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Control Bar */}
        <div className="relative z-20 px-6 py-4 bg-slate-950/90 border-t border-pink-500/15 flex flex-wrap items-center justify-between gap-4">
          {/* Pause / Play status */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 transition-colors cursor-pointer"
              aria-label={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-pink-300" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <span className="text-xs text-pink-300/70 hidden sm:inline">
              {isPaused ? "স্লাইডার থামানো আছে" : "অটো-স্লাইড হচ্ছে (হোভার করলে থামবে)"}
            </span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  current === idx
                    ? "w-7 bg-gradient-to-r from-pink-500 to-rose-400"
                    : "w-2 bg-pink-500/25 hover:bg-pink-500/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-pink-600 text-white border border-pink-500/20 transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-pink-300 px-1">
              {current + 1} / {slides.length}
            </span>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-pink-600 text-white border border-pink-500/20 transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
