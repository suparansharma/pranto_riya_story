"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Film,
} from "lucide-react";
import confetti from "canvas-confetti";

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category: "all" | "dating" | "wedding" | "tours" | "celebrations";
  story: string;
  tag: string;
  featured?: boolean;
}

const galleryData: GalleryItem[] = [
  // Wedding Highlights
  {
    id: "biyer",
    src: "/images/biyer.JPG",
    title: "শুভ পরিণয় লগ্ন",
    subtitle: "The Sacred Wedding Vows",
    category: "wedding",
    tag: "২৬ নভেম্বর ২০২৫",
    featured: true,
    story:
      "যে শুভক্ষণে অগ্নিসাক্ষী রেখে তোমার হাত ধরেছিলাম, সে মুহূর্তটি আমার জীবনের শ্রেষ্ঠ অলৌকিক ঘটনা। সিঁদুরদান আর মিষ্টি হাসিতে তুমি হয়ে উঠেছিলে আমার চিরন্তন অর্ধাঙ্গিনী।",
  },
  {
    id: "biyer_reception",
    src: "/images/biyer_reception.JPG",
    title: "আমাদের শুভ সংবর্ধনা",
    subtitle: "Wedding Reception Night",
    category: "wedding",
    tag: "Wedding Gala",
    featured: true,
    story:
      "উৎসবমুখর আলো আর শুভকামনার মাঝে শুধু তোমার দিকেই তাকিয়ে মুগ্ধ হচ্ছিলাম। রাজকীয় সাজে তুমি আমার স্বপ্নকন্যা।",
  },
  {
    id: "engagement",
    src: "/images/engagement.jpg",
    title: "শুভ বাগদান",
    subtitle: "The Ring of Eternity",
    category: "wedding",
    tag: "New Beginning",
    featured: false,
    story:
      "আঙুলে ভালোবাসার আংটি পরিয়ে দিয়ে দুটি আত্মার আজীবনের বন্ধনের শুরু। সেই মিষ্টি অনুভূতি আজও মনে শিহরণ জাগায়।",
  },

  // Tours & Travel
  {
    id: "coxs_bazar",
    src: "/images/coxs_bazar_tour.jpg",
    title: "সমুদ্রের বুকে প্রেম",
    subtitle: "Cox's Bazar Tour",
    category: "tours",
    tag: "Beach Escape",
    featured: true,
    story:
      "উত্তাল ঢেউয়ের গর্জন আর নরম বালুকাবেলায় তোমার হাত শক্ত করে ধরে হাঁটা। সূর্যাস্তের আলোয় তোমার মুখের রূপ কখনো ভোলার নয়।",
  },
  {
    id: "sylhet_tour",
    src: "/images/sylhet_tour.jpg",
    title: "সবুজের মাঝে আমরা",
    subtitle: "Sylhet Nature Trip",
    category: "tours",
    tag: "Tea Gardens & Streams",
    featured: false,
    story:
      "চা বাগানের চিরসবুজ সতেজতার মাঝে তোমার সাথে কাটানো শান্ত, স্নিগ্ধ মুহূর্তগুলো যেন কবিতার মতো সুন্দর।",
  },
  {
    id: "natore_tour",
    src: "/images/natore_tour.jpg",
    title: "ঐতিহ্যের আঙিনায়",
    subtitle: "Natore Palace Tour",
    category: "tours",
    tag: "Heritage Journey",
    featured: false,
    story:
      "রাজবাড়ির প্রাচীন রাজকীয় স্থাপত্যের মাঝে আমি পেয়েছিলাম আমার আসল রানীকে। একসাথে ঘুরে দেখার অসাধারণ এক দিন।",
  },
  {
    id: "versity_tour",
    src: "/images/amr_versity_er_1st_tour.jpg",
    title: "আমার ক্যাম্পাসে তোমাকে নিয়ে ১ম ট্যুর",
    subtitle: "Campus Tour with Love",
    category: "tours",
    tag: "Campus Memory",
    featured: false,
    story:
      "আমার বিশ্ববিদ্যালয় জীবনে যে ক্যাম্পাস ছিল প্রিয়, তোমাকে সেখানে নিয়ে এসে পরিচয় করিয়ে দেওয়ার অনুভূতি ছিল ভীষণ গর্বের ও আনন্দের।",
  },

  // Dating & Early Meets
  {
    id: "poribar_dekha",
    src: "/images/poribar_goto_vabe_first_dekha.jpeg",
    title: "পারিবারিকভাবে প্রথম দেখা",
    subtitle: "First Official Family Meet",
    category: "dating",
    tag: "Family Blessing",
    featured: false,
    story:
      "পরিবারের বড়দের উপস্থিতিতে সেই প্রথম চোখাচোখি আর মিষ্টি লজ্জা। ভালোবাসার গল্পে পারিবারিক সম্মতির সেই অবিস্মরণীয় মুহূর্ত।",
  },
  {
    id: "1st_meet_final",
    src: "/images/1st_meet_biyer_kotha_final er_pore.jpeg",
    title: "বিয়ের কথা ফাইনাল হওয়ার পর ১ম দেখা",
    subtitle: "When Forever Was Decided",
    category: "dating",
    tag: "Official Love",
    featured: true,
    story:
      "সব ঠিক হয়ে যাওয়ার পর আমাদের প্রথম দেখা—চোখে মুখে ছিল অদ্ভুত এক আনন্দ আর সারা জীবনের জন্য কাছে পাওয়ার নিশ্চয়তা।",
  },
  {
    id: "meet_2nd",
    src: "/images/biyer_age_2nd_dekha.jpg",
    title: "বিয়ের আগে ২য় দেখা",
    subtitle: "Sweet Little Encounters",
    category: "dating",
    tag: "Growing Closer",
    featured: false,
    story:
      "ধীরে ধীরে একে অপরকে চেনা, অকারণ হাসি আর সময় যেন দ্রুত চলে যাওয়ার মধুর অভিযোগ।",
  },
  {
    id: "meet_3rd",
    src: "/images/biyer_age_3rd_dekha.jpg",
    title: "বিয়ের আগে ৩য় দেখা",
    subtitle: "Eyes Speaking Volumes",
    category: "dating",
    tag: "Dating Days",
    featured: false,
    story:
      "যতবার তোমার সাথে দেখা হতো, ততবার নতুন করে প্রেমে পড়ার অনুভূতি হতো। মিষ্টি খুনসুটি আর অনেক গল্প।",
  },
  {
    id: "meet_4th_1",
    src: "/images/biyer_age_4th_dekha_1.jpeg",
    title: "বিয়ের আগে ৪র্থ দেখা (পার্ট ১)",
    subtitle: "Chasing Moments",
    category: "dating",
    tag: "Sweet Moments",
    featured: false,
    story:
      "ব্যস্ত শহরের মাঝে নিজেদের জন্য খুঁজে নেওয়া একটুখানি প্রশান্তির সময়। তোমার চাহনিতেই সব ক্লান্তি দূর হতো।",
  },
  {
    id: "meet_4th_2",
    src: "/images/biyer_age_4th_dekha_2.jpeg",
    title: "বিয়ের আগে ৪র্থ দেখা (পার্ট ২)",
    subtitle: "Endless Smiles",
    category: "dating",
    tag: "Cherished Day",
    featured: false,
    story:
      "একই দিনে তোলা আরেকটি অমূল্য ছবি। তোমার মুখে যে হাসি ছিল, তা আজীবন আমার হৃদয়ে ধরে রাখতে চাই।",
  },
  {
    id: "matching_5th",
    src: "/images/biyer_age_5th_dekha_matching_matching_dress.jpeg",
    title: "ম্যাচিং ড্রেসে ৫ম দেখা",
    subtitle: "Matching Outfits & Hearts",
    category: "dating",
    tag: "Color Synchronized",
    featured: true,
    story:
      "একই রঙের পোশাকে মনের মিল যেন আরও স্পষ্ট হয়ে উঠেছিল! দুজন মিলে একসাথে দারুণ কিছু স্মরণীয় ফ্রেম।",
  },
  {
    id: "matching_6th",
    src: "/images/biyer_age_6th_dekha_matching_matching_dress.jpeg",
    title: "ম্যাচিং পোশাকে ৬ষ্ঠ দেখা",
    subtitle: "Perfect Harmony",
    category: "dating",
    tag: "Twin Souls",
    featured: false,
    story:
      "পোশাকের রঙ মিলিয়ে বের হওয়া আর সারাটা দিন প্রাণখুলে আড্ডা—প্রতিটা দেখাই ছিল একেকটি উৎসবের মতো।",
  },
  {
    id: "puja_age",
    src: "/images/biyer_age_puja_dekha.jpg",
    title: "বিয়ের আগের পূজা উদযাপন",
    subtitle: "Pre-Wedding Puja Blessings",
    category: "celebrations",
    tag: "Festive Joy",
    featured: false,
    story:
      "উৎসবের আলোয় মণ্ডপে মণ্ডপে ঘোরা আর অঞ্জলি দেওয়া। ঈশ্বরের কাছে প্রার্থনা ছিল শুধু তোমাকেই যেন জীবনসঙ্গিনী হিসেবে পাই।",
  },

  // Celebrations & After Wedding
  {
    id: "sharma_ji_birthday",
    src: "/images/first_birth_day_sharma_ji_er.jpg",
    title: "শার্মা জির প্রথম জন্মদিন উদযাপন",
    subtitle: "Celebrating My Queen",
    category: "celebrations",
    tag: "Happy Birthday",
    featured: true,
    story:
      "আমার প্রিয় মানুষটার জন্মদিন! তোমার জীবনের প্রতিটি জন্মদিন যেন এভাবে হাসিখুশি আর ভালোবাসায় ভরিয়ে রাখতে পারি।",
  },
  {
    id: "durga_puja_after",
    src: "/images/biyer_pore_1st_durga_puja_amader.jpg",
    title: "বিয়ের পর ১ম দুর্গাপূজা",
    subtitle: "First Puja as Husband & Wife",
    category: "celebrations",
    tag: "Special Puja",
    featured: false,
    story:
      "একসাথে নতুন সংসার নিয়ে অঞ্জলি দেওয়া আর দেবী দর্শনে যাওয়া। এই পূজার আনন্দ ছিল অন্যান্য বারের চেয়ে হাজার গুণ বেশি।",
  },
  {
    id: "pohela_boisakh",
    src: "/images/biyer_pore_1st_pohela_boisakh.jpg",
    title: "বিয়ের পর ১ম পহেলা বৈশাখ",
    subtitle: "First Pohela Boishakh",
    category: "celebrations",
    tag: "Boishakhi Color",
    featured: false,
    story:
      "বাঙালি ঐতিহ্যবাহী সাজে নতুন বছরকে একসাথে বরণ করে নেওয়া। ভালোবাসার রঙে রঙিন হয়েছিল আমাদের পুরো দিনটি।",
  },
  {
    id: "dhakeshwari",
    src: "/images/biyer_pore_1st_time_dhakesori_mondire.jpeg",
    title: "বিয়ের পর ১ম ঢাকেশ্বরী মন্দিরে",
    subtitle: "Divine Blessings at Dhakeshwari",
    category: "celebrations",
    tag: "Temple Visit",
    featured: false,
    story:
      "পবিত্র ঢাকেশ্বরী মন্দিরে একসাথে মা দুর্গার চরণে প্রণাম জানিয়ে আমাদের অটুট ভালোবাসার জন্য আশীর্বাদ চেয়েছিলাম।",
  },
  {
    id: "movie_1",
    src: "/images/biyer_pore_1st_movie_dekha_1st_pic.jpeg",
    title: "বিয়ের পর ১ম মুভি ডেট (১)",
    subtitle: "First Movie Date Nights",
    category: "celebrations",
    tag: "Movie Date",
    featured: false,
    story:
      "একসাথে হাত ধরে হলে বসে সিনেমা দেখা আর পপকর্ন ভাগাভাগির দারুণ রোমান্টিক সময়।",
  },
  {
    id: "movie_2",
    src: "/images/biyer_pore_1st_movie_dekha_2nd_pic.jpeg",
    title: "বিয়ের পর ১ম মুভি ডেট (২)",
    subtitle: "Sweet Movie Memories",
    category: "celebrations",
    tag: "Movie Date",
    featured: false,
    story:
      "সিনেমা শেষে তোলা মিষ্টি স্মৃতির ফ্রেম। প্রতিটি সাধারণ দিন তোমার উপস্থিতিতে বিশেষ হয়ে ওঠে।",
  },
  {
    id: "virtual_fun",
    src: "/images/virtual_moja_eksathe.jpeg",
    title: "দূরত্বেও কাছে: ভার্চুয়াল খুনসুটি",
    subtitle: "Virtual Fun & Laughter",
    category: "celebrations",
    tag: "Long Distance Fun",
    featured: false,
    story:
      "ভিডিও কলে আজব ফিল্টার আর হাসাহাসির মুহূর্ত! দূরত্ব কখনোই আমাদের মনকে দূরে নিতে পারেনি, বরং ভালোবাসা বাড়িয়েছে।",
  },
];

const categoryTabs = [
  { key: "all", label: "সব স্মৃতি (All)" },
  { key: "wedding", label: "বিবাহ ও বাগদান 💍" },
  { key: "dating", label: "বিয়ের আগের দেখা 🌸" },
  { key: "tours", label: "রোমাঞ্চকর ট্যুর ✈️" },
  { key: "celebrations", label: "উৎসব ও উদযাপন 🎂" },
];

export default function PhotoGallery() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const filteredItems =
    activeTab === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === activeTab);

  const handleOpenModal = (index: number) => {
    setSelectedItemIndex(index);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ec4899", "#f43f5e", "#fda4af"],
    });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIndex !== null) {
      setSelectedItemIndex(
        (selectedItemIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  const currentItem =
    selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  // Lock background scroll when photo lightbox modal is open
  useEffect(() => {
    if (selectedItemIndex !== null) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedItemIndex]);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto" id="gallery">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium mb-3"
        >
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>Real Memories & True Emotions</span>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight"
        >
          আমাদের জীবনের রঙিন অ্যালবাম 📸
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-pink-200/75 text-sm sm:text-base max-w-2xl mx-auto"
        >
          প্রথম দেখা থেকে শুরু করে কক্সবাজার, সিলেট, নাটোর ভ্রমণ আর বিয়ের রাজকীয় স্মৃতি—প্রতিটি ফ্রেমের পেছনে রয়েছে আমাদের হৃদয়ের অনুভূতির গল্প। ক্লিক করে গল্পগুলো দেখুন।
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {categoryTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setSelectedItemIndex(null);
            }}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30 scale-105"
                : "bg-slate-900/60 text-pink-200/70 hover:text-white hover:bg-slate-800/80 border border-pink-500/15"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              whileHover={{ y: -6 }}
              onClick={() => handleOpenModal(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl bg-slate-900/80 border border-pink-500/20 shadow-lg hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 flex flex-col"
            >
              {/* Photo Box */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Subtle top tag badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md text-pink-300 border border-pink-500/30 shadow-md">
                    {item.tag}
                  </span>
                </div>

                {/* Full-view quick hover button */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="p-2 rounded-full bg-pink-500/80 text-white backdrop-blur-md shadow-md flex items-center justify-center">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Dark gradient overlay on bottom for title readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none" />

                {/* Hover story teaser overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-left z-10">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-pink-400 mb-1">
                    {item.subtitle}
                  </p>
                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-pink-200 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-pink-100/70 line-clamp-2 mt-1 leading-snug">
                    {item.story}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-3.5 bg-slate-900/90 border-t border-pink-500/10 flex items-center justify-between text-xs text-pink-300/80">
                <span className="flex items-center gap-1.5 font-medium">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                  ক্লিক করে গল্প পড়ুন
                </span>
                <span className="text-pink-400 font-semibold group-hover:translate-x-1 transition-transform">
                  বিস্তারিত →
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* LIGHTBOX / STORY MODAL */}
      <AnimatePresence>
        {currentItem && selectedItemIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setSelectedItemIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl bg-slate-950 border border-pink-500/40 shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItemIndex(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-pink-600 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Left */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-pink-600 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Navigation Right */}
              <button
                onClick={handleNext}
                className="absolute right-3 md:right-auto md:left-[54%] top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-pink-600 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image side */}
              <div className="relative md:w-3/5 bg-black flex items-center justify-center min-h-[300px] md:min-h-[500px]">
                <img
                  src={currentItem.src}
                  alt={currentItem.title}
                  className="max-h-[70vh] md:max-h-[85vh] w-full object-contain p-2"
                />
              </div>

              {/* Story / Description Side */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-slate-900 to-slate-950 border-t md:border-t-0 md:border-l border-pink-500/20 overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      {currentItem.tag}
                    </span>
                    <span className="text-xs text-pink-300/60">
                      {selectedItemIndex + 1} of {filteredItems.length}
                    </span>
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-widest text-pink-400 block mb-1">
                    {currentItem.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
                    {currentItem.title}
                  </h3>

                  <div className="h-0.5 w-16 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full mb-4" />

                  <p className="text-pink-100/90 text-sm sm:text-base leading-relaxed font-light mb-6">
                    &ldquo;{currentItem.story}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-pink-300 text-xs">
                    <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                    <span>আমাদের হৃদয়ের স্মৃতি</span>
                  </div>
                  <button
                    onClick={() => {
                      confetti({
                        particleCount: 50,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ["#ec4899", "#f43f5e", "#fda4af"],
                      });
                    }}
                    className="px-4 py-2 rounded-full bg-pink-500/20 hover:bg-pink-500/40 text-pink-200 border border-pink-500/40 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    <span>লাভ রিঅ্যাক্ট ❤️</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
