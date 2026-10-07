"use client";

import React, { useEffect, useState } from "react";
import { PROFILE, NAV } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";
import { useTheme } from "@/lib/theme";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sections = NAV.map((n) => document.querySelector(n.href)).filter(
      Boolean
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToTarget(href);
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <>
      {/* 2px Ink Scroll-Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#0d0d0d] dark:bg-[#f4f2ee] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />

      {/* Main Header / Nav Container */}
      <header className="fixed top-4 left-0 right-0 z-40 px-[var(--gutter)]">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          {/* Left: Initials Mark & Name */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="pointer-events-auto group flex items-center gap-3 focus:outline-none"
            aria-label={`${PROFILE.name} - Back to top`}
          >
            <div
              className={`w-10 h-10 rounded-full border border-[#0d0d0d] flex items-center justify-center font-mono text-xs font-semibold transition-all duration-500 transform group-hover:rotate-[360deg] ${
                scrolled
                  ? "bg-[#0d0d0d] text-[#f4f2ee]"
                  : "bg-transparent text-[#0d0d0d]"
              }`}
            >
              {PROFILE.initials}
            </div>

            <span
              className={`font-semibold text-sm tracking-tight text-[#0d0d0d] transition-opacity duration-300 hidden sm:inline-block ${
                scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {PROFILE.name}
            </span>
          </a>

          {/* Right Controls: Desktop Nav Pill + Theme Toggle */}
          <div className="flex items-center gap-3">
            <nav
              className={`pointer-events-auto hidden md:flex items-center gap-1 px-3 py-2 rounded-full border transition-all duration-500 ${
                scrolled
                  ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-[#0d0d0d]/10 dark:border-white/10 shadow-lg"
                  : "bg-white/50 dark:bg-black/50 backdrop-blur-sm border-transparent"
              }`}
              aria-label="Main Navigation"
            >
              {NAV.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-colors duration-300 focus:outline-none ${
                      isActive ? "text-[#f4f2ee] dark:text-[#0d0d0d]" : "text-[#77756f] hover:text-[#0d0d0d] dark:hover:text-[#f4f2ee]"
                    }`}
                  >
                    {/* Sliding Indicator Pill */}
                    {isActive && (
                      <span
                        className="absolute inset-0 bg-[#0d0d0d] dark:bg-[#f4f2ee] rounded-full -z-10 transition-transform duration-300 ease-out"
                        style={{ transform: "scale(1)" }}
                      />
                    )}
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Dark / Light Mode Toggle Button */}
            <button
              id="theme-toggle"
              onClick={handleThemeToggle}
              className="pointer-events-auto w-10 h-10 rounded-full border border-[#0d0d0d]/20 bg-white/80 dark:bg-[#1a1a1a] dark:border-white/20 text-[#0d0d0d] dark:text-[#f4f2ee] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                /* Moon Icon for Light Mode -> Switch to Dark */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                /* Sun Icon for Dark Mode -> Switch to Light */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button Pill */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="pointer-events-auto md:hidden px-5 py-2.5 rounded-full bg-[#0d0d0d] text-[#f4f2ee] text-xs font-mono font-medium shadow-md hover:bg-[#222222] transition-all focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? "CLOSE [ESC]" : "MENU"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 bg-[#f4f2ee] dark:bg-[#0b0b0b] z-30 flex flex-col justify-center px-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          mobileMenuOpen
            ? "clip-open opacity-100 pointer-events-auto"
            : "clip-closed opacity-0 pointer-events-none"
        }`}
        style={{
          clipPath: mobileMenuOpen
            ? "circle(150% at calc(100% - 40px) 40px)"
            : "circle(0% at calc(100% - 40px) 40px)",
        }}
      >
        <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
          <span className="font-mono text-xs uppercase tracking-widest text-[#77756f] mb-4">
            Navigation
          </span>
          {NAV.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="group flex items-baseline justify-between py-2 border-b border-[#0d0d0d]/10 text-3xl font-bold tracking-tight text-[#0d0d0d] dark:text-[#f4f2ee] hover:text-[#77756f] transition-colors"
              style={{
                transitionDelay: `${idx * 60}ms`,
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileMenuOpen ? 1 : 0,
              }}
            >
              <span>{item.label}</span>
              <span className="font-mono text-sm font-normal text-[#a9a6a0] group-hover:text-[#0d0d0d]">
                0{idx + 1}
              </span>
            </a>
          ))}
          <a
            href={PROFILE.resumePath}
            download
            className="mt-8 btn-primary text-center"
          >
            Download Résumé ↓
          </a>
        </div>
      </div>
    </>
  );
}
