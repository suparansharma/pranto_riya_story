"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Compass, Smile, Stars, Coffee } from "lucide-react";

interface Milestone {
  icon: any;
  date: string;
  title: string;
  description: string;
  tag: string;
}

const milestones: Milestone[] = [
  {
    icon: Sparkles,
    date: "২৬ নভেম্বর ২০২৫",
    title: "শুভ বিবাহ লগ্ন 💍",
    description: "যেদিন দুটি মন, দুটি পরিবার আর দুটি জীবন একসাথে এক বন্ধনে বাঁধা পড়েছিল। তোমার হাত ধরে নতুন জীবনের সূচনা।",
    tag: "Day 1",
  },
  {
    icon: Compass,
    date: "প্রথম ঘুরাঘুরি",
    title: "আমাদের প্রথম রোমাঞ্চকর ভ্রমণ ✈️",
    description: "একসাথে নতুন শহর আর অচেনা পথ আবিষ্কার, হাত ধরে পথ চলা আর অগুনতি হাসির মুহূর্ত।",
    tag: "Adventures",
  },
  {
    icon: Coffee,
    date: "প্রতিটি সকাল ও সন্ধ্যা",
    title: "একসাথে এক কাপ চা ও কথামালা ☕",
    description: "সারাদিনের ক্লান্তি শেষে তোমার সাথে বসে গল্প করা, খুনসুটি আর নিস্তব্ধ সন্ধ্যায় চোখের ভাষায় কথা বলা।",
    tag: "Little Things",
  },
  {
    icon: Smile,
    date: "প্রতিদিনের মিষ্টি মুহূর্ত",
    title: "তোমার সেই অমূল্য মিষ্টি হাসি ✨",
    description: "যখনই তুমি হাসো, মনে হয় পুরো পৃথিবীটাই উজ্জ্বল হয়ে উঠেছে। এই হাসিটাই আমার সবচেয়ে বড় শক্তি।",
    tag: "Smile",
  },
  {
    icon: Stars,
    date: "২৬ নভেম্বর ২০২৬",
    title: "১ম বিবাহবার্ষিকী পূর্ণতা 🎉",
    description: "আজ আমরা পূর্ণ করলাম ভালোবাসার ৩৬৫টি দিন! এটি তো কেবল শুরু, সামনে অপেক্ষা করছে আরও সুন্দর হাজারো বছর।",
    tag: "1 Year Anniversary",
  },
];

export default function Timeline() {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium mb-3">
          <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
          <span>Our Journey Together</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          ভালোবাসার স্মৃতিময় মুহূর্তগুলো
        </h3>
        <p className="text-pink-200/70 text-sm sm:text-base max-w-md mx-auto">
          বিগত একটি বছরের প্রতিটি মুহূর্ত আমার হৃদয়ে সোনার অক্ষরে লেখা রয়েছে
        </p>
      </div>

      <div className="relative border-l-2 border-pink-500/30 ml-4 sm:ml-32 space-y-12">
        {milestones.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative pl-8 sm:pl-10 group"
            >
              {/* Dot Icon on the line */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-pink-400 flex items-center justify-center text-pink-300 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all shadow-lg shadow-pink-500/20">
                <Icon className="w-4 h-4" />
              </div>

              {/* Date tag on larger screens (left side) */}
              <span className="hidden sm:block absolute -left-36 top-2 text-right w-24 text-xs font-semibold text-pink-400 tracking-wider">
                {item.date}
              </span>

              {/* Card content */}
              <div className="glass-card glass-card-hover rounded-2xl p-6 border border-pink-500/20">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="sm:hidden text-xs font-medium text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full">
                    {item.date}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-pink-100/80 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
