"use client";

import React, { useState } from "react";
import { SKILLS, SKILL_GROUPS, Skill } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechLogo } from "@/components/ui/TechLogo";
import { useInView } from "@/lib/hooks";

export function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [activeSkill, setActiveSkill] = useState<Skill>(SKILLS[2]); // Default Python

  return (
    <section
      id="skills"
      ref={ref}
      className="py-[clamp(96px,14vh,160px)] px-[var(--gutter)] max-w-[1320px] mx-auto paper-bg overflow-hidden"
    >
      <SectionHeader
        index="02"
        label="Technical Stack"
        title="The periodic table of my"
        accentWord="stack."
      />

      {/* Family Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {SKILL_GROUPS.map((group) => {
          const isActive = selectedGroup === group;
          return (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0d0d0d] ${
                isActive
                  ? "bg-[#0d0d0d] text-[#f4f2ee] shadow-sm"
                  : "bg-white text-[#77756f] border border-[#0d0d0d]/10 hover:border-[#0d0d0d] hover:text-[#0d0d0d]"
              }`}
            >
              {group}
            </button>
          );
        })}
      </div>

      {/* Grid + Sticky Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
        {/* Periodic Table Grid: 8 columns desktop, 4 columns mobile */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {SKILLS.map((skill, index) => {
            const isMatch =
              selectedGroup === "All" || skill.family === selectedGroup;
            const isSelected = activeSkill.id === skill.id;

            const row = Math.floor(index / 8);
            const col = index % 8;
            const waveDelay = (row + col) * 40;

            return (
              <button
                key={skill.id}
                onMouseEnter={() => setActiveSkill(skill)}
                onFocus={() => setActiveSkill(skill)}
                onClick={() => setActiveSkill(skill)}
                className={`relative aspect-square rounded-2xl p-3 flex flex-col justify-between text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0d0d0d] ${
                  isMatch ? "opacity-100 scale-100" : "opacity-25 scale-95"
                } ${
                  isSelected
                    ? "bg-[#0d0d0d] text-[#f4f2ee] shadow-xl translate-y-[-4px]"
                    : "bg-white text-[#0d0d0d] border border-[#0d0d0d]/10 hover:border-[#0d0d0d] hover:shadow-md"
                } ${inView ? "rv is-in" : "rv"}`}
                style={{
                  transitionDelay: `${waveDelay}ms`,
                }}
                aria-label={`${skill.name} (${skill.family})`}
              >
                {/* Top Row: Atomic Number */}
                <span
                  className={`font-mono text-[10px] font-semibold ${
                    isSelected ? "text-[#a9a6a0]" : "text-[#77756f]"
                  }`}
                >
                  {skill.number < 10 ? `0${skill.number}` : skill.number}
                </span>

                {/* Middle: 2-letter Symbol */}
                <div className="text-center my-auto">
                  <span className="font-bold text-xl md:text-2xl tracking-tight leading-none block">
                    {skill.symbol}
                  </span>
                </div>

                {/* Bottom: Truncated Skill Name */}
                <span
                  className={`font-mono text-[9px] truncate tracking-tight block ${
                    isSelected ? "text-[#e9e6e0]" : "text-[#3a3a3a]"
                  }`}
                >
                  {skill.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sticky Inspector Panel */}
        <div className="sticky top-28 card-surface p-8 flex flex-col items-center text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[#77756f] mb-6 self-start">
            Skill Inspector
          </span>

          {/* Real Brand Logo at 150px with Pop Animation */}
          <div className="w-[150px] h-[150px] flex items-center justify-center mb-6 transition-all duration-500 transform hover:scale-110">
            <TechLogo logoKey={activeSkill.logoKey} size={130} />
          </div>

          <h3 className="text-2xl font-bold text-[#0d0d0d] tracking-tight mb-1">
            {activeSkill.name}
          </h3>

          <span className="font-mono text-xs text-[#77756f] px-3 py-1 bg-[#f4f2ee] rounded-full mb-6">
            {activeSkill.family}
          </span>

          <div className="w-full text-left border-t border-[#0d0d0d]/10 pt-4">
            <span className="font-mono text-[11px] text-[#a9a6a0] block uppercase mb-2">
              Used in Projects & Experience:
            </span>
            <ul className="space-y-1.5 font-mono text-xs text-[#3a3a3a]">
              {activeSkill.projectsUsed.map((proj, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
                  <span>{proj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
