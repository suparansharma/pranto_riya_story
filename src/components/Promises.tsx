"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Send } from "lucide-react";
import confetti from "canvas-confetti";

const initialPromises = [
  "যতই কঠিন পরিস্থিতি আসুক না কেন, আমি সর্বদা তোমার হাত ধরে পাশে থাকব।",
  "তোমার প্রতিটি ছোট-বড় স্বপ্ন পূরণে নিঃশর্ত সমর্থন দিয়ে যাব।",
  "স্বামী হওয়ার পাশাপাশি আজীবন তোমার সবচেয়ে বিশ্বস্ত ও ভালো বন্ধু হয়ে থাকব।",
  "প্রতিদিন অন্তত একবার হলেও তোমার মিষ্টি হাসির কারণ হব।",
  "তোমার অনুভূতি, মতামত এবং আত্মসম্মানকে সবার উপরে স্থান দেব।",
  "আমাদের পরিবার ও ভালোবাসার এই সুন্দর বাঁধন আজীবন আগলে রাখব।",
];

export default function Promises() {
  const [promises, setPromises] = useState<string[]>(initialPromises);
  const [newPromise, setNewPromise] = useState("");
  const [liked, setLiked] = useState<number[]>([]);

  const handleToggleLike = (idx: number) => {
    if (liked.includes(idx)) {
      setLiked(liked.filter((i) => i !== idx));
    } else {
      setLiked([...liked, idx]);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
      });
    }
  };

  const handleAddCustomPromise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromise.trim()) return;
    setPromises([newPromise.trim(), ...promises]);
    setNewPromise("");
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#ec4899", "#f43f5e", "#fb7185"],
    });
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium mb-3">
          <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
          <span>Vows for Lifetime</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          আমার দেওয়া ৬টি আজীবনের প্রতিজ্ঞা 💍
        </h3>
        <p className="text-pink-200/70 text-sm sm:text-base max-w-md mx-auto">
          আমার প্রিয়তমা স্ত্রী Sharma Ji-র কাছে এই প্রতিজ্ঞাগুলো আমার অন্তরের গভীর থেকে
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {promises.map((promise, index) => {
          const isLiked = liked.includes(index);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="glass-card rounded-2xl p-5 border border-pink-500/20 flex items-start justify-between gap-4 group hover:border-pink-400/40 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold flex items-center justify-center mt-0.5">
                  {index + 1}
                </span>
                <p className="text-pink-100/90 text-sm leading-relaxed">
                  {promise}
                </p>
              </div>

              <button
                onClick={() => handleToggleLike(index)}
                className={`p-2 rounded-full transition-all ${
                  isLiked
                    ? "bg-rose-500 text-white scale-110 shadow-lg shadow-rose-500/40"
                    : "bg-white/5 text-pink-300/60 hover:text-pink-300 hover:bg-white/10"
                }`}
                title={isLiked ? "Loved!" : "Like promise"}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Add Custom Promise Box */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-500/20 text-center max-w-xl mx-auto">
        <h4 className="text-lg font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-400" />
          <span>তুমি কি কোনো প্রতিজ্ঞা যোগ করতে চাও?</span>
        </h4>
        <p className="text-xs sm:text-sm text-pink-200/70 mb-4">
          তোমার মনে যা ইচ্ছা তা লিখে প্রতিজ্ঞা তালিকায় যুক্ত করতে পারো:
        </p>

        <form onSubmit={handleAddCustomPromise} className="flex gap-2">
          <input
            type="text"
            value={newPromise}
            onChange={(e) => setNewPromise(e.target.value)}
            placeholder="যেমন: ছুটির দিনে আমাকে নিয়ে ফুচকা খেতে হবে..."
            className="flex-1 bg-slate-900/80 border border-pink-500/30 rounded-full px-4 py-2.5 text-sm text-white placeholder-pink-200/40 focus:outline-none focus:border-pink-400 transition-colors"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">যুক্ত করি</span>
          </button>
        </form>
      </div>
    </section>
  );
}
