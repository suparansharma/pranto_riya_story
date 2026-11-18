"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);

  // Synthesize a romantic, dreamy ambient chime/melody using Web Audio API
  // This guarantees sound plays even without needing an external mp3 file!
  const playRomanticMelody = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Pentatonic romantic notes (C4, D4, E4, G4, A4, C5, D5, E5)
      const notes = [261.63, 329.63, 392.0, 440.0, 523.25, 659.25, 523.25, 392.0];
      let step = 0;

      const playTone = () => {
        if (!isPlayingRef.current) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        const freq = notes[step % notes.length];
        step++;

        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 2.3);

        const nextDelay = 800 + Math.random() * 400;
        setTimeout(playTone, nextDelay);
      };

      isPlayingRef.current = true;
      setIsPlaying(true);
      playTone();
    } catch (e) {
      console.log("Audio play error", e);
    }
  };

  const stopMusic = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      playRomanticMelody();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleMusic}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 border border-pink-500/40 text-pink-300 backdrop-blur-md shadow-xl hover:scale-105 active:scale-95 transition-all group"
        title="Background romantic melody"
      >
        <span className="p-1 rounded-full bg-pink-500/20 text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 animate-pulse text-rose-400" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </span>
        <span className="text-xs font-medium text-pink-200">
          {isPlaying ? "Music On 🎵" : "Romantic Melody 🎶"}
        </span>
      </button>
    </div>
  );
}
