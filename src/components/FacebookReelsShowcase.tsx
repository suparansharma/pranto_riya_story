"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  Sparkles,
  ExternalLink,
  Play,
  Heart,
  X,
  Compass,
  Camera,
} from "lucide-react";
import confetti from "canvas-confetti";

interface ReelItem {
  id: string;
  reelId: string;
  type?: "fb" | "ig";
  title: string;
  subtitle: string;
  url: string;
  thumbnail: string;
  tag: string;
  category: string;
  description: string;
}

const reelsData: ReelItem[] = [
  {
    id: "sitakundu",
    reelId: "Db2lsMWvM_0",
    type: "ig",
    title: "সীতাকুণ্ড শংকর মঠ ও গুলিয়াখালী ভ্রমণ",
    subtitle: "Spiritual Peace & Coastal Beauty",
    url: "https://www.instagram.com/p/Db2lsMWvM_0/?hl=en",
    thumbnail: "/images/sitakundu_tour.jpg",
    tag: "সীতাকুণ্ড ও গুলিয়াখালী",
    category: "Divine Journey",
    description:
      "পবিত্র সীতাকুণ্ড শংকর মঠে আশীর্বাদ নেওয়া এবং সুযোগ পেয়ে অসাধারণ গুলিয়াখালী ঘুরে আসার মনোরম স্মৃতি।",
  },
  {
    id: "natore",
    reelId: "2875422049516498",
    type: "fb",
    title: "নাটোর রাজবাড়ি ট্যুর ও পোস্ট-ওয়েডিং শুট",
    subtitle: "Royal Romance at Natore Palace",
    url: "https://www.facebook.com/reel/2875422049516498",
    thumbnail: "/images/natore_tour.jpg",
    tag: "রাজবাড়ি ট্যুর",
    category: "Heritage & Love",
    description:
      "ঐতিহাসিক রাজবাড়ির রাজকীয় আঙিনায় আমাদের রোমান্টিক পোস্ট-ওয়েডিং মোশন শুটের বিশেষ স্মৃতি।",
  },
  {
    id: "sylhet",
    reelId: "4512879032303383",
    type: "fb",
    title: "সিলেট রোমাঞ্চকর ভ্রমণ রিল",
    subtitle: "Green Escapes & Tea Gardens",
    url: "https://www.facebook.com/reel/4512879032303383",
    thumbnail: "/images/sylhet_tour.jpg",
    tag: "সিলেট ভ্রমণ",
    category: "Nature Trip",
    description:
      "চিরসবুজ চা বাগান আর মিষ্টি হাওয়ায় দুজনের হাত ধরে হারিয়ে যাওয়ার দারুণ মোশন মুহূর্ত।",
  },
  {
    id: "coxs",
    reelId: "1552611392999355",
    type: "fb",
    title: "কক্সবাজার সমুদ্র সৈকত ট্যুর রিল",
    subtitle: "Ocean Breeze & Endless Waves",
    url: "https://www.facebook.com/reel/1552611392999355",
    thumbnail: "/images/coxs_bazar_tour.jpg",
    tag: "সমুদ্র সৈকত",
    category: "Beach Vibes",
    description:
      "উত্তাল সাগরের ঢেউয়ের পাশে নরম বালুকাবেলায় গোধূলির আলোয় আমাদের অবিস্মরণীয় রিল।",
  },
  {
    id: "dhaka_first",
    reelId: "702206739419734",
    type: "fb",
    title: "শার্মা জির ১ম ঢাকায় আগমন",
    subtitle: "Welcome to Dhaka, Sharma Ji!",
    url: "https://www.facebook.com/reel/702206739419734",
    thumbnail: "/images/biyer_pore_1st_time_dhakesori_mondire.jpeg",
    tag: "১ম ঢাকায় আসা",
    category: "Sweet Beginning",
    description:
      "বিয়ের পর প্রথমবারের মতো শার্মা জির ঢাকায় আসা এবং শহরের বুকে নতুন স্মৃতির সূচনা।",
  },
  {
    id: "puja_age",
    reelId: "1031245712345435",
    type: "fb",
    title: "বিয়ের আগের দুর্গাপূজা উদযাপন",
    subtitle: "Festive Blessings Before Wedding",
    url: "https://www.facebook.com/reel/1031245712345435",
    thumbnail: "/images/biyer_age_puja_dekha.jpg",
    tag: "পূজা স্পেশাল",
    category: "Festive Vibes",
    description:
      "বিয়ের আগের সেই কাঙ্ক্ষিত পূজা, আলোর রোশনাই আর দেবীর চরণে চাওয়া আমাদের অটুট ভালোবাসা।",
  },
];

export default function FacebookReelsShowcase() {
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);

  const handleOpenPlayer = (reel: ReelItem) => {
    setActiveReel(reel);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ec4899", "#f43f5e", "#fda4af"],
    });
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
          আমাদের প্রতিটি সুন্দর ভ্রমণের মুহূর্ত ও আবেগের সংক্ষিপ্ত সিনেমাটিক ক্লিপগুলো উপভোগ করুন
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
            className="group relative rounded-3xl overflow-hidden glass-card border border-pink-500/20 bg-slate-900/90 shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 flex flex-col justify-between transition-all duration-300"
          >
            {/* Top 9:16 Video Style Thumbnail */}
            <div
              className="relative aspect-[9/14] w-full overflow-hidden bg-slate-950 cursor-pointer"
              onClick={() => handleOpenPlayer(item)}
            >
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
                <div className="w-13 h-13 rounded-full bg-pink-500/80 group-hover:bg-pink-500 group-hover:scale-115 text-white flex items-center justify-center shadow-lg shadow-pink-500/50 transition-all duration-300 border border-white/30 backdrop-blur-sm">
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
            <div className="p-3 bg-slate-950/90 border-t border-pink-500/15 flex items-center justify-between gap-2">
              <button
                onClick={() => handleOpenPlayer(item)}
                className="text-xs text-pink-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>প্লে করুন</span>
                <span>▶</span>
              </button>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500 text-pink-300 hover:text-white transition-all text-xs flex items-center gap-1 font-medium"
                title="ভিডিও লিংক খুলুন"
              >
                <span>ভিডিও লিংক</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* POPUP REEL EMBED PLAYER MODAL */}
      <AnimatePresence>
        {activeReel && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setActiveReel(null)}
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
                    Short Story Clip
                  </span>
                  <h4 className="text-sm font-bold text-white truncate max-w-[260px]">
                    {activeReel.title}
                  </h4>
                </div>

                <button
                  onClick={() => setActiveReel(null)}
                  className="p-2 rounded-full bg-slate-800 hover:bg-pink-600 text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Embedded Player Iframe */}
              <div className="relative aspect-[9/16] w-full bg-black flex items-center justify-center overflow-hidden">
                {activeReel.type === "ig" ? (
                  <iframe
                    src={`https://www.instagram.com/p/${activeReel.reelId}/embed`}
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                ) : (
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F${activeReel.reelId}&show_text=false&t=0`}
                    className="w-full h-full border-0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Bottom Footer Info */}
              <div className="p-4 bg-slate-900/90 border-t border-pink-500/20 flex items-center justify-between">
                <div className="text-xs text-pink-200/80">
                  <p className="line-clamp-1">{activeReel.description}</p>
                </div>
                <a
                  href={activeReel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-medium flex items-center gap-1.5 shrink-0 hover:opacity-90 transition-opacity"
                >
                  <span>ফুলস্ক্রিনে দেখুন</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
