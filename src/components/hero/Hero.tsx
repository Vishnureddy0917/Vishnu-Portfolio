"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlayingSound(true);
          setIsAutoplayBlocked(false);
        })
        .catch(() => {
          video.muted = true;
          video.play().catch((err) => console.log("Autoplay blocked:", err));
          setIsPlayingSound(false);
          setIsAutoplayBlocked(true);
        });
    }

    const unlockSound = () => {
      if (video && video.muted) {
        video.muted = false;
        video
          .play()
          .then(() => {
            setIsPlayingSound(true);
            setIsAutoplayBlocked(false);
          })
          .catch(() => {});
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    window.addEventListener("touchend", unlockSound, { once: true });

    return () => cleanupListeners();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          if (video.paused) {
            video.play().catch(() => {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: [0, 0.35, 1.0] }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || !isPlayingSound) {
      video.muted = false;
      video
        .play()
        .then(() => {
          setIsPlayingSound(true);
          setIsAutoplayBlocked(false);
        })
        .catch(() => {});
    } else {
      video.muted = true;
      setIsPlayingSound(false);
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100svh] w-full flex items-center pt-28 pb-12 px-[var(--gutter)] paper-bg overflow-hidden select-none"
    >
      {/* Ultra-subtle Quiet Background Watermark Typography (No Text Clutter) */}
      <div
        className="absolute inset-0 flex items-center justify-start pl-8 pointer-events-none z-0"
        aria-hidden="true"
      >
        <span
          className="text-[20vw] font-black tracking-tighter uppercase leading-none text-transparent opacity-5"
          style={{
            WebkitTextStroke: "1px #0d0d0d",
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      <div className="max-w-[1320px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100svh-160px)]">
        
        {/* LEFT COLUMN: Clean, Professional Spaced Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center relative z-10 space-y-6">
          
          {/* Section Kicker */}
          <div className="font-mono text-xs uppercase tracking-widest text-[#77756f] flex items-center gap-2">
            <span>01</span>
            <span className="w-4 h-[1px] bg-[#a9a6a0]" />
            <span>Portfolio 2026 • {PROFILE.location}</span>
          </div>

          {/* Full Name & Main Role Headline */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-mono uppercase tracking-wider text-[#77756f] font-semibold">
              {PROFILE.name}
            </h2>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.045em] leading-[0.98] text-[#0d0d0d]">
              Full Stack{" "}
              <span className="font-serif italic font-normal text-[#77756f]">
                Developer.
              </span>
            </h1>
          </div>

          {/* Clean Spaced Summary */}
          <p className="text-base sm:text-lg text-[#3a3a3a] max-w-xl leading-relaxed pt-2">
            {PROFILE.resumeSummary}
          </p>

          {/* CTA Buttons with Spacing */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => scrollToTarget("#work")}
              className="btn-primary"
            >
              Explore work
            </button>
            <button
              onClick={() => scrollToTarget("#contact")}
              className="btn-secondary"
            >
              Let's talk
            </button>
            <a
              href={PROFILE.resumePath}
              download
              className="btn-secondary flex items-center gap-1.5"
            >
              <span>Résumé</span>
              <span className="font-mono text-xs">↓</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Video Clip Positioned Cleanly */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative z-10">
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] aspect-[768/1036] h-[min(65svh,640px)] flex items-center justify-center">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-contain mix-blend-multiply pointer-events-none"
            >
              <source src="/hero/hero.webm" type="video/webm" />
              <source src="/hero/hero.mp4" type="video/mp4" />
            </video>

            {/* Sound Toggle Button (46px Icon-only Round Solid Ink Button) */}
            <div className="absolute bottom-4 right-4 z-20">
              <button
                onClick={toggleSound}
                className="relative w-[46px] h-[46px] rounded-full bg-[#0d0d0d] text-[#f4f2ee] flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d0d0d]"
                aria-label={isPlayingSound ? "Mute video audio" : "Unmute video audio"}
              >
                {isAutoplayBlocked && !isPlayingSound && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-[#0d0d0d]/30 pointer-events-none" />
                )}
                {isPlayingSound ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
