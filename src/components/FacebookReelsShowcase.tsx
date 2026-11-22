"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Maximize,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";

interface ReelItem {
  id: string;
  videoSrc: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  tag: string;
  category: string;
  description: string;
}

const reelsData: ReelItem[] = [
  {
    id: "sitakundu",
    videoSrc: "/videos/sitakundu_tour.mp4",
    title: "সীতাকুণ্ড শংকর মঠ ও গুলিয়াখালী ভ্রমণ",
    subtitle: "Spiritual Peace & Coastal Beauty",
    thumbnail: "/images/sitakundu_tour.jpg",
    tag: "সীতাকুণ্ড ও গুলিয়াখালী",
    category: "Divine Journey",
    description:
      "পবিত্র সীতাকুণ্ড শংকর মঠে আশীর্বাদ নেওয়া এবং সুযোগ পেয়ে অসাধারণ গুলিয়াখালী ঘুরে আসার মনোরম স্মৃতি।",
  },
  {
    id: "natore",
    videoSrc: "/videos/natore_tour.mp4",
    title: "নাটোর রাজবাড়ি ট্যুর ও পোস্ট-ওয়েডিং শুট",
    subtitle: "Royal Romance at Natore Palace",
    thumbnail: "/images/natore_tour.jpg",
    tag: "রাজবাড়ি ট্যুর",
    category: "Heritage & Love",
    description:
      "ঐতিহাসিক রাজবাড়ির রাজকীয় আঙিনায় আমাদের রোমান্টিক পোস্ট-ওয়েডিং মোশন শুটের বিশেষ স্মৃতি।",
  },
  {
    id: "sylhet",
    videoSrc: "/videos/sylhet_tour.mp4",
    title: "সিলেট রোমাঞ্চকর ভ্রমণ রিল",
    subtitle: "Green Escapes & Tea Gardens",
    thumbnail: "/images/sylhet_tour.jpg",
    tag: "সিলেট ভ্রমণ",
    category: "Nature Trip",
    description:
      "চিরসবুজ চা বাগান আর মিষ্টি হাওয়ায় দুজনের হাত ধরে হারিয়ে যাওয়ার দারুণ মোশন মুহূর্ত।",
  },
  {
    id: "coxs",
    videoSrc: "/videos/coxs_tour.mp4",
    title: "কক্সবাজার সমুদ্র সৈকত ট্যুর রিল",
    subtitle: "Ocean Breeze & Endless Waves",
    thumbnail: "/images/coxs_bazar_tour.jpg",
    tag: "সমুদ্র সৈকত",
    category: "Beach Vibes",
    description:
      "উত্তাল সাগরের ঢেউয়ের পাশে নরম বালুকাবেলায় গোধূলির আলোয় আমাদের অবিস্মরণীয় রিল।",
  },
  {
    id: "dhaka_first",
    videoSrc: "/videos/dhaka_tour.mp4",
    title: "শার্মা জির ১ম ঢাকায় আগমন",
    subtitle: "Welcome to Dhaka, Sharma Ji!",
    thumbnail: "/images/biyer_pore_1st_time_dhakesori_mondire.jpeg",
    tag: "১ম ঢাকায় আসা",
    category: "Sweet Beginning",
    description:
      "বিয়ের পর প্রথমবারের মতো শার্মা জির ঢাকায় আসা এবং শহরের বুকে নতুন স্মৃতির সূচনা।",
  },
  {
    id: "puja_age",
    videoSrc: "/videos/puja_tour.mp4",
    title: "বিয়ের আগের দুর্গাপূজা উদযাপন",
    subtitle: "Festive Blessings Before Wedding",
    thumbnail: "/images/biyer_age_puja_dekha.jpg",
    tag: "পূজা স্পেশাল",
    category: "Festive Vibes",
    description:
      "বিয়ের আগের সেই কাঙ্ক্ষিত পূজা, আলোর রোশনাই আর দেবীর চরণে চাওয়া আমাদের অটুট ভালোবাসা।",
  },
];

export default function FacebookReelsShowcase() {
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleOpenPlayer = (reel: ReelItem) => {
    setActiveReel(reel);
    setIsPlaying(true);
    setIsMuted(false);

    // Pause background song when in-site reel starts
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("bg-video-playing"));
    }

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ec4899", "#f43f5e", "#fda4af"],
    });
  };

  const handleClosePlayer = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setActiveReel(null);

    // Resume background song when modal closed
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("bg-video-paused"));
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!modalVideoRef.current) return;
    if (isPlaying) {
      modalVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      modalVideoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!modalVideoRef.current) return;
    modalVideoRef.current.currentTime = 0;
    modalVideoRef.current.play();
    setIsPlaying(true);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.requestFullscreen) {
      modalVideoRef.current.requestFullscreen();
    }
  };

  return (
    <section className="relative z-10 py-20 px-4 max-w-7xl mx-auto" id="reels">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium mb-3"
        >
          <Film className="w-4 h-4 text-pink-400" />
          <span>Cinematic Short Stories</span>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight"
        >
          ভালোবাসার জীবন্ত ছোট গল্প 🎬✨
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-pink-200/75 text-sm sm:text-base max-w-xl mx-auto"
        >
          আমাদের প্রতিটি সুন্দর ভ্রমণের মুহূর্ত ও আবেগের সংক্ষিপ্ত সিনেমাটিক ভিডিওগুলো সরাসরি এই সাইটেই উপভোগ করুন
        </motion.p>
      </div>

      {/* Vertical Reel Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {reelsData.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ y: -8 }}
            onClick={() => handleOpenPlayer(item)}
            className="group relative rounded-3xl overflow-hidden glass-card border border-pink-500/20 bg-slate-900/90 shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 flex flex-col justify-between transition-all duration-300 cursor-pointer"
          >
            {/* Top 9:16 Video Style Thumbnail */}
            <div className="relative aspect-[9/14] w-full overflow-hidden bg-slate-950">
              <img
                src={item.thumbnail}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/40" />

              {/* Top Tag */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md text-pink-300 border border-pink-500/30">
                  {item.tag}
                </span>
              </div>

              {/* Big Play Reel Icon Center */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-13 h-13 rounded-full bg-pink-500/90 group-hover:bg-pink-500 group-hover:scale-115 text-white flex items-center justify-center shadow-lg shadow-pink-500/50 transition-all duration-300 border border-white/30 backdrop-blur-sm">
                  <Play className="w-6 h-6 ml-1 fill-white" />
                </div>
              </div>

              {/* Reel Card Bottom Info */}
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 block mb-1">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white line-clamp-2 group-hover:text-pink-200 transition-colors leading-snug">
                  {item.title}
                </h4>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 bg-slate-950/90 border-t border-pink-500/15">
              <button
                className="w-full py-2 px-3 rounded-xl bg-pink-500/20 group-hover:bg-pink-500 text-pink-200 group-hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>ভিডিওটি দেখুন</span>
                <span>▶</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* HIGH-PERFORMANCE IN-SITE REEL PLAYER MODAL */}
      <AnimatePresence>
        {activeReel && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl"
            onClick={handleClosePlayer}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm sm:max-w-md max-h-[92vh] overflow-hidden rounded-3xl bg-slate-950 border border-pink-500/40 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-4 bg-slate-900 border-b border-pink-500/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-pink-400 block">
                    {activeReel.tag}
                  </span>
                  <h4 className="text-sm font-bold text-white truncate max-w-[260px]">
                    {activeReel.title}
                  </h4>
                </div>

                <button
                  onClick={handleClosePlayer}
                  className="p-2 rounded-full bg-slate-800 hover:bg-pink-600 text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Native In-Site Video Player (9:16 Reel Aspect Ratio) */}
              <div
                className="relative aspect-[9/16] w-full bg-black flex items-center justify-center overflow-hidden group/player cursor-pointer"
                onClick={togglePlay}
              >
                <video
                  ref={modalVideoRef}
                  src={activeReel.videoSrc}
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  poster={activeReel.thumbnail}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover"
                />

                {/* Big Center Play Icon when paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <div className="w-16 h-16 rounded-full bg-pink-500/90 text-white flex items-center justify-center shadow-xl">
                      <Play className="w-8 h-8 ml-1 fill-white" />
                    </div>
                  </div>
                )}

                {/* Video Controls Bar */}
                <div
                  className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white transition-transform active:scale-95 cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 ml-0.5 fill-white" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={handleRestart}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleFullscreen}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    <Maximize className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Footer Description */}
              <div className="p-3.5 bg-slate-900/90 border-t border-pink-500/20 text-xs text-pink-100/80">
                <p className="line-clamp-2">{activeReel.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
