"use client";

import React from "react";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  accentWord: string;
  className?: string;
}

export function SectionHeader({
  index,
  label,
  title,
  accentWord,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-20 ${className}`}>
      {/* Mono Tag */}
      <div className="font-mono text-xs md:text-sm tracking-wider uppercase text-[#77756f] mb-3 flex items-center gap-2">
        <span>{index}</span>
        <span className="inline-block w-4 h-[1px] bg-[#a9a6a0]"></span>
        <span>{label}</span>
      </div>

      {/* Main Heading with Instrument Serif Italic Accent */}
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.045em] leading-none text-[#0d0d0d]">
        {title}{" "}
        <span className="font-serif italic font-normal text-[#77756f] inline-block">
          {accentWord}
        </span>
      </h2>
    </div>
  );
}
