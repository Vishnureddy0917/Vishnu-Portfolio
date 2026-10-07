"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/lib/hooks";

export function About() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [flipped, setFlipped] = useState(false);
  const [angle, setAngle] = useState(0);

  // Pendulum swing animation logic
  const velocityRef = useRef(0);
  const angleRef = useRef(0);
  const lastMouseX = useRef<number | null>(null);

  useEffect(() => {
    let animId: number;

    const updatePhysics = () => {
      // Damped spring physics
      const k = 0.04; // spring stiffness
      const damping = 0.94; // damping ratio

      const force = -k * angleRef.current;
      velocityRef.current = (velocityRef.current + force) * damping;
      angleRef.current += velocityRef.current;

      // Subtle idle sway if velocity is low
      if (Math.abs(velocityRef.current) < 0.01 && Math.abs(angleRef.current) < 0.2) {
        angleRef.current = Math.sin(Date.now() * 0.002) * 2;
      }

      setAngle(angleRef.current);
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (lastMouseX.current !== null) {
      const deltaX = e.clientX - lastMouseX.current;
      velocityRef.current += deltaX * 0.15;
    }
    lastMouseX.current = e.clientX;
  };

  const handlePointerLeave = () => {
    lastMouseX.current = null;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped(!flipped);
    }
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-[clamp(96px,14vh,160px)] px-[var(--gutter)] max-w-[1320px] mx-auto paper-bg overflow-hidden"
    >
      <SectionHeader
        index="01"
        label="About Me"
        title="Engineering with"
        accentWord="purpose."
      />

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 items-stretch">
        {/* Left Column */}
        <div className={`card-surface p-8 md:p-10 flex flex-col justify-between rv ${inView ? "is-in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0d0d0d] mb-6">
              Hi, I'm {PROFILE.name}.
            </h3>
            <p className="text-base md:text-lg text-[#3a3a3a] leading-relaxed mb-4">
              {PROFILE.resumeSummary}
            </p>
            <p className="text-sm md:text-base text-[#77756f] leading-relaxed mb-8">
              {PROFILE.additionalSummary}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-6 border-t border-[#0d0d0d]/10">
            <a href={PROFILE.resumePath} download className="btn-primary">
              Résumé ↓
            </a>
            {PROFILE.github && (
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                GitHub ↗
              </a>
            )}
            {PROFILE.linkedin && (
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>

        {/* Centre Column: Hanging Lanyard ID Card */}
        <div
          className={`flex flex-col items-center justify-start relative select-none rv ${inView ? "is-in" : ""}`}
          style={{ "--i": 1 } as React.CSSProperties}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* Lanyard Strap */}
          <div className="w-[30px] h-[56px] bg-[#0d0d0d] rounded-t-sm flex flex-col items-center justify-between overflow-hidden text-[9px] font-mono text-[#f4f2ee] uppercase py-1 border-x border-[#3a3a3a]">
            <div className="animate-marquee whitespace-nowrap opacity-60">
              {PROFILE.initials} • {PROFILE.role}
            </div>
            {/* Metal Clip */}
            <div className="w-5 h-3 bg-gradient-to-b from-[#a9a6a0] to-[#77756f] rounded-b-sm border border-[#0d0d0d]/30" />
          </div>

          {/* Damped Swinging Pendulum Card Wrapper */}
          <div
            className="w-[300px] h-[404px] cursor-pointer [perspective:1000px] focus:outline-none"
            tabIndex={0}
            onClick={() => setFlipped(!flipped)}
            onKeyDown={handleKeyDown}
            role="button"
            aria-label="Interactive Developer ID Card. Click or press Enter to flip."
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "top center",
              transition: "transform 0.1s ease-out",
            }}
          >
            <div
              className={`relative w-full h-full rounded-[24px] bg-white border border-[#0d0d0d]/10 shadow-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
                flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
              }`}
            >
              {/* Card Front */}
              <div className="absolute inset-0 rounded-[24px] p-6 flex flex-col justify-between bg-white [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                {/* Top Band */}
                <div className="flex items-center justify-between border-b border-[#0d0d0d]/10 pb-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0d0d0d]">
                    DEVELOPER ID
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Portrait Bust */}
                <div className="mx-auto w-[128px] h-[156px] rounded-xl overflow-hidden border-2 border-[#e9e6e0] p-1 bg-[#ffffff] shadow-inner group">
                  <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-[#ffffff]">
                    <img
                      src={PROFILE.portraitPath}
                      alt={PROFILE.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Info Rows */}
                <div className="text-center">
                  <h4 className="font-bold text-lg text-[#0d0d0d] leading-tight">
                    {PROFILE.name}
                  </h4>
                  <p className="font-mono text-xs text-[#77756f] mt-0.5">
                    {PROFILE.role}
                  </p>

                  <div className="grid grid-cols-3 gap-1 mt-4 pt-3 border-t border-[#0d0d0d]/10 text-left font-mono text-[10px] text-[#3a3a3a]">
                    <div>
                      <span className="text-[#a9a6a0] block">ID NO.</span>
                      <span className="font-semibold text-[#0d0d0d]">{PROFILE.idNumber}</span>
                    </div>
                    <div>
                      <span className="text-[#a9a6a0] block">DEPT</span>
                      <span className="font-semibold text-[#0d0d0d]">CS (AI/ML)</span>
                    </div>
                    <div>
                      <span className="text-[#a9a6a0] block">VALID</span>
                      <span className="font-semibold text-[#0d0d0d]">{PROFILE.graduationYear}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Barcode & Hologram */}
                <div className="flex items-center justify-between pt-2 border-t border-[#0d0d0d]/10">
                  <div className="h-6 w-36 bg-repeating-linear-gradient opacity-70" />
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#a9a6a0] via-[#e9e6e0] to-[#77756f] border border-[#0d0d0d]/20 opacity-80" />
                </div>
              </div>

              {/* Card Back */}
              <div className="absolute inset-0 rounded-[24px] p-6 flex flex-col justify-between bg-[#0d0d0d] text-[#f4f2ee] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-[#a9a6a0] pb-2 border-b border-white/10 mb-3 flex items-center justify-between">
                    <span>DEVELOPER PROFILE</span>
                    <span className="text-[10px] text-[#77756f]">SRM AP</span>
                  </div>

                  {/* College & Education */}
                  <div className="mb-3 pb-3 border-b border-white/10">
                    <span className="font-mono text-[10px] text-[#a9a6a0] block uppercase">COLLEGE / UNIVERSITY</span>
                    <span className="font-sans font-bold text-sm text-[#ffffff] block">SRM University, AP</span>
                    <span className="font-mono text-[11px] text-[#e9e6e0] block">B.Tech CS (AI & ML) • CGPA: {PROFILE.cgpa}</span>
                  </div>

                  {/* Direct Contact Information */}
                  <div className="space-y-1.5 font-mono text-[11px] text-[#e9e6e0]">
                    <span className="font-mono text-[10px] text-[#a9a6a0] block uppercase mb-1">CONTACT INFO</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#a9a6a0]">✉</span>
                      <span className="truncate">{PROFILE.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#a9a6a0]">☎</span>
                      <span>{PROFILE.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#a9a6a0]">📍</span>
                      <span>{PROFILE.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 text-center font-mono text-[10px] text-[#a9a6a0] space-y-1">
                  <div className="flex justify-center gap-3 text-[#e9e6e0]">
                    <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub ↗</a>
                    <span>•</span>
                    <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn ↗</a>
                  </div>
                  <div>If found, say hello · {PROFILE.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={`card-surface p-8 md:p-10 flex flex-col justify-between rv ${inView ? "is-in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#77756f] block mb-6">
              Quick Facts
            </span>

            <dl className="space-y-4 text-sm font-mono border-b border-[#0d0d0d]/10 pb-6 mb-6">
              <div>
                <dt className="text-[#a9a6a0]">LOCATION</dt>
                <dd className="font-sans font-semibold text-[#0d0d0d]">{PROFILE.location}</dd>
              </div>
              <div>
                <dt className="text-[#a9a6a0]">EDUCATION</dt>
                <dd className="font-sans font-semibold text-[#0d0d0d]">SRM University, AP ('27)</dd>
              </div>
              <div>
                <dt className="text-[#a9a6a0]">EXPERIENCE</dt>
                <dd className="font-sans font-semibold text-[#0d0d0d]">Python Web Development Intern @ Edubot</dd>
              </div>
              <div>
                <dt className="text-[#a9a6a0]">EMAIL</dt>
                <dd className="font-sans font-semibold text-[#0d0d0d]">{PROFILE.email}</dd>
              </div>
            </dl>
          </div>

          <blockquote className="font-serif italic text-lg md:text-xl text-[#3a3a3a] leading-snug">
            "Engineered context-aware AI travel planners and distributed processing queues with reliability and precision."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
