"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/lib/hooks";

export function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <section
      id="contact"
      ref={ref}
      className="py-[clamp(96px,14vh,160px)] px-[var(--gutter)] max-w-[1320px] mx-auto paper-bg overflow-hidden flex flex-col justify-between"
    >
      <div>
        <SectionHeader
          index="07"
          label="Get In Touch"
          title="Start a"
          accentWord="conversation."
        />

        {/* Interactive Bouncing Letter Heading */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-[-0.045em] leading-[0.95] text-[#0d0d0d] select-none">
            <div className="flex flex-wrap">
              {line1.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-300 hover:-translate-y-4 hover:scale-110 cursor-pointer"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap mt-2">
              {line2.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-300 hover:-translate-y-4 hover:scale-110 cursor-pointer"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </h2>
        </div>

        {/* Contact Links & Copy Chip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#77756f] block mb-3">
              Direct Email
            </span>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href={`mailto:${PROFILE.email}`}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0d0d0d] underline underline-offset-8 decoration-1 hover:decoration-2 transition-all"
              >
                {PROFILE.email}
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-full border border-[#0d0d0d]/20 bg-white font-mono text-xs text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#0d0d0d]"
                aria-live="polite"
              >
                {copied ? "Copied ✓" : "Copy email"}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="space-y-3 font-mono text-sm">
              <span className="text-[#77756f] block text-xs uppercase tracking-widest">
                Connect & Call
              </span>
              <div>
                <a
                  href={PROFILE.phoneHref}
                  className="font-semibold text-[#0d0d0d] hover:underline"
                >
                  {PROFILE.phone}
                </a>
              </div>
              <div className="flex items-center gap-4 pt-2">
                {PROFILE.github && (
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-medium text-[#0d0d0d]"
                  >
                    GitHub ↗
                  </a>
                )}
                {PROFILE.linkedin && (
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-medium text-[#0d0d0d]"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </div>
            </div>

            {/* Circular Rotating "Say Hello" Badge */}
            <div className="relative w-28 h-28 flex items-center justify-center select-none">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-spin-slow"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="none"
                />
                <text className="font-mono text-[10px] fill-[#0d0d0d] tracking-widest uppercase">
                  <textPath href="#circlePath">
                    SAY HELLO • SAY HELLO • SAY HELLO •
                  </textPath>
                </text>
              </svg>
              <div className="absolute w-8 h-8 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center font-mono text-xs">
                ↗
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-12 border-t border-[#0d0d0d]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#77756f]">
        <div>
          © 2026 {PROFILE.name}. All rights reserved.
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-[#0d0d0d] transition-colors focus:outline-none"
        >
          Back to top ↑
        </button>

        <div>Built with Next.js 15 & React 19</div>
      </footer>
    </section>
  );
}
