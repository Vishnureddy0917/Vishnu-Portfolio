"use client";

import React from "react";
import { CERTIFICATIONS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/lib/hooks";

export function Certifications() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="certifications"
      ref={ref}
      className="py-[clamp(96px,14vh,160px)] bg-white border-y border-[#0d0d0d]/10 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-[var(--gutter)]">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_minmax(0,1fr)] gap-12 items-start">
          {/* Left Sticky Heading */}
          <div className="sticky top-28">
            <SectionHeader
              index="04"
              label="Certifications"
              title="Always"
              accentWord="learning."
              className="mb-6"
            />
            <p className="font-mono text-sm text-[#77756f]">
              Industry recognized credentials from Oracle & MongoDB.
            </p>
            <div className="mt-8 font-mono text-xs text-[#a9a6a0] border-t border-[#0d0d0d]/10 pt-4">
              TOTAL VERIFIED: 0{CERTIFICATIONS.length}
            </div>
          </div>

          {/* Right Ink-Flood Row Index */}
          <div className="divide-y divide-[#0d0d0d]/10">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={cert.id}
                tabIndex={0}
                className={`relative group p-6 md:p-8 cursor-pointer overflow-hidden transition-colors duration-500 focus:outline-none ${
                  inView ? "rv is-in" : "rv"
                }`}
                style={{ "--i": idx } as React.CSSProperties}
              >
                {/* Ink Flood Background Layer */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#0d0d0d] transform scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left -z-0"
                />

                {/* Content Layer */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-500 group-hover:text-white group-focus:text-white">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-sm font-semibold text-[#77756f] group-hover:text-[#a9a6a0] transition-colors">
                      {cert.index}
                    </span>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold tracking-tight text-[#0d0d0d] group-hover:text-white transition-colors">
                        {cert.title}
                      </h4>
                      <p className="font-mono text-xs text-[#77756f] group-hover:text-[#e9e6e0] transition-colors mt-1">
                        Issued by {cert.issuer} • {cert.year}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center font-mono text-sm font-semibold">
                    <span className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                      VERIFIED
                    </span>
                    <span className="transform translate-x-[-8px] group-hover:translate-x-0 group-focus:translate-x-0 transition-transform duration-300">
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
