"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Film,
  Heart,
  Maximize,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function MotionVideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#ec4899", "#fda4af"],
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section className="relative z-10 py-20 px-4 max-w-5xl mx-auto" id="video">
      {/* Section Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium mb-3"
        >
          <Film className="w-4 h-4 text-pink-400" />
          <span>Exclusive Wedding Film Edit</span>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-bold text-white mb-3 tracking-tight"
        >
          আমাদের বিয়ের স্মরণীয় সিনেমা 🎬
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-pink-200/75 text-sm sm:text-base max-w-lg mx-auto"
        >
          আমার নিজের হাতে এডিট করা আমাদের শুভ পরিণয়ের সবচেয়ে স্পেশাল মুহূর্তগুলোর ভিডিও রিল
        </motion.p>
      </div>

      {/* Cinematic Video Card Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-4xl rounded-3xl overflow-hidden glass-card border border-pink-500/40 shadow-[0_15px_60px_rgba(244,63,94,0.3)] group"
      >
        {/* Glow halo behind video */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-700 pointer-events-none" />

        <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex items-center justify-center">
          {/* Main User Edited Wedding Video */}
          <video
            ref={videoRef}
            src="/videos/biyer_video_edit_by_me.mp4"
            loop
            playsInline
            preload="metadata"
            poster="/images/biyer.JPG"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Big Center Play Overlay Button when paused */}
          {!isPlaying && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
              onClick={togglePlay}
            >
              <button
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 text-white flex items-center justify-center shadow-2xl shadow-pink-500/60 hover:scale-110 active:scale-95 transition-transform duration-300 group/btn border-2 border-white/40"
                aria-label="Play Video"
              >
                <Play className="w-10 h-10 sm:w-12 sm:h-12 ml-1.5 fill-white text-white drop-shadow-md" />
              </button>
              <span className="mt-4 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-pink-200 text-xs sm:text-sm font-medium border border-pink-500/30">
                প্লে করতে ক্লিক করুন ✨
              </span>
            </motion.div>
          )}

          {/* Floating animated sparkles over video */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: "3s" }} />
            <span>Wedding Reel • Edited with Love</span>
          </div>

          {/* Video Controls Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-500/40 transition-transform active:scale-95 flex items-center justify-center cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 ml-0.5 fill-white" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={handleRestart}
                className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                aria-label="Restart video"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 text-pink-200 text-xs sm:text-sm font-medium bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-500/20">
                <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
                <span>Our Wedding Film</span>
              </div>
              <button
                onClick={handleFullscreen}
                className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                aria-label="Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
