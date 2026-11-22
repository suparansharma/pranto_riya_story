"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingBeforeVideoRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;

    // 1. Try playing immediately with sound (unmuted)
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Successfully playing with sound!
          setIsMuted(false);
        })
        .catch(() => {
          // 2. If the browser strictly blocked unmuted sound without gesture:
          // Immediately auto-play in muted state so audio clock starts running without delay
          audio.muted = true;
          audio.play().then(() => {
            setIsMuted(true);

            // 3. The very millisecond the user touches/scrolls/moves mouse, unmute immediately!
            const handleUnmuteOnFirstTouch = () => {
              if (audioRef.current) {
                audioRef.current.muted = false;
                audioRef.current.volume = 0.55;
                setIsMuted(false);
              }
              window.removeEventListener("pointerdown", handleUnmuteOnFirstTouch);
              window.removeEventListener("touchstart", handleUnmuteOnFirstTouch);
              window.removeEventListener("scroll", handleUnmuteOnFirstTouch);
              window.removeEventListener("click", handleUnmuteOnFirstTouch);
            };

            window.addEventListener("pointerdown", handleUnmuteOnFirstTouch, { once: true, passive: true });
            window.addEventListener("touchstart", handleUnmuteOnFirstTouch, { once: true, passive: true });
            window.addEventListener("scroll", handleUnmuteOnFirstTouch, { once: true, passive: true });
            window.addEventListener("click", handleUnmuteOnFirstTouch, { once: true, passive: true });
          }).catch(() => {});
        });
    }

    // Video synchronization: auto pause when wedding film plays, resume when film pauses
    const handleVideoPlaying = () => {
      if (audioRef.current && !audioRef.current.paused) {
        wasPlayingBeforeVideoRef.current = true;
        audioRef.current.pause();
      }
    };

    const handleVideoPaused = () => {
      if (wasPlayingBeforeVideoRef.current && audioRef.current) {
        audioRef.current.play().catch(() => {});
        wasPlayingBeforeVideoRef.current = false;
      }
    };

    window.addEventListener("bg-video-playing", handleVideoPlaying);
    window.addEventListener("bg-video-paused", handleVideoPaused);

    return () => {
      window.removeEventListener("bg-video-playing", handleVideoPlaying);
      window.removeEventListener("bg-video-paused", handleVideoPaused);
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.muted = false;
      audioRef.current.play().then(() => setIsMuted(false)).catch(() => {});
    } else {
      if (isMuted || audioRef.current.muted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/tum_ho_toh.mp3"
        loop
        preload="auto"
        autoPlay
      />

      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleMute}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 border border-pink-500/40 text-pink-300 backdrop-blur-md shadow-xl hover:scale-105 active:scale-95 transition-all group cursor-pointer"
          title={isMuted ? "Unmute Music" : "Mute Music"}
        >
          <span className="p-1.5 rounded-full bg-pink-500/20 text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors">
            {!isMuted ? (
              <Volume2 className="w-4 h-4 animate-pulse text-rose-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-pink-400/60" />
            )}
          </span>
          <span className="text-xs font-medium text-pink-200">
            {!isMuted ? "Tum Ho Toh 🎵" : "Muted 🔇"}
          </span>
        </button>
      </div>
    </>
  );
}
