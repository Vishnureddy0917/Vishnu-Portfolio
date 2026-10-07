"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechLogo } from "@/components/ui/TechLogo";
import { useInView } from "@/lib/hooks";

export function Work() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  return (
    <section
      id="work"
      ref={ref}
      className="py-[clamp(96px,14vh,160px)] px-[var(--gutter)] max-w-[1320px] mx-auto paper-bg overflow-hidden"
    >
      <SectionHeader
        index="03"
        label="Selected Work"
        title="Things I've"
        accentWord="built."
      />

      {/* Accordion Container: Side by side on desktop, stacked on mobile */}
      <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[min(78svh,600px)] w-full">
        {PROJECTS.map((project, idx) => {
          const isOpen = activeId === project.id;

          return (
            <div
              key={project.id}
              onClick={() => setActiveId(project.id)}
              onFocus={() => setActiveId(project.id)}
              tabIndex={0}
              role="region"
              aria-expanded={isOpen}
              aria-label={`Project ${project.index}: ${project.title}`}
              className={`card-surface p-6 md:p-8 flex flex-col justify-between cursor-pointer overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus:ring-2 focus:ring-[#0d0d0d] ${
                isOpen
                  ? "lg:flex-[8] bg-white shadow-2xl"
                  : "lg:flex-[1] bg-white/70 hover:bg-white hover:flex-[1.5]"
              } ${inView ? "rv is-in" : "rv"}`}
              style={{ "--i": idx } as React.CSSProperties}
            >
              {/* Closed Panel View (Slim Spine for Desktop) */}
              {!isOpen && (
                <div className="hidden lg:flex flex-col justify-between items-center h-full py-4 select-none">
                  <span className="font-mono text-xs font-semibold text-[#77756f]">
                    {project.index}
                  </span>

                  <h3 className="font-bold text-lg text-[#0d0d0d] tracking-tight uppercase [writing-mode:vertical-rl] rotate-180 my-auto">
                    {project.title}
                  </h3>

                  <div className="w-8 h-8 rounded-full border border-[#0d0d0d]/20 flex items-center justify-center font-mono text-sm text-[#0d0d0d] group-hover:rotate-90 transition-transform">
                    +
                  </div>
                </div>
              )}

              {/* Mobile Header when closed */}
              {!isOpen && (
                <div className="flex lg:hidden items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-[#77756f]">
                      {project.index}
                    </span>
                    <h3 className="font-bold text-xl text-[#0d0d0d]">
                      {project.title}
                    </h3>
                  </div>
                  <span className="font-mono text-sm text-[#77756f]">+</span>
                </div>
              )}

              {/* Open Panel Content */}
              {isOpen && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full w-full items-stretch animate-fadeIn">
                  {/* Left Side: Metadata & Description */}
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      {/* Number + Kicker */}
                      <div className="flex items-center gap-3 font-mono text-xs text-[#77756f] mb-3">
                        <span className="font-semibold text-[#0d0d0d]">{project.index}</span>
                        <span>•</span>
                        <span className="uppercase tracking-wider">{project.kicker}</span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0d0d0d] mb-4">
                        {project.title}
                      </h3>

                      <p className="text-sm md:text-base text-[#3a3a3a] leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* 2-Column Feature List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs text-[#3a3a3a]">
                        {project.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 bg-[#f4f2ee] p-2.5 rounded-xl border border-[#0d0d0d]/5">
                            <span className="text-[#0d0d0d] font-bold">✓</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      {/* Tech Chips with Tiny Logos */}
                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        {project.tech.map((t) => {
                          const key = t.toLowerCase().replace(/[^a-z]/g, "");
                          return (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f2ee] border border-[#0d0d0d]/10 font-mono text-xs text-[#0d0d0d]"
                            >
                              <TechLogo logoKey={key} size={14} />
                              <span>{t}</span>
                            </span>
                          );
                        })}
                      </div>

                      {/* GitHub Link Button */}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View on GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Illustrative Mini-UI in Grayscale */}
                  <div className="relative rounded-2xl bg-[#f4f2ee] border border-[#0d0d0d]/10 p-5 flex flex-col justify-between overflow-hidden group">
                    {/* Label Badge */}
                    <div className="flex items-center justify-between border-b border-[#0d0d0d]/10 pb-3 mb-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0d0d0d]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#77756f]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#a9a6a0]" />
                      </div>
                      <span className="font-mono text-[10px] text-[#77756f] uppercase tracking-widest bg-white px-2 py-0.5 rounded border border-[#0d0d0d]/10">
                        Illustrative UI
                      </span>
                    </div>

                    {/* Mini-UI Mock Content depending on project */}
                    {project.id === "codesense-ai" && (
                      <div className="space-y-3 font-mono text-xs text-[#0d0d0d]">
                        <div className="bg-white p-3 rounded-lg border border-[#0d0d0d]/10 flex items-center justify-between">
                          <span>Static Analysis & Complexity</span>
                          <span className="bg-[#0d0d0d] text-white text-[10px] px-2 py-0.5 rounded">PASSED</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-[#0d0d0d]/10">
                          <div className="text-[10px] text-[#77756f] mb-1">AUTO-DOC GENERATOR</div>
                          <div className="h-2 bg-[#e9e6e0] rounded w-3/4 mb-1" />
                          <div className="h-2 bg-[#e9e6e0] rounded w-1/2" />
                        </div>
                        <div className="bg-[#0d0d0d] text-white p-3 rounded-lg text-[11px] space-y-1">
                          <div>GenAI Review Output:</div>
                          <div className="text-[#a9a6a0]">▪ 0 bugs detected</div>
                          <div className="text-[#a9a6a0]">▪ Optimization Score: 98/100</div>
                        </div>
                      </div>
                    )}

                    {project.id === "taskflow" && (
                      <div className="space-y-3 font-mono text-xs text-[#0d0d0d]">
                        <div className="bg-white p-3 rounded-lg border border-[#0d0d0d]/10 flex justify-between items-center">
                          <span>Producer (Node.js)</span>
                          <span className="font-mono text-[10px]">Queue: 1,420 jobs/s</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-[#0d0d0d]/10 space-y-2">
                          <div className="text-[10px] text-[#77756f]">REDIS QUEUE RETRIES & MONITORING</div>
                          <div className="w-full bg-[#e9e6e0] h-2 rounded overflow-hidden">
                            <div className="bg-[#0d0d0d] h-full w-4/5" />
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-[#0d0d0d]/10 flex justify-between items-center">
                          <span>Worker (Python)</span>
                          <span className="text-emerald-600 font-bold">HEALTHY</span>
                        </div>
                      </div>
                    )}

                    {project.id === "prepwise-ai" && (
                      <div className="space-y-3 font-mono text-xs text-[#0d0d0d]">
                        <div className="bg-white p-3 rounded-lg border border-[#0d0d0d]/10 flex items-center justify-between">
                          <span>Technical & Coding Round</span>
                          <span className="text-[10px] bg-[#0d0d0d] text-white px-2 py-0.5 rounded">Active</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-[#0d0d0d]/10 space-y-1">
                          <div className="text-[10px] text-[#77756f]">AI RESUME & CODE EVALUATION</div>
                          <div className="h-2 bg-[#0d0d0d] rounded w-full" />
                          <div className="h-2 bg-[#a9a6a0] rounded w-2/3" />
                        </div>
                        <div className="bg-[#0d0d0d] text-white p-3 rounded-lg text-[11px]">
                          Candidate Analytics Score: 94%
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-2 text-right">
                      <span className="font-mono text-[10px] text-[#a9a6a0]">
                        Modular Architecture • 2026
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
