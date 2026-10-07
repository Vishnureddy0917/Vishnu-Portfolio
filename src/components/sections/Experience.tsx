"use client";

import React, { useRef, useEffect, useState } from "react";
import { EXPERIENCE } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/lib/hooks";

export function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [lineProgress, setLineProgress] = useState(0);

  // Calculate timeline scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const el = timelineRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate relative progress inside this section
      const totalDist = rect.height;
      const currentPos = windowHeight - rect.top;
      const progress = Math.min(1, Math.max(0, currentPos / (totalDist + windowHeight * 0.3)));
      setLineProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      className="py-[clamp(96px,14vh,160px)] px-[var(--gutter)] max-w-[1320px] mx-auto paper-bg overflow-hidden"
    >
      <SectionHeader
        index="05"
        label="Trajectory"
        title="Experience &"
        accentWord="education."
      />

      <div ref={timelineRef} className="relative max-w-4xl mx-auto pl-6 md:pl-10">
        {/* Animated Drawing Vertical Spine */}
        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-[#0d0d0d]/10">
          <div
            className="w-full bg-[#0d0d0d] transition-all duration-150 ease-out"
            style={{ height: `${lineProgress * 100}%` }}
          />
        </div>

        {/* Timeline Stops */}
        <div className="space-y-12 md:space-y-16">
          {EXPERIENCE.map((item, idx) => {
            const stopThreshold = (idx + 1) / (EXPERIENCE.length + 1);
            const isLit = lineProgress >= stopThreshold * 0.7;

            return (
              <div
                key={item.id}
                className={`relative pl-8 md:pl-12 transition-all duration-500 ${
                  inView ? "rv is-in" : "rv"
                }`}
                style={{ "--i": idx } as React.CSSProperties}
              >
                {/* Lit Stop Circle Indicator */}
                <div
                  className={`absolute left-[-5px] md:left-[-7px] top-1.5 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-all duration-500 ${
                    isLit
                      ? "bg-[#0d0d0d] border-[#0d0d0d] scale-110 shadow-md"
                      : "bg-[#f4f2ee] border-[#a9a6a0] scale-100"
                  }`}
                />

                {/* Timeline Card Content */}
                <div
                  className={`card-surface p-6 md:p-8 transition-all duration-500 ${
                    isLit ? "border-l-4 border-l-[#0d0d0d]" : "opacity-90"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-semibold px-3 py-1 bg-[#f4f2ee] rounded-full text-[#0d0d0d]">
                      {item.year}
                    </span>
                    <span className="font-mono text-xs uppercase text-[#77756f] tracking-wider">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-[#0d0d0d] mb-1">
                    {item.title}
                  </h3>

                  <p className="font-mono text-sm text-[#77756f] mb-4">
                    {item.organization} {item.score ? `• ${item.score}` : ""}
                  </p>

                  <ul className="space-y-2 text-sm text-[#3a3a3a] leading-relaxed">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-[#0d0d0d] font-bold text-xs mt-0.5">▪</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* End Stop: Dashed Card "Next — Your team?" */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-[-5px] md:left-[-7px] top-4 w-3 h-3 md:w-4 md:h-4 rounded-full bg-white border-2 border-dashed border-[#0d0d0d]" />
            <div className="rounded-[26px] border-2 border-dashed border-[#0d0d0d]/30 p-8 text-center bg-white/50 hover:bg-white transition-all">
              <h4 className="text-xl md:text-2xl font-bold text-[#0d0d0d]">
                Next — Your team?
              </h4>
              <p className="font-mono text-xs text-[#77756f] mt-1">
                Open for Full Stack & AI Engineering roles starting 2026 / 2027.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
