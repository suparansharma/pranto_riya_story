"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen, Heart, X } from "lucide-react";
import confetti from "canvas-confetti";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff758c", "#ff7eb3", "#ffffff", "#f43f5e"],
    });
  };

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto text-center">
      <div className="mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-romantic text-4xl">
          A Special Letter for You
        </h3>
        <p className="text-pink-200/70 text-sm sm:text-base">
          তোমার জন্য মনের গভীর থেকে লেখা একটি ছোট্ট চিঠি...
        </p>
      </div>

      {!isOpen ? (
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpen}
          className="cursor-pointer max-w-md mx-auto p-8 rounded-3xl glass-card border border-pink-500/30 shadow-2xl shadow-pink-500/20 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30 group-hover:rotate-6 transition-transform">
            <Mail className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-semibold text-pink-100 mb-1">
            আমার প্রিয় Sharma Ji, চিঠিটি খুলুন ✨
          </h4>
          <p className="text-xs text-pink-300/70">
            (এখানে ক্লিক করে চিঠিটি পড়ুন)
          </p>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-pink-400/40 shadow-2xl text-left bg-gradient-to-b from-slate-900/90 via-slate-900/95 to-pink-950/40"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-pink-200 transition-colors"
              aria-label="Close letter"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="flex items-center gap-3 border-b border-pink-500/20 pb-4 mb-6">
              <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-400">
                <MailOpen className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">আমার প্রাণের Sharma Ji,</h4>
                <p className="text-xs text-pink-300/70">২৬ নভেম্বর • ১ম বিবাহবার্ষিকী</p>
              </div>
            </div>

            {/* Letter Body */}
            <div className="space-y-4 text-pink-100/90 leading-relaxed text-sm sm:text-base font-light">
              <p>
                দেখতে দেখতে একটি বছর কিভাবে কেটে গেল বুঝতেই পারলাম না! মনে হয় এই তো সেদিনের কথা, যেদিন তোমার হাত ধরে আমার জীবনের সবচেয়ে সুন্দর অধ্যায়টা শুরু হয়েছিল।
              </p>
              <p>
                এই ৩৬৫ দিনে তুমি আমার ঘরকে কেবল ঘর নয়, এক টুকরো স্বর্গে রূপান্তর করেছ। তোমার মিষ্টি হাসি, যত্ন, খুনসুটি আর ভালোবাসা আমাকে প্রতিদিন নতুন করে বাঁচার আনন্দ দেয়। জীবনে যত ঝড় বা ব্যস্ততাই আসুক না কেন, দিনশেষে তোমার মুখের এক চিলতে হাসি আমার সব ক্লান্তি ভুলিয়ে দেয়।
              </p>
              <p>
                আজ আমাদের ১ম বিবাহবার্ষিকীতে আমি তোমাকে কথা দিচ্ছি—জীবনের প্রতিটি পদক্ষেপে, সুখে-দুঃখে আমি সবসময় তোমার পাশেই থাকব। তোমার স্বপ্নগুলোকে নিজের স্বপ্ন ভেবে ভালোবেসে যাব আজীবন।
              </p>
              <p className="font-romantic text-2xl text-pink-300 pt-2">
                &ldquo;ভালোবাসা মানে শুধু একসাথে থাকা নয়, প্রতিটি নিঃশ্বাসে একে অপরকে অনুভব করা।&rdquo;
              </p>
            </div>

            {/* Letter Footer */}
            <div className="mt-8 pt-4 border-t border-pink-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-rose-400 font-romantic text-2xl">
                <Heart className="w-5 h-5 fill-rose-500" />
                <span>চিরদিনের জন্য শুধু তোমার</span>
              </div>
              <button
                onClick={() => {
                  confetti({
                    particleCount: 50,
                    origin: { y: 0.7 },
                  });
                }}
                className="text-xs px-4 py-2 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 transition-colors"
              >
                Send A Heart ❤️
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
