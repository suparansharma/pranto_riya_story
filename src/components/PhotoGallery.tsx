"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Image as ImageIcon } from "lucide-react";
import confetti from "canvas-confetti";

interface Memory {
  id: number;
  title: string;
  subtitle: string;
  caption: string;
  gradient: string;
  emoji: string;
}

const memories: Memory[] = [
  {
    id: 1,
    title: "আমাদের বিয়ের স্মরণীয় সাজ",
    subtitle: "The Most Beautiful Bride",
    caption: "লাল বেনারসি আর মিষ্টি হাসিতে তোমাকে পৃথিবীর সবচেয়ে অপরূপা লাগছিল। সেদিন আমি নিজেকে পৃথিবীর সবচেয়ে ভাগ্যবান মানুষ মনে করেছিলাম।",
    gradient: "from-rose-500/20 via-pink-500/10 to-red-500/20",
    emoji: "👰‍♀️✨",
  },
  {
    id: 2,
    title: "গভীর রাতের মিষ্টি খুনসুটি",
    subtitle: "Late Night Talks",
    caption: "রাত জেগে তোমার বলা শত গল্প, অহেতুক হাসি আর ভবিষ্যৎ নিয়ে আমাদের স্বপ্ন বোনা—এসব আমার পরম পাওয়া।",
    gradient: "from-purple-500/20 via-pink-500/10 to-indigo-500/20",
    emoji: "🌙💫",
  },
  {
    id: 3,
    title: "তোমার রান্না করা সুস্বাদু খাবার",
    subtitle: "Made with Love",
    caption: "তোমার হাতের জাদুতে প্রতিটা রান্নাই হয়ে ওঠে অমৃত। রান্না করতে গিয়ে তোমার যত্ন আমাকে মুগ্ধ করে।",
    gradient: "from-amber-500/20 via-pink-500/10 to-orange-500/20",
    emoji: "🍲❤️",
  },
  {
    id: 4,
    title: "একসাথে হাত ধরে হাঁটা",
    subtitle: "Walking by Your Side",
    caption: "তোমার হাতটি শক্ত করে ধরে রাখা মানে পুরো পৃথিবীর ভরসা নিজের মুঠোয় পাওয়া। চিরকাল এভাবেই তোমার হাত ধরে চলতে চাই।",
    gradient: "from-pink-500/20 via-rose-500/10 to-teal-500/20",
    emoji: "👫🌸",
  },
  {
    id: 5,
    title: "আমার মন খারাপের আশ্রয়",
    subtitle: "My Peace & Solace",
    caption: "বাইরের ক্লান্তি আর মন খারাপ শেষে তোমার একটুকু সান্ত্বনা আর মৃদু স্পর্শেই যেন সমস্ত দুঃখ নিমেষেই মিলিয়ে যায়।",
    gradient: "from-blue-500/20 via-pink-500/10 to-cyan-500/20",
    emoji: "🫂🕊️",
  },
  {
    id: 6,
    title: "অনন্তকালের প্রতিজ্ঞা",
    subtitle: "Forever and Always",
    caption: "জীবনের শেষ দিন পর্যন্ত আমি তোমাকে ঠিক এভাবেই ভালোবেসে যাব, প্রতিটা দিন তোমাকে নিয়ে গর্ব করব।",
    gradient: "from-pink-600/20 via-rose-500/10 to-red-600/20",
    emoji: "💍♾️",
  },
];

export default function PhotoGallery() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const handleSelect = (mem: Memory) => {
    setSelectedMemory(mem);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ec4899", "#f43f5e", "#fda4af"],
    });
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium mb-3">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>Moments of Joy</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          স্মৃতির ফ্রেম ও অনুভূতি
        </h3>
        <p className="text-pink-200/70 text-sm sm:text-base max-w-lg mx-auto">
          যেকোনো কার্ডে ক্লিক করে আমাদের রোমান্টিক মুহূর্তের বার্তাগুলো পড়ুন
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            onClick={() => handleSelect(item)}
            className={`glass-card glass-card-hover rounded-3xl p-6 cursor-pointer relative overflow-hidden bg-gradient-to-br ${item.gradient} border border-pink-500/20 group`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform">
                {item.emoji}
              </span>
              <span className="p-2 rounded-full bg-pink-500/10 text-pink-300 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                <Heart className="w-4 h-4" />
              </span>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-pink-300/80 mb-1 block">
              {item.subtitle}
            </span>
            <h4 className="text-xl font-bold text-white mb-3 group-hover:text-pink-200 transition-colors">
              {item.title}
            </h4>
            <p className="text-sm text-pink-100/75 line-clamp-3 leading-relaxed">
              {item.caption}
            </p>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-pink-300">
              <span>Read message</span>
              <span>→</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-pink-400/40 relative bg-gradient-to-b from-slate-900 to-slate-950 text-center"
            >
              <div className="text-5xl mb-4 animate-bounce" style={{ animationDuration: "2s" }}>
                {selectedMemory.emoji}
              </div>
              <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-1 block">
                {selectedMemory.subtitle}
              </span>
              <h4 className="text-2xl font-bold text-white mb-4">
                {selectedMemory.title}
              </h4>
              <p className="text-pink-100/90 text-base leading-relaxed mb-6 font-light">
                &ldquo;{selectedMemory.caption}&rdquo;
              </p>
              <button
                onClick={() => setSelectedMemory(null)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                হৃদয়ে রাখলাম ❤️
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
