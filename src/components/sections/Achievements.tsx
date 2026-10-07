"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ACHIEVEMENTS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/lib/hooks";

export function Achievements() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [countedNumbers, setCountedNumbers] = useState<Record<string, number>>({});

  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 });

  // Update progress & track translateX based on window scroll position
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const rect = container.getBoundingClientRect();
      const totalScrollableHeight = container.offsetHeight - window.innerHeight;

      if (totalScrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollableHeight;
      const progress = Math.min(1, Math.max(0, rawProgress));
      setScrollProgress(progress);

      const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth + 120);
      const translateX = progress * maxTranslate;
      track.style.transform = `translate3d(-${translateX}px, 0, 0)`;

      // Active card index
      const cardWidth = 480;
      const centerCard = Math.min(
        ACHIEVEMENTS.length - 1,
        Math.max(0, Math.round(translateX / cardWidth))
      );
      setActiveCardIdx(centerCard);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Wheel Scroll Lock: Intercept mouse wheel when pinned so scrolling translates cards horizontally first!
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const totalScrollableHeight = container.offsetHeight - window.innerHeight;
      if (totalScrollableHeight <= 0) return;

      const isPinned = rect.top <= 10 && rect.bottom >= window.innerHeight - 10;

      if (!isPinned) return;

      const currentScroll = -rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollableHeight));

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

      // If scrolling DOWN and not yet at the end of horizontal track:
      if (delta > 0 && progress < 0.98) {
        e.preventDefault();
        window.scrollBy({ top: Math.min(delta, 120), behavior: "auto" });
      }
      // If scrolling UP and not yet at the start of horizontal track:
      else if (delta < 0 && progress > 0.02) {
        e.preventDefault();
        window.scrollBy({ top: Math.max(delta, -120), behavior: "auto" });
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Programmatic Scroll to specific Card Index
  const scrollToCard = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;

    const clampedIdx = Math.max(0, Math.min(ACHIEVEMENTS.length - 1, idx));
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const totalScrollableHeight = container.offsetHeight - window.innerHeight;

    const progress = clampedIdx / Math.max(1, ACHIEVEMENTS.length - 1);
    const targetY = containerTop + progress * totalScrollableHeight;

    window.scrollTo({
      top: targetY,
      behavior: "smooth"
    });
  };

  // Keyboard Navigation
  useEffect(() => {
    if (!inView) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        scrollToCard(activeCardIdx - 1);
      } else if (e.key === "ArrowRight") {
        scrollToCard(activeCardIdx + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inView, activeCardIdx]);

  // Number Count Up Effect when card is visible
  useEffect(() => {
    if (!inView) return;

    ACHIEVEMENTS.forEach((ach) => {
      if (countedNumbers[ach.id] !== undefined) return;

      let start = 0;
      const end = ach.numberValue;
      const duration = 1400;
      const startTime = performance.now();

      const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);

      const animateCount = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / duration);
        const currentVal = Math.floor(easeOutQuart(progress) * (end - start) + start);

        setCountedNumbers((prev) => ({ ...prev, [ach.id]: currentVal }));

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCountedNumbers((prev) => ({ ...prev, [ach.id]: end }));
        }
      };

      requestAnimationFrame(animateCount);
    });
  }, [inView, countedNumbers]);

  return (
    <div
      ref={containerRef}
      className="relative h-[300vh] paper-bg"
      id="achievements"
    >
      {/* Sticky Full-Viewport Container */}
      <div
        ref={sectionRef}
        className="sticky top-0 h-[100svh] w-full flex flex-col justify-between py-12 px-[var(--gutter)] overflow-hidden"
      >
        {/* Header with Title & Controls */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
            <div>
              <SectionHeader
                index="06"
                label="Honours & Milestones"
                title="Recognized"
                accentWord="achievements."
                className="mb-2"
              />
            </div>

            {/* Left / Right Control Buttons */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-[#77756f] mr-2">
                NAVIGATE:
              </span>
              <button
                onClick={() => scrollToCard(activeCardIdx - 1)}
                disabled={activeCardIdx === 0}
                aria-label="Previous achievement card"
                className="w-12 h-12 rounded-full border border-[#0d0d0d]/20 bg-white hover:bg-[#0d0d0d] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#0d0d0d] flex items-center justify-center font-mono text-xl transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
              >
                ←
              </button>

              <span className="font-mono text-xs font-bold text-[#0d0d0d] px-2 min-w-[50px] text-center">
                {String(activeCardIdx + 1).padStart(2, "0")} / {String(ACHIEVEMENTS.length).padStart(2, "0")}
              </span>

              <button
                onClick={() => scrollToCard(activeCardIdx + 1)}
                disabled={activeCardIdx >= ACHIEVEMENTS.length - 1}
                aria-label="Next achievement card"
                className="w-12 h-12 rounded-full border border-[#0d0d0d]/20 bg-white hover:bg-[#0d0d0d] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#0d0d0d] flex items-center justify-center font-mono text-xl transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
              >
                →
              </button>
            </div>
          </div>

          {/* Horizontal Progress Bar */}
          <div className="w-full max-w-sm h-[3px] bg-[#0d0d0d]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0d0d0d] transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Horizontal Track of Cards */}
        <div className="relative w-full my-auto py-8">
          <div
            ref={trackRef}
            className="flex items-center gap-8 transition-transform duration-100 ease-out will-change-transform"
          >
            {ACHIEVEMENTS.map((ach, idx) => {
              const isActive = activeCardIdx === idx;
              const displayedNum = countedNumbers[ach.id] ?? 0;

              return (
                <div
                  key={ach.id}
                  onClick={() => scrollToCard(idx)}
                  className={`flex-shrink-0 w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,310px)] rounded-[28px] bg-white p-8 flex flex-col justify-between cursor-pointer transition-all duration-500 ${
                    isActive
                      ? "shadow-2xl translate-y-[-12px] scale-105 ring-2 ring-[#0d0d0d]/10"
                      : "shadow-md translate-y-0 opacity-80 hover:opacity-100"
                  }`}
                >
                  {/* Top: 72px Logo Tile & Index */}
                  <div className="flex items-center justify-between">
                    <div className="relative w-[72px] h-[72px] rounded-2xl bg-[#f4f2ee] p-3 flex items-center justify-center shadow-inner group">
                      <div className="absolute inset-0 rounded-2xl bg-amber-500/10 blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                      <Image
                        src={ach.platformLogo}
                        alt={ach.title}
                        width={48}
                        height={48}
                        className="object-contain relative z-10"
                      />
                    </div>

                    <span className="font-mono text-xs font-semibold text-[#77756f]">
                      {ach.index}
                    </span>
                  </div>

                  {/* Bottom Info & Count Up Number */}
                  <div className="flex items-end justify-between gap-4">
                    <div className="max-w-[65%]">
                      <span className="font-mono text-[10px] uppercase text-[#77756f] block mb-1">
                        {ach.caption}
                      </span>
                      <h4 className="text-xl font-bold text-[#0d0d0d] leading-tight mb-2">
                        {ach.title}
                      </h4>
                      <p className="font-mono text-xs text-[#3a3a3a] line-clamp-2">
                        {ach.detail}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-4xl md:text-5xl font-extrabold text-[#0d0d0d] tracking-tight block">
                        {displayedNum}
                      </span>
                      <span className="font-mono text-[10px] text-[#77756f] block">
                        {ach.suffix}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* End of Track Indicator */}
            <div className="flex-shrink-0 w-64 h-[clamp(260px,36vh,310px)] rounded-[28px] border-2 border-dashed border-[#0d0d0d]/20 flex flex-col items-center justify-center text-center p-6 bg-white/40">
              <span className="font-serif italic text-2xl text-[#0d0d0d] mb-2">
                and counting →
              </span>
              <p className="font-mono text-xs text-[#77756f]">
                Pursuing excellence in software architecture.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Caption */}
        <div className="font-mono text-xs text-[#77756f] flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>Scroll vertically or use buttons / keyboard arrows</span>
            <span className="hidden sm:inline px-1.5 py-0.5 rounded border border-[#0d0d0d]/20 text-[10px] bg-white">
              ← →
            </span>
          </span>
          <span>01 — {String(ACHIEVEMENTS.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}
